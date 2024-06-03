"use client";

import BookSelectDialog from "@/src/app/(admin)/admin/lists/create/book-select-dialog";
import { useBookById } from "@/src/feature/books/queries";
import createList from "@/src/feature/lists/api/create-list";
import NextImage from "@/src/feature/shared/components/next-image";
import useBoolean from "@/src/feature/shared/hooks/use-boolean";
import { cn } from "@/src/feature/shared/lib/utils";
import Button from "@/src/ui/components/button";
import ErrorMessage from "@/src/ui/components/error-message";
import { FormRow } from "@/src/ui/components/form";
import { Input } from "@/src/ui/components/input";
import Label from "@/src/ui/components/label";
import { Textarea } from "@/src/ui/components/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const listSchema = z.object({
  title: z.string().min(2, "리스트 제목은 2글자 이상이어야 합니다."),
  slug: z.string().min(2, "리스트 슬러그는 2글자 이상이어야 합니다."),
  description: z.string(),
  bookIds: z.array(z.number()),
});

export default function ListCreateForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof listSchema>>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      title: "",
      description: "",
      bookIds: [],
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      const response = await createList(data);
      toast.success(`리스트(id:${response.id})가 생성되었습니다.`);
    } catch (error) {
      console.error(error);
      toast.error("리스트 생성에 실패했습니다.");
    }
  });

  const changeBookOrder = (bookId: number, afterId: number) => {
    const bookIds = watch("bookIds");
    const index = bookIds.indexOf(bookId);
    bookIds.splice(index, 1);
    if (afterId === 0) {
      bookIds.push(bookId);
    } else {
      bookIds.splice(bookIds.indexOf(afterId), 0, bookId);
    }
    setValue("bookIds", bookIds);
    console.log(`changeBookOrder ${bookId} after ${afterId} to ${bookIds}`);
  };
  const removeBook = (bookId: number) => {
    setValue(
      "bookIds",
      watch("bookIds").filter((id) => id !== bookId),
    );
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <FormRow>
        <Label htmlFor="title" require>
          제목
        </Label>
        <Input id="title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
      </FormRow>
      <FormRow>
        <Label htmlFor="slug" require>
          슬러그
        </Label>
        <Input id="slug" {...register("slug")} />
        <ErrorMessage>{errors.slug?.message}</ErrorMessage>
      </FormRow>
      <FormRow>
        <Label htmlFor="description">설명</Label>
        <Textarea id="description" {...register("description")} />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
      </FormRow>
      <FormRow>
        <h2>책 목록</h2>
        <BookList
          bookIds={watch("bookIds")}
          onRemove={removeBook}
          onMove={changeBookOrder}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <BookSelectDialog
            selectedBookIds={watch("bookIds")}
            onSelect={(bookId) => {
              setValue("bookIds", [...watch("bookIds"), bookId]);
            }}
          >
            <Button type="button" variant="outline">
              <span className="material-icons">add</span>책 추가
            </Button>
          </BookSelectDialog>
        </Suspense>
      </FormRow>
      <FormRow>
        <Button type="submit">리스트 생성</Button>
      </FormRow>
    </form>
  );
}

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

function BookList({ bookIds, onRemove, onMove }: BookListProps) {
  const [active, setActive] = useBoolean(false);
  const highlightIndicator = (event_: React.DragEvent) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const element = getNearestIndicator(event_, indicators);
    element.style.opacity = "1";
  };

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

  const clearHighlights = (elements: HTMLElement[]) => {
    for (const element of elements) {
      element.style.opacity = "0";
    }
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
  const { data: book, isError } = useBookById(bookId);

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
