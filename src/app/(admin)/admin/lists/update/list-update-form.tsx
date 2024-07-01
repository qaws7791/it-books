"use client";

import ListCreateForm from "@/src/app/(admin)/admin/lists/create/list-create-form";
import { listByIdOptions } from "@/src/feature/lists/hooks/queries";
import { useSuspenseQuery } from "@tanstack/react-query";

interface ListUpdateFormProperties {
  listId: number;
}
export default function ListUpdateForm({ listId }: ListUpdateFormProperties) {
  const { data: list } = useSuspenseQuery(listByIdOptions(listId));

  return <ListCreateForm list={list} />;
}
