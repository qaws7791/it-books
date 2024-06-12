export function FormRow(props: React.ComponentPropsWithoutRef<"div">) {
  return <div className="flex flex-col w-full space-y-1 mt-6" {...props} />;
}

export function FormColumn(props: React.ComponentPropsWithoutRef<"div">) {
  return <div className="flex w-full gap-4" {...props} />;
}
