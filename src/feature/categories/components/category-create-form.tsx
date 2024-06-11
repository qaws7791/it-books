"use client";

import { useCreateCategoryMutation } from "@/src/feature/categories/api/create-category";
import { useUpdateCategoryMutation } from "@/src/feature/categories/api/update-category";
import {
  CreateCategorySchema,
  createCategorySchema,
} from "@/src/feature/categories/helpers/schema/create-category";
import { Category } from "@/src/feature/categories/types";
import Button from "@/src/ui/components/button";
import ErrorMessage from "@/src/ui/components/error-message";
import { FormRow } from "@/src/ui/components/form";
import { Input } from "@/src/ui/components/input";
import Label from "@/src/ui/components/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface CategoryCreateFormProps {
  category?: Category;
}

export default function CategoryCreateForm({
  category,
}: CategoryCreateFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: category
      ? {
          name: category.name,
          slug: category.slug,
        }
      : undefined,
  });
  const { mutate: createCategoryMutate } = useCreateCategoryMutation();
  const { mutate: updateCategoryMutate } = useUpdateCategoryMutation();

  const onSubmit = (data: CreateCategorySchema) => {
    if (category) {
      updateCategoryMutate(
        {
          id: category.id,
          ...data,
        },
        {
          onSuccess: () => {
            router.push("/admin/categories");
          },
        },
      );
    } else {
      createCategoryMutate(data, {
        onSuccess: () => {
          router.push("/admin/categories");
        },
      });
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <FormRow>
        <Label htmlFor="name">카테고리 명</Label>
        <Input id="name" {...register("name")} />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
      </FormRow>
      <FormRow>
        <Label htmlFor="slug">카테고리 슬러그(URL)</Label>
        <Input id="slug" {...register("slug")} />
        <ErrorMessage>{errors.slug?.message}</ErrorMessage>
      </FormRow>
      <FormRow>
        <Button type="submit">카테고리 {category ? "수정" : "추가"}</Button>
      </FormRow>
    </form>
  );
}
