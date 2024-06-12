export default function ScrollWrapper(
  props: React.ComponentPropsWithoutRef<"div">,
) {
  return <div className="scrollbar overflow-y-auto max-h-full" {...props} />;
}
