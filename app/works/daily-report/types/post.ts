export type PostStatus = "published" | "draft";

export interface Post {
  id: string;
  title: string;
  content: string;
  tags: string[];
  status: PostStatus;
  // ISO 8601 文字列を想定。Supabase の行では updated_at が null の場合があるため nullable にする。
  createdAt: string;
  updatedAt: string | null;
  checked: boolean;
}

// Supabase の行（DB列名そのまま）を表す型。変換時に使うと安全。
export type PostRow = {
  id: string;
  title: string;
  content: string;
  tags: string[] | null;
  status: PostStatus | null;
  created_at: string;
  updated_at: string | null;
  checked: boolean | null;
};
