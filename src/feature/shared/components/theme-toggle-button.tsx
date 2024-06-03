"use client";
import useMounted from "@/src/feature/shared/hooks/use-mounted";
import Button from "@/src/ui/components/button";
import { motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";

interface ThemeToggleButtonProps {
  type?: "with-text" | "icon-only";
}

const toggleButtonVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

export default function ThemeToggleButton({
  type = "icon-only",
}: ThemeToggleButtonProps) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size={type === "with-text" ? "default" : "icon"}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" && (
        <motion.span
          variants={toggleButtonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="material-icons-outlined"
        >
          dark_mode
        </motion.span>
      )}
      {theme === "dark" && (
        <motion.span
          variants={toggleButtonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="material-icons-outlined"
        >
          light_mode
        </motion.span>
      )}
      {type === "with-text" && (
        <span className="ml-4">
          {type === "with-text" && (theme === "light" ? "Dark" : "Light")}
          &nbsp;mode
        </span>
      )}
    </Button>
  );
}
