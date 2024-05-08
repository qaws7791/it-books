"use client";

import Button from "@/src/shared/components/ui/Button";
import { Input } from "@/src/shared/components/ui/Input";
import Label from "@/src/shared/components/ui/Label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/src/shared/components/ui/ErrorMessage";
import { useCreateCategoryMutation } from "@/src/categories/api/createCategory";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/src/shared/type/api";
import { ApiError } from "@/src/shared/api";
const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
});

export default function CategoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
      const result = await mutation.mutateAsync(data);
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    } catch (error) {
      if (error instanceof ApiError) {
        alert(error.message);
        return;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="name">카테고리 명</Label>
        <Input id="name" {...register("name")} />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
      </div>
      <div>
        <Label htmlFor="slug">카테고리 슬러그(URL)</Label>
        <Input id="slug" {...register("slug")} />
        <ErrorMessage>{errors.slug?.message}</ErrorMessage>
      </div>

      <Button type="submit">카테고리 등록</Button>
    </form>
  );
}
