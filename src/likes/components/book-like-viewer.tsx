"use client";

import { usePostBookLike } from "@/src/likes/api/post-book-like";
import { useBookLikes } from "@/src/likes/queries";
import Button from "@/src/shared/components/ui/button";

interface BookLikeViewerProperties {
  bookId: number;
}

export default function BookLikeViewer({ bookId }: BookLikeViewerProperties) {
  const { data: likes } = useBookLikes(bookId);
  const likeMutation = usePostBookLike();

  const liked = likes.currentUser?.liked;

  const handleLike = () => {
    if (!likes.currentUser) return;
    likeMutation.mutate({
      bookId,
      action: likes.currentUser.liked ? "delete" : "create",
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span>좋아요</span>
      <span className="inline-block min-w-4 text-center">{likes.count}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLike}
        disabled={likeMutation.isPending}
      >
        {likeMutation.isPending ? (
          <span className="material-icons animate-spin">sync</span>
        ) : liked ? (
          <span className="material-icons text-error">favorite</span>
        ) : (
          <span className="material-icons">favorite_border</span>
        )}
      </Button>
    </div>
  );
}
