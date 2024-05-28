"use client";
import { useBooksPagination } from "@/src/books/queries";
import NextImage from "@/src/shared/components/next-image";
import Button from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import useBoolean from "@/src/shared/hooks/use-boolean";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

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
  const { data: bookResult } = useBooksPagination({
    page: 1,
    limit: 10,
    query: search,
  });

  const handleSelect = (bookId: number) => {
    onSelect(bookId);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <div className="fixed inset-0 bg-black/30"></div>
        </Dialog.Overlay>

        <Dialog.Content asChild>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-2xl mx-auto max-w-screen-md z-40 bg-surface-container-high">
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
              <ul className="flex flex-col gap-4 mt-4">
                {bookResult.data.map((book) => (
                  <li
                    key={book.id}
                    className="flex items-center gap-4 justify-between"
                  >
                    <NextImage
                      src={book.coverImage}
                      alt={book.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                    <p>{book.title}</p>
                    {selectedBookIds.includes(book.id) ? (
                      <Button variant="outline" disabled>
                        선택됨
                      </Button>
                    ) : (
                      <Button onClick={() => handleSelect(book.id)}>
                        선택
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
