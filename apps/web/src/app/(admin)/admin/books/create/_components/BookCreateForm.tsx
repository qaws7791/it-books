"use client";

import Button from "@web/src/components/ui/Button";
import { Input } from "@web/src/components/ui/Input";
import Label from "@web/src/components/ui/Label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@web/src/components/ui/ErrorMessage";
import { useCreateCategoryMutation } from "@web/src/categories/api/createCategory";
import { useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@web/src/shared/api";
import { Textarea } from "@web/src/components/ui/Textarea";
import Image from "next/image";
import Description from "@web/src/components/ui/Description";
import { FormRow, FormColumn } from "@web/src/components/ui/Form";
import TagInput from "@web/src/components/ui/TagInput";
const bookSchema = z.object({
  title: z.string().min(2),
  categoryId: z.string(),
  slug: z.string().min(2),
  author: z.string().min(2),
  isbn: z.string().min(10),
  publisher: z.string().min(2),
  publicationDate: z.string().min(2),
  tags: z.string().optional(),
  picture: z.string().url(),
  description: z.string().min(10),
  translator: z.string().optional(),
});

export default function BookCreateForm() {
  const {
    getValues,
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      slug: "",
      picture: "",
    },
  });
  const queryClient = useQueryClient();
  const mutation = useCreateCategoryMutation();

  const onSubmit = async (data: z.infer<typeof bookSchema>) => {
    alert(JSON.stringify(data));
    // try {
    //   const result = await mutation.mutateAsync(data);
    //   queryClient.invalidateQueries({
    //     queryKey: ["categories"],
    //   });
    // } catch (error) {
    //   if (error instanceof ApiError) {
    //     alert(error.message);
    //     return;
    //   }
    // }
  };

  const getErrorMessage = (field: keyof typeof errors) => {
    return errors[field]?.message;
  };

  const checkKeydown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onKeyDown={checkKeydown}>
      <div className="w-80 h-80">
        <img
          src={watch("picture") || ""}
          alt="이미지 미리보기"
          className="w-80 h-80 object-contain rounded-md"
          width={200}
          height={200}
        />
      </div>

      <FormRow>
        <Label htmlFor="picture" require>
          이미지
        </Label>
        <Input id="picture" {...register("picture")} />
        <Description>
          이미지 URL을 입력해주세요. 미리보기는 320x320 사이즈로 보여집니다.
        </Description>
        <ErrorMessage>{getErrorMessage("picture")}</ErrorMessage>
      </FormRow>
      <FormRow>
        <Label htmlFor="title" require>
          제목
        </Label>
        <Input id="title" {...register("title")} />
        <Description>책 제목은 2글자 이상이어야 합니다.</Description>
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
          <Label htmlFor="author" require>
            저자
          </Label>
          <Input id="author" {...register("author")} />
          <Description>저자 이름은 필수입니다.</Description>
          <ErrorMessage>{getErrorMessage("author")}</ErrorMessage>
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
        <Label htmlFor="publicationDate" require>
          출판일
        </Label>
        <Input id="publicationDate" {...register("publicationDate")} />
        <ErrorMessage>{getErrorMessage("publicationDate")}</ErrorMessage>
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
        <TagInput />
        <Description>태그는 쉼표(,)로 구분하여 입력해주세요.</Description>
        <ErrorMessage>{getErrorMessage("tags")}</ErrorMessage>
      </FormRow>

      {/* <FormRow>
        <Label htmlFor="tags">태그</Label>
        <Input id="tags" {...register("tags")} />
        <Description>태그는 쉼표(,)로 구분하여 입력해주세요.</Description>
        <ErrorMessage>{getErrorMessage("tags")}</ErrorMessage>
      </FormRow>
      <FormRow>
        <p>태그 미리보기</p>
        <ul className="flex gap-2 p-4 border border-[#655F3A] rounded-md">
          {watch("tags")
            ?.split(",")
            .filter((s) => s.trim().length > 0)
            .map((tag) => (
              <span
                key={tag}
                className="text-sm rounded-full px-3 py-1 bg-[#DED8C2]"
              >
                {tag}
              </span>
            ))}
        </ul>
      </FormRow> */}

      <Button type="submit">카테고리 등록</Button>
    </form>
  );
}
