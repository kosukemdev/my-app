// Client-safe types for blog app
// Prisma's generated `Post` type uses Date objects which are not serializable
// safely across server -> client boundary when used in client components.
// Define a minimal, serializable Post type that matches the schema.

export type Post = {
  id: number;
  title: string;
  content: string;
  tags: string; // stored as comma-separated string in DB; client code often splits into string[]
  createdAt: string; // ISO string serialized from Date
  updatedAt: string; // ISO string
};

// Helper for client components that expect tags as string[]
export type PostForClient = Omit<Post, 'tags'> & { tags: string[] };

// Serialize a DB post (with Date fields) into the client Post shape.
export function serializePost(dbPost: any): Post {
  return {
    id: dbPost.id,
    title: dbPost.title,
    content: dbPost.content,
    tags: dbPost.tags ?? "",
    createdAt: dbPost.createdAt ? new Date(dbPost.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: dbPost.updatedAt ? new Date(dbPost.updatedAt).toISOString() : new Date().toISOString(),
  };
}
