import { useState } from "react";

export default function useBoolean(initialValue: boolean) {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = () => setValue((previous) => !previous);

  return [value, setValue, toggle] as const;
}
