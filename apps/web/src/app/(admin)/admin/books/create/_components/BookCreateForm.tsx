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
import Description from "@web/src/components/ui/Description";
import { FormRow, FormColumn } from "@web/src/components/ui/Form";
import TagInput from "@web/src/components/ui/TagInput";
import getBookImagePresignedUrl from "@web/src/books/api/getBookImagePresignedUrl";
import axios from "axios";
import createBook from "@web/src/books/api/createBook";
const bookSchema = z.object({
  title: z.string().min(2),
  categoryId: z.string(),
  slug: z.string().min(2),
  authors: z.string().min(2),
  isbn: z.string().min(10),
  publisher: z.string().min(2),
  publishedDate: z.string().datetime(),
  tags: z.array(z.string()),
  coverImage: z.string().url(),
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
      coverImage: "",
    },
  });
  const queryClient = useQueryClient();
  const mutation = useCreateCategoryMutation();

  const onSubmit = async (data: z.infer<typeof bookSchema>) => {
    console.log(data);
    try {
      const reqData = {
        ...data,
        categoryId: parseInt(data.categoryId),
      };
      await createBook(reqData);
      alert("책이 성공적으로 등록되었습니다.");
    } catch (error) {
      if (error instanceof ApiError) {
        alert(error.message);
        return;
      }
    }
  };

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log(file);
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("이미지 파일은 10MB 이하만 업로드 가능합니다.");
      return;
    }

    try {
      const res = await getBookImagePresignedUrl({
        type: file.type,
        size: file.size,
      });

      await axios.put(res.uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      setValue("coverImage", res.publicUrl);
    } catch (error) {
      alert("이미지 업로드에 실패했습니다.");
    }
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
      </FormRow>
      <FormRow>
        <Label htmlFor="categoryId" require>
          카테고리
        </Label>
        <Input id="categoryId" {...register("categoryId")} />
        <ErrorMessage>{getErrorMessage("categoryId")}</ErrorMessage>
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
        <Input id="publishedDate" {...register("publishedDate")} />
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
