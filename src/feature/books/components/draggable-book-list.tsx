import { bookByIdOptions } from "@/src/feature/books/hooks/queries";
import NextImage from "@/src/feature/shared/components/next-image";
import useBoolean from "@/src/feature/shared/hooks/use-boolean";
import { cn } from "@/src/feature/shared/lib/utils";
import Button from "@/src/ui/components/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Suspense } from "react";

interface BookItemProps {
  bookId: number;
  onRemove: (bookId: number) => void;
  onDragStart: (
    event_: MouseEvent | TouchEvent | PointerEvent,
    bookId: number,
  ) => void;
}

interface BookListProps {
  bookIds: number[];
  onRemove: (bookId: number) => void;
  onMove: (bookId: number, afterId: number) => void;
}

const getNearestIndicator = (
  event_: React.DragEvent,
  indicators: HTMLElement[],
) => {
  const DISTANCE_THRESHOLD = 45;
  let closest = {
    offset: Number.NEGATIVE_INFINITY,
    element: indicators.at(-1)!,
  };

  for (const indicator of indicators) {
    const box = indicator.getBoundingClientRect();
    const offset = event_.clientY - (box.top + DISTANCE_THRESHOLD);

    if (offset < 0 && offset > closest.offset) {
      closest = { offset, element: indicator };
    }
  }

  return closest.element;
};

const getIndicators = () => {
  return [...document.querySelectorAll<HTMLElement>("[data-after]")];
};

const handleDragStart = (
  event_: MouseEvent | TouchEvent | PointerEvent,
  bookId: number,
) => {
  const event = event_ as unknown as DragEvent;
  event?.dataTransfer?.setData("bookId", bookId.toString());
};

const clearHighlights = (elements: HTMLElement[]) => {
  for (const element of elements) {
    element.style.opacity = "0";
  }
};

const highlightIndicator = (event_: React.DragEvent) => {
  const indicators = getIndicators();
  clearHighlights(indicators);
  const element = getNearestIndicator(event_, indicators);
  element.style.opacity = "1";
};

export default function DraggableBookList({
  bookIds,
  onRemove,
  onMove,
}: BookListProps) {
  const [active, setActive] = useBoolean(false);

  const handleDragOver = (event_: React.DragEvent) => {
    event_.preventDefault();
    highlightIndicator(event_);
    setActive(true);
  };

  const handleDragLeave = (event_: React.DragEvent) => {
    if (event_.currentTarget.contains(event_.relatedTarget as Node)) return;
    clearHighlights(getIndicators());
    setActive(false);
  };

  const handleDragEnd = (event_: React.DragEvent) => {
    setActive(false);
    clearHighlights(getIndicators());
    const bookId = Number(event_.dataTransfer.getData("bookId"));
    if (!bookId) return;

    const element = getNearestIndicator(event_, getIndicators());
    const afterId = Number(element.dataset.after || 0);
    if (afterId === bookId) return;

    onMove(bookId, afterId);
  };

  return (
    <ul
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className={cn(active ? "bg-surface-container" : "")}
    >
      {bookIds.map((bookId) => (
        <Suspense key={bookId} fallback={<div>책 정보를 가져오는 중</div>}>
          <BookItem
            bookId={bookId}
            onRemove={onRemove}
            onDragStart={handleDragStart}
          />
        </Suspense>
      ))}
      <DropIndicator afterId={0} />
    </ul>
  );
}

function BookItem({ bookId, onRemove, onDragStart }: BookItemProps) {
  const { data: book, isError } = useSuspenseQuery(bookByIdOptions(bookId));

  if (!book || isError) {
    return (
      <li>
        <p>책(id:{bookId})을 찾을 수 없습니다.</p>
        <Button variant="outline" onClick={() => onRemove(bookId)}>
          삭제
        </Button>
      </li>
    );
  }

  return (
    <>
      <DropIndicator afterId={bookId} />
      <motion.li
        className="flex gap-4 items-center justify-between cursor-grab active:cursor-grabbing hover:bg-surface-container rounded-lg p-2"
        draggable
        layout
        data-id={bookId}
        onDragStart={(event_) => onDragStart(event_, bookId)}
      >
        <div className="flex items-center gap-4">
          <span className="material-icons">drag_indicator</span>

          <NextImage
            src={book.coverImage}
            alt={book.title}
            width={80}
            height={80}
            className="w-20 h-20 object-contain rounded-lg"
          />
          <p>
            {book.title}(id:{bookId})
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => onRemove(bookId)}
        >
          삭제
        </Button>
      </motion.li>
    </>
  );
}

function DropIndicator({ afterId }: { afterId: number }) {
  return (
    <div
      data-after={afterId || 0}
      className="my-0.5 h-0.5 w-full bg-primary opacity-0  pointer-events-none"
    />
  );
}
