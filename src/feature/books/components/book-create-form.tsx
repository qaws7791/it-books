"use client";
import { CreateBookInput } from "@/src/feature/books/api/create-book";
import { FetchBookOutput } from "@/src/feature/books/api/fetch-book";
import getBookImagePresignedUrl from "@/src/feature/books/api/fetch-book-image-presigned-url";
import { BOOK_STATUS } from "@/src/feature/books/constants";
import {
  createBookSchema,
  CreateBookSchema,
} from "@/src/feature/books/helpers/schema/create-book";
import {
  useCreateBookMutation,
  useUpdateBookMutation,
} from "@/src/feature/books/hooks/mutations";
import { useCategoriesQuery } from "@/src/feature/categories/queries";
import { ApiError } from "@/src/feature/shared/api";
import NextImage from "@/src/feature/shared/components/next-image";
import { stringToArrayByComma } from "@/src/feature/shared/utils";
import Button from "@/src/ui/components/button";
import Description from "@/src/ui/components/description";
import ErrorMessage from "@/src/ui/components/error-message";
import { FormColumn, FormRow } from "@/src/ui/components/form";
import { Input } from "@/src/ui/components/input";
import Label from "@/src/ui/components/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/ui/components/select";
import TagInput from "@/src/ui/components/tag-input";
import { Textarea } from "@/src/ui/components/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const checkKeydown = (event: React.KeyboardEvent<HTMLFormElement>) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
};

interface BookCreateFormProps {
  book?: FetchBookOutput;
}

