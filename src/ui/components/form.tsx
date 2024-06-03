export function FormRow(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="flex flex-col w-full space-y-1" {...props} />;
}

export function FormColumn(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="flex w-full gap-4" {...props} />;
}
