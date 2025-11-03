import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// PATCH /api/posts/like
export async function PATCH(req: Request) {
  try {
    const { id } = await req.json();

    // まず対象の投稿を取得
    const { data: post, error: fetchError } = await supabase
      .from("posts")
      .select("liked")
      .eq("id", id)
      .single();

    if (fetchError || !post) {
      return NextResponse.json(
        { message: "投稿が見つかりませんでした。" },
        { status: 404 }
      );
    }

    // likedをトグル（true → false、false → true）
    const newLiked = !post.liked;

    // 更新
    const { error: updateError } = await supabase
      .from("posts")
      .update({ liked: newLiked })
      .eq("id", id);

    if (updateError) {
      console.error(updateError.message);
      return NextResponse.json(
        { message: "更新に失敗しました。" },
        { status: 500 }
      );
    }

    return NextResponse.json({ id, liked: newLiked });
  } catch (err: any) {
    console.error("PATCH Error:", err.message);
    return NextResponse.json({ message: "不正なリクエストです。" }, { status: 400 });
  }
}