export default function BookCreateForm({ book }: BookCreateFormProps) {
  const router = useRouter();
  const { data: categories } = useCategoriesQuery({
    page: 1,
    limit: 100,
  });
  const {
    setValue,
    watch,
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateBookSchema>({
    resolver: zodResolver(createBookSchema),
    defaultValues: book
      ? {
          title: book.title,
          categoryId: book.category.id.toString(),
          slug: book.slug,
          coverImage: book.coverImage,
          tags: book.tags.map((tag) => tag.name),
          status: book.status,
          authors: book.authors.join(", "),
          pages: book.pages,
          isbn: book.isbn,
          publisher: book.publisher,
          publishedDate: new Date(book.publishedDate)
            .toISOString()
            .split("T")[0],
          description: book.description,
          translators: book.translators?.join(", ") || "",
        }
      : {
          title: "",
          categoryId: "",
          slug: "",
          coverImage: "",
          tags: [],
          status: BOOK_STATUS.FOR_SALE.key,
        },
  });
  const { mutate: createBook } = useCreateBookMutation();
  const { mutate: updateBook } = useUpdateBookMutation();

  const onSubmit = handleSubmit((data: CreateBookSchema) => {
    try {
      const authorsArray = stringToArrayByComma(data.authors);
      const translatorsArray = stringToArrayByComma(data.translators || "");

      const requestData: CreateBookInput = {
        ...data,
        authors: authorsArray,
        translators: translatorsArray,
        categoryId: Number(data.categoryId),
        publishedDate: new Date(data.publishedDate).toISOString(),
      };

      if (book) {
        updateBook(
          {
            id: book.id,
            ...requestData,
          },
          {
            onSuccess: () => {
              router.push("/admin/books");
            },
          },
        );
      } else {
        createBook(requestData, {
          onSuccess: () => {
            reset();
          },
        });
      }
    } catch (error) {
      if (error instanceof ApiError) {
        alert(error.message);
        return;
      }
    }
  });

  const onChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("이미지 파일은 10MB 이하만 업로드 가능합니다.");
      return;
    }

    try {
      const response = await getBookImagePresignedUrl({
        type: file.type,
        size: file.size,
      });

      await axios.put(response.uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      setValue("coverImage", response.path);
    } catch {
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  const getErrorMessage = (field: keyof typeof errors) => {
    return errors[field]?.message;
  };

  console.log("form data:", watch());
  /* eslint-disable @next/next/no-img-element */
  return (
    <form onSubmit={onSubmit} onKeyDown={checkKeydown}>
      <div className="w-80 h-80">
        <NextImage
          src={watch("coverImage") || ""}
          alt="이미지 미리보기"
          className="w-80 h-80 object-contain rounded-md"
          width={200}
          height={200}
        />
      </div>

      <FormRow>
        <Label htmlFor="coverImage" require>
          이미지
        </Label>
        <Input id="coverImage" type="file" onChange={onChangeImage} />
        <ErrorMessage>{getErrorMessage("coverImage")}</ErrorMessage>
      </FormRow>

      <FormRow>
        <Label htmlFor="categoryId" require>
          카테고리
        </Label>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => {
            return (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>카테고리 선택</SelectLabel>
                    {categories.data.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            );
          }}
        />
        <ErrorMessage>{getErrorMessage("categoryId")}</ErrorMessage>
      </FormRow>

      <FormColumn>
        <FormRow>
          <Label htmlFor="status" require>
            상태
          </Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => {
              return (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>책 상태</SelectLabel>
                      {Object.entries(BOOK_STATUS).map(([key, value]) => {
                        return (
                          <SelectItem key={key} value={key}>
                            {value.label}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            }}
          />
          <ErrorMessage>{getErrorMessage("status")}</ErrorMessage>
        </FormRow>

        <FormRow>
          <Label htmlFor="pages" require>
            페이지 수
          </Label>
          <Input
            id="pages"
            {...register("pages", {
              valueAsNumber: true,
            })}
            type="number"
          />
          <ErrorMessage>{getErrorMessage("pages")}</ErrorMessage>
        </FormRow>
      </FormColumn>

      <FormRow>
        <Label htmlFor="title" require>
          제목
        </Label>
        <Input id="title" {...register("title")} />
        <ErrorMessage>{getErrorMessage("title")}</ErrorMessage>
      </FormRow>

      <FormRow>
        <Label htmlFor="slug" require>
          URL 슬러그
        </Label>
        <Input id="slug" {...register("slug")} />
        <Description>
          URL 슬러그는 한글, 영문, 숫자, 하이픈(-)만 사용할 수 있습니다.
        </Description>
        <ErrorMessage>{getErrorMessage("slug")}</ErrorMessage>
      </FormRow>

      <FormColumn>
        <FormRow>
          <Label htmlFor="authors" require>
            저자
          </Label>
          <Input id="authors" {...register("authors")} />
          <Description>저자 이름은 필수입니다.</Description>
          <ErrorMessage>{getErrorMessage("authors")}</ErrorMessage>
        </FormRow>
        <FormRow>
          <Label htmlFor="translators">번역가</Label>
          <Input id="translators" {...register("translators")} />
          <Description>번역가는 선택사항입니다.</Description>
          <ErrorMessage>{getErrorMessage("translators")}</ErrorMessage>
        </FormRow>
      </FormColumn>

      <FormRow>
        <Label htmlFor="isbn" require>
          ISBN
        </Label>
        <Input id="isbn" {...register("isbn")} />
        <ErrorMessage>{getErrorMessage("isbn")}</ErrorMessage>
      </FormRow>

      <FormRow>
        <Label htmlFor="publisher" require>
          출판사
        </Label>
        <Input id="publisher" {...register("publisher")} />
        <ErrorMessage>{getErrorMessage("publisher")}</ErrorMessage>
      </FormRow>

      <FormRow>
        <Label htmlFor="publishedDate" require>
          출판일
        </Label>
        <Input id="publishedDate" {...register("publishedDate")} type="date" />
        <ErrorMessage>{getErrorMessage("publishedDate")}</ErrorMessage>
      </FormRow>

      <FormRow>
        <Label htmlFor="description" require>
          설명
        </Label>
        <Textarea id="description" {...register("description")} />
        <ErrorMessage>{getErrorMessage("description")}</ErrorMessage>
      </FormRow>

      <FormRow>
        <Label htmlFor="tags">태그</Label>
        <TagInput
          value={watch("tags")}
          onChangeTag={(tags) => {
            setValue("tags", tags);
          }}
        />
        <Description>태그는 쉼표(,)로 구분하여 입력해주세요.</Description>
        <ErrorMessage>{getErrorMessage("tags")}</ErrorMessage>
      </FormRow>

      <FormRow>
        <Button type="submit">도서 등록</Button>
      </FormRow>
    </form>
  );
}
