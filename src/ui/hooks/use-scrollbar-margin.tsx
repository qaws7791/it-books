"use client";
import { createContext, useContext, useState } from "react";

interface useScrollbarMarginContext {
  status: "hide" | "show";
  setStatus: (status: "hide" | "show") => void;
}

export const ScrollbarMarginContext =
  createContext<useScrollbarMarginContext | null>(null);

export const ScrollbarMarginProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [status, setStatus] = useState<"hide" | "show">("show");

  return (
    <ScrollbarMarginContext.Provider value={{ status, setStatus }}>
      {children}
    </ScrollbarMarginContext.Provider>
  );
};

export const useScrollbarMargin = () => {
  const context = useContext(ScrollbarMarginContext);

  if (!context) {
    throw new Error(
      "useScrollbarMargin must be used within a ScrollbarMarginProvider",
    );
  }
  return context;
};
