"use client";

import createBook, { CreateBookInput } from "@/src/books/api/create-book";
import getBookImagePresignedUrl from "@/src/books/api/get-book-image-presigned-url";
import { useCategoriesQuery } from "@/src/categories/queries";
import { ApiError } from "@/src/shared/api";
import NextImage from "@/src/shared/components/next-image";
import Button from "@/src/shared/components/ui/button";
import Description from "@/src/shared/components/ui/description";
import ErrorMessage from "@/src/shared/components/ui/error-message";
import { FormColumn, FormRow } from "@/src/shared/components/ui/form";
import { Input } from "@/src/shared/components/ui/input";
import Label from "@/src/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select";
import TagInput from "@/src/shared/components/ui/tag-input";
import { Textarea } from "@/src/shared/components/ui/textarea";
import { stringToArrayByComma } from "@/src/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const bookSchema = z.object({
  title: z.string().min(2, "책 제목은 2글자 이상이어야 합니다."),
  categoryId: z.string().min(1, "카테고리를 선택해주세요."),
  slug: z.string().min(2, "URL 슬러그는 2글자 이상이어야 합니다."),
  authors: z.string().min(1, "저자 이름을 입력해주세요."),
  isbn: z
    .string()
    .min(13, "ISBN은 13자리여야 합니다.")
    .max(13, "ISBN은 13자리여야 합니다."),
  publisher: z.string().min(1, "출판사를 입력해주세요."),
  publishedDate: z.string().date("날짜를 선택해주세요."),
  tags: z.array(z.string()),
  coverImage: z.string().url("이미지 URL을 입력해주세요."),
  description: z.string().min(10),
  translator: z.string().optional(),
});

const checkKeydown = (event: React.KeyboardEvent<HTMLFormElement>) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
};

export default function BookCreateForm() {
  const { data: categories } = useCategoriesQuery();
  const {
    setValue,
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      slug: "",
      coverImage: "",
      tags: [],
    },
  });

  const onSubmit = handleSubmit(async (data: z.infer<typeof bookSchema>) => {
    try {
      const authorsArray = stringToArrayByComma(data.authors);
      const translatorArray = stringToArrayByComma(data.translator || "");

      const requestData: CreateBookInput = {
        ...data,
        authors: authorsArray,
        translator: translatorArray,
        categoryId: Number(data.categoryId),
        publishedDate: new Date(data.publishedDate).toISOString(),
      };

      await createBook(requestData);
      alert("책이 성공적으로 등록되었습니다.");
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

      setValue("coverImage", response.publicUrl);
    } catch {
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  const getErrorMessage = (field: keyof typeof errors) => {
    return errors[field]?.message;
  };

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
                  <SelectValue placeholder="Select a fruit" />
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
          <Label htmlFor="translator">번역가</Label>
          <Input id="translator" {...register("translator")} />
          <Description>번역가는 선택사항입니다.</Description>
          <ErrorMessage>{getErrorMessage("translator")}</ErrorMessage>
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
          onChangeTag={(tags) => {
            setValue("tags", tags);
          }}
        />
        <Description>태그는 쉼표(,)로 구분하여 입력해주세요.</Description>
        <ErrorMessage>{getErrorMessage("tags")}</ErrorMessage>
      </FormRow>

      <Button type="submit">카테고리 등록</Button>
    </form>
  );
}
