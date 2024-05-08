export default function ScrollWrapper(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  return <div className="scrollbar overflow-y-auto max-h-full" {...props} />;
}
