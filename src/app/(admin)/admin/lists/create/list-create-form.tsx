"use client";

import BookSelectDialog from "@/src/app/(admin)/admin/lists/create/book-select-dialog";
import DraggableBookList from "@/src/feature/books/components/draggable-book-list";
import {
  useCreateListMutation,
  useUpdateListMutation,
} from "@/src/feature/lists/hooks/mutations";
import { ListDetails } from "@/src/feature/lists/types";
import Button from "@/src/ui/components/button";
import ErrorMessage from "@/src/ui/components/error-message";
import { FormRow } from "@/src/ui/components/form";
import { Input } from "@/src/ui/components/input";
import Label from "@/src/ui/components/label";
import { Textarea } from "@/src/ui/components/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const listSchema = z.object({
  title: z.string().min(2, "리스트 제목은 2글자 이상이어야 합니다."),
  slug: z.string().min(2, "리스트 슬러그는 2글자 이상이어야 합니다."),
  description: z.string(),
  bookIds: z.array(z.number()),
});

interface ListCreateFormProperties {
  list?: ListDetails;
}

export default function ListCreateForm({ list }: ListCreateFormProperties) {
  const router = useRouter();
  const { mutate: createList } = useCreateListMutation();
  const { mutate: updateList } = useUpdateListMutation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof listSchema>>({
    resolver: zodResolver(listSchema),
    defaultValues: list
      ? {
          title: list.title,
          description: list.description,
          slug: list.slug,
          bookIds: list.listItems.map((item) => item.book.id),
        }
      : {
          title: "",
          description: "",
          bookIds: [],
        },
  });
  const onSubmit = handleSubmit((data) => {
    if (list) {
      updateList(
        { id: list.id, ...data },
        {
          onSuccess: () => {
            router.push("/admin/lists");
          },
        },
      );
    } else {
      createList(data, {
        onSuccess: () => {
          reset();
        },
      });
    }
  });

  const changeBookOrder = (bookId: number, afterId: number) => {
    const bookIds = watch("bookIds");
    const index = bookIds.indexOf(bookId);
    bookIds.splice(index, 1);
    if (afterId === 0) {
      bookIds.push(bookId);
    } else {
      bookIds.splice(bookIds.indexOf(afterId), 0, bookId);
    }
    setValue("bookIds", bookIds);
  };
  const removeBook = (bookId: number) => {
    setValue(
      "bookIds",
      watch("bookIds").filter((id) => id !== bookId),
    );
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <FormRow>
        <Label htmlFor="title" require>
          제목
        </Label>
        <Input id="title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
      </FormRow>
      <FormRow>
        <Label htmlFor="slug" require>
          슬러그
        </Label>
        <Input id="slug" {...register("slug")} />
        <ErrorMessage>{errors.slug?.message}</ErrorMessage>
      </FormRow>
      <FormRow>
        <Label htmlFor="description">설명</Label>
        <Textarea id="description" {...register("description")} />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
      </FormRow>
      <FormRow>
        <h2>책 목록</h2>
        <DraggableBookList
          bookIds={watch("bookIds")}
          onRemove={removeBook}
          onMove={changeBookOrder}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <BookSelectDialog
            selectedBookIds={watch("bookIds")}
            onSelect={(bookId) => {
              setValue("bookIds", [...watch("bookIds"), bookId]);
            }}
          >
            <Button type="button" variant="outline">
              <span className="material-icons">add</span>책 추가
            </Button>
          </BookSelectDialog>
        </Suspense>
      </FormRow>
      <FormRow>
        <Button type="submit">{list ? "수정" : "생성"}</Button>
      </FormRow>
    </form>
  );
}
