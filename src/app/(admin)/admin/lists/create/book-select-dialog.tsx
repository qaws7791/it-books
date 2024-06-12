"use client";
import { useBooksPagination } from "@/src/feature/books/queries";
import NextImage from "@/src/feature/shared/components/next-image";
import useBoolean from "@/src/feature/shared/hooks/use-boolean";
import Button from "@/src/ui/components/button";
import { Input } from "@/src/ui/components/input";
import * as Dialog from "@radix-ui/react-dialog";
import { Suspense, useDeferredValue, useState } from "react";

interface BookSelectDialogProps {
  onSelect: (bookId: number) => void;
  selectedBookIds: number[];
  children: React.ReactNode;
}

export default function BookSelectDialog({
  onSelect,
  selectedBookIds,
  children,
}: BookSelectDialogProps) {
  const [open, setOpen] = useBoolean(false);
  const [search, setSearch] = useState("");
  const handleSelect = (bookId: number) => {
    onSelect(bookId);
    setOpen(false);
  };
  const deferredSearch = useDeferredValue(search);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <div className="fixed inset-0 bg-black/30 z-50"></div>
        </Dialog.Overlay>

        <Dialog.Content asChild>
          <div className="fixed top-40 left-1/2 -translate-x-1/2 p-4 rounded-2xl mx-auto z-50 bg-surface-container-high">
            <div className="flex items-center justify-between">
              <div>
                <Dialog.Title>책 선택</Dialog.Title>
              </div>

              <Dialog.Close asChild>
                <Button variant="ghost" size="icon">
                  <span className="material-icons">close</span>
                </Button>
              </Dialog.Close>
            </div>
            <div className="mt-4">
              <Input
                placeholder="책 검색"
                value={search}
                onChange={(event_) => setSearch(event_.target.value)}
                autoFocus
              />
              <div className="w-[420px] h-[400px]">
                <Suspense fallback={<p>책 목록을 불러오는 중...</p>}>
                  <BookSearchResult
                    onSelect={handleSelect}
                    selectedBookIds={selectedBookIds}
                    query={deferredSearch}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface SearchBookProps {
  onSelect: (bookId: number) => void;
  selectedBookIds: number[];
  query?: string;
}

function BookSearchResult({
  onSelect,
  selectedBookIds,
  query,
}: SearchBookProps) {
  const { data: bookResult } = useBooksPagination({
    page: 1,
    limit: 12,
    query,
  });

  return (
    <ul className="flex flex-col gap-4 mt-4 h-full overflow-y-auto w-full">
      {bookResult.data.map((book) => (
        <li key={book.id} className="flex items-center gap-4 justify-between">
          <NextImage
            src={book.coverImage}
            alt={book.title}
            width={80}
            height={80}
            className="w-20 h-20 object-contain rounded-lg"
          />
          <p className="line-clamp-2">{book.title}</p>
          {selectedBookIds.includes(book.id) ? (
            <Button variant="outline" disabled>
              선택됨
            </Button>
          ) : (
            <Button onClick={() => onSelect(book.id)}>선택</Button>
          )}
        </li>
      ))}
    </ul>
  );
}
