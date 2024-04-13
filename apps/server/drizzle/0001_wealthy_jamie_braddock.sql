CREATE TABLE IF NOT EXISTS "book_likes" (
	"book_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"isbn" varchar(13) NOT NULL,
	"title" varchar(200) NOT NULL,
	"slug" varchar(200) NOT NULL,
	"image" text NOT NULL,
	"author" varchar(200) NOT NULL,
	"translator" varchar(200),
	"publisher" varchar(200) NOT NULL,
	"publication_date" date NOT NULL,
	"pages" integer NOT NULL,
	"category_id" integer,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "books_isbn_unique" UNIQUE("isbn"),
	CONSTRAINT "books_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "book_tags" (
	"book_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "book_tags_book_id_tag_id_pk" PRIMARY KEY("book_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name"),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book_likes" ADD CONSTRAINT "book_likes_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book_likes" ADD CONSTRAINT "book_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "books" ADD CONSTRAINT "books_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book_tags" ADD CONSTRAINT "book_tags_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book_tags" ADD CONSTRAINT "book_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
