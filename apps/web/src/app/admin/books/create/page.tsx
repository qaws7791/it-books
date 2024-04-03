import BookCreateForm from "@web/src/app/admin/books/create/_components/BookCreateForm";

export default function AdminBookCreatePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">도서 추가</h1>
      <BookCreateForm />
    </div>
  );
}
