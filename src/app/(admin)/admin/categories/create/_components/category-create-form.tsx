"use client";

import { useCreateCategoryMutation } from "@/src/feature/categories/api/create-category";
import { categoryQueryKeys } from "@/src/feature/categories/queries";
import { ApiError } from "@/src/feature/shared/api";
import Button from "@/src/ui/components/button";
import ErrorMessage from "@/src/ui/components/error-message";
import { FormRow } from "@/src/ui/components/form";
import { Input } from "@/src/ui/components/input";
import Label from "@/src/ui/components/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
});

export default function CategoryCreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });
  const queryClient = useQueryClient();
  const mutation = useCreateCategoryMutation();

  const onSubmit = async (data: z.infer<typeof categorySchema>) => {
    alert(JSON.stringify(data));
    try {
      await mutation.mutateAsync(data);
      await queryClient.invalidateQueries({
        queryKey: categoryQueryKeys.fetchCategories._def,
      });
      reset();
    } catch (error) {
      if (error instanceof ApiError) {
        alert(error.message);
        return;
      }
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
        <Button type="submit">카테고리 등록</Button>
      </FormRow>
    </form>
  );
}
