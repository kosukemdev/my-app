// fetch API をラップしたユーティリティ関数
// レスポンスの JSON パースとエラーハンドリングを行う

// FetchError 型は、fetch エラーにステータスコードとデータを追加したもの
export type FetchError = Error & { status?: number; data?: unknown };

// ジェネリック型 T を使って、返されるデータの型を指定可能にする  
// ジェネリック型とは、関数やクラス、インターフェースなどで使われる型のパラメータのこと
// 呼び出し時に具体的な型を指定できる
// 例えば fetcher<User[]> のように使うと、User 型の配列が返される
export async function fetcher<T = unknown>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res) {
    throw new Error("No response from server");
  }

  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (_err) {
    data = text;
  }

  if (!res.ok) {
    const message =
      typeof data === "object" && data && "error" in (data as Record<string, unknown>)
        ? String((data as Record<string, unknown>).error)
        : res.statusText || "Error";
    const err = new Error(message) as FetchError;
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data as T;
}
