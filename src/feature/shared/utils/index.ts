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

export const imageLoader = ({ src, width }: { src: string; width: number }) => {
  return `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${src}?w=${width.toString()}`;
};

// string input to array of string
export const stringToArrayByComma = (string_: string) => {
  return string_
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

export const arrayToStringWithComma = (array: string[]) => {
  return array.join(", ");
};
