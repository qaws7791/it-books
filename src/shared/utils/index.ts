export const debounce = <F extends (...arguments_: unknown[]) => void>(
  function_: F,
  delay: number,
) => {
  let timerId: ReturnType<typeof setTimeout>;
  return (...arguments_: Parameters<F>) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      function_(...arguments_);
    }, delay);
  };
};

export const imageLoader = ({ src }: { src: string }) => {
  return `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${src}`;
};
