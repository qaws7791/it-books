"use client";

import BookSelectDialog from "@/src/app/(admin)/admin/lists/create/book-select-dialog";
import DUMMY from "@/src/dummy";
import Button from "@/src/shared/components/ui/button";
import ErrorMessage from "@/src/shared/components/ui/error-message";
import { FormRow } from "@/src/shared/components/ui/form";
import { Input } from "@/src/shared/components/ui/input";
import Label from "@/src/shared/components/ui/label";
import { Textarea } from "@/src/shared/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const listSchema = z.object({
  title: z.string().min(2, "리스트 제목은 2글자 이상이어야 합니다."),
  slug: z.string().min(2, "리스트 슬러그는 2글자 이상이어야 합니다."),
  description: z.string().optional(),
  books: z.array(
    z.object({
      bookId: z.number(),
    }),
  ),
});

export default function ListCreateForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof listSchema>>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      title: "",
      description: "",
      books: [],
    },
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

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
        <ul>
          {watch("books").map((book, index) => (
            <BookItem
              key={index}
              bookId={book.bookId}
              onRemove={() => {
                setValue(
                  "books",
                  watch("books").filter((_, index_) => index_ !== index),
                );
              }}
            />
          ))}
        </ul>
        <BookSelectDialog
          selectedBookIds={watch("books").map((book) => book.bookId)}
          onSelect={(bookId) => {
            setValue("books", [...watch("books"), { bookId }]);
          }}
        >
          <Button type="button" variant="outline">
            <span className="material-icons">add</span>책 추가
          </Button>
        </BookSelectDialog>
      </FormRow>
      <FormRow>
        <Button type="submit">리스트 생성</Button>
      </FormRow>
    </form>
  );
}

interface BookItemProps {
  bookId: number;
  onRemove: () => void;
}

function BookItem({ bookId, onRemove }: BookItemProps) {
  const book = DUMMY.BOOKS.find((book) => book.id === bookId);
  if (!book) {
    return (
      <li>
        <p>책(id:{bookId})을 찾을 수 없습니다.</p>
        <Button variant="outline" onClick={onRemove}>
          삭제
        </Button>
      </li>
    );
  }

  return (
    <li className="flex gap-4">
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-20 h-20 object-contain rounded-lg"
      />
      <div className="flex items-center gap-4">
        <p>
          {book.title}(id:{bookId})
        </p>
        <Button type="button" variant="outline" onClick={onRemove}>
          삭제
        </Button>
      </div>
    </li>
  );
}
