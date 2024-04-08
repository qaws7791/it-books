"use client";
import { cn } from "@web/src/lib/utils";
import { forwardRef, useEffect, useRef, useState } from "react";

interface SearchProps {
  className?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  onClose?: () => void;
  defaultValue?: string;
  placeholder?: string;
  ariaLabel?: string;
  focus?: boolean;
}

const Search = forwardRef<HTMLDivElement, SearchProps>(function Search(
  {
    className,
    onChange,
    onSubmit,
    onClear,
    onClose,
    defaultValue = "",
    placeholder = "Search",
    ariaLabel = "Search input",
    focus = false,
    ...props
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClearInput = () => {
    setValue("");
    inputRef.current?.focus();
    onClear?.();
  };

  const handleClose = () => {
    inputRef.current?.focus();
    setValue("");
    onClose?.();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim().length === 0) return;
    onSubmit?.(value.trim());
  };

  const haveValue = value.length > 0;

  useEffect(() => {
    if (focus) {
      inputRef.current?.focus();
    }
  }, [focus]);

  return (
    <search
      className={cn("bg-surface-container h-14 rounded-full group", className)}
      tabIndex={0}
      ref={ref}
      aria-label={ariaLabel}
      {...props}
    >
      <form className="h-full" onSubmit={handleSubmit}>
        <label htmlFor="search" className="flex items-center h-full">
          <button
            type="button"
            className="hidden mx-4 group-focus-within:flex"
            onClick={handleClose}
            aria-label="
            Close search input
            "
          >
            <span className="material-icons ">arrow_back</span>
          </button>
          <span className="material-icons mx-4 inline-block group-focus-within:hidden">
            search
          </span>
          <input
            ref={inputRef}
            id="search"
            type="search"
            className={cn(
              "bg-transparent h-full outline-none w-full",
              className
            )}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            maxLength={255}
          />
          <div className="mx-4 h-6 w-6">
            <button
              type="button"
              className="flex aria-hidden:hidden"
              onClick={handleClearInput}
              aria-label="Clear search input"
              aria-hidden={!haveValue}
            >
              <span className="material-icons">close</span>
            </button>
          </div>
        </label>
      </form>
    </search>
  );
});

export default Search;
