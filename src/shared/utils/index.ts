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
