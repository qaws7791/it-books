export const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number
) => {
  let timerId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const imageLoader = ({ src }: { src: string }) => {
  console.log(process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN);
  return `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${src}`;
};
