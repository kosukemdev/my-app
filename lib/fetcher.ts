export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('エラーが発生しました。');
  }
  return res.json() as Promise<T>;
};

// src/lib/fetcher.ts
// export const fetcher = (url: string) =>
//   fetch(url).then((res) => {
//     if (!res.ok) throw new Error("Fetch error");
//     return res.json();
//   });
