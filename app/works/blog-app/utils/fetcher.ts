export async function fetcher(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  // ネットワークエラーなどで response がない場合は例外を投げる
  if (!res) {
    throw new Error("No response from server");
  }

  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    // JSON でないレスポンスはそのままテキストを返す
    data = text;
  }

  if (!res.ok) {
    const err: any = new Error((data && data.error) || res.statusText || "Error");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}
