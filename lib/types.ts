// Shared types for the app

// DB representation (as returned by Prisma) — createdAt/updatedAt are Date
export type DbPost = {
  id: number;
  title: string;
  content: string;
  tags: string;
  createdAt: Date;
  updatedAt: Date;
};

// Client-safe representation (dates serialized as ISO strings)
export type Post = {
  id: number;
  title: string;
  content: string;
  tags: string; // stored as comma-separated string
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export type PostForClient = Omit<Post, 'tags'> & { tags: string[] };

export function serializePost(dbPost: DbPost): Post {
  return {
    id: dbPost.id,
    title: dbPost.title,
    content: dbPost.content,
    tags: dbPost.tags ?? "",
    createdAt: dbPost.createdAt ? new Date(dbPost.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: dbPost.updatedAt ? new Date(dbPost.updatedAt).toISOString() : new Date().toISOString(),
  };
}
