import { BookDetail } from "@/src/feature/books/types";
import { Variants, motion } from "framer-motion";

const PREVIEW_MAX_ITEMS = 3;

const listVariants: Variants = {
  visible: {
    opacity: 1,
    transition: {
      // delayChildren: 1.5,
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const itemVariants: Variants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -10 },
};

export default function BookCoversPreview({
  books,
  count,
}: {
  books: BookDetail[];
  count: number;
}): JSX.Element {
  const items = books.slice(0, PREVIEW_MAX_ITEMS);
  const restCount = count - PREVIEW_MAX_ITEMS;
  return (
    <>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={listVariants}
        className="flex flex-wrap relative items-end h-60"
      >
        {items.map((book) => (
          <motion.li
            key={book.id}
            variants={itemVariants}
            whileHover={{
              marginRight: "-110px",
              transition: { ease: "easeOut" },
            }}
            className="cursor-pointer w-60 relative -mr-48"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={book.coverImage}
              alt="book cover"
              className="object-contain rounded-md shadow max-h-60"
            />
          </motion.li>
        ))}
        {restCount > 0 && (
          <motion.li
            variants={itemVariants}
            whileHover={{
              marginRight: "-110px",
              transition: { ease: "easeOut" },
            }}
            className="cursor-pointer w-60 relative -mr-48"
          >
            <div className="shadow w-40 h-56 flex items-center justify-center bg-surface-dim/95">
              <span className="text-2xl font-bold text-on-surface-variant">
                +{restCount}
              </span>
            </div>
          </motion.li>
        )}
      </motion.ul>
    </>
  );
}
