import { NextResponse } from "next/server";
import { supabase } from "@/app/works/daily-report/lib/supabaseClient";

export async function PATCH(req: Request) {
  try {
    const { id } = await req.json();

    // 対象の投稿を取得
    const { data: post, error: fetchError } = await supabase
      .from("posts")
      .select("checked")
      .eq("id", id)
      .single();

    if (fetchError || !post) {
      return NextResponse.json(
        { message: "投稿が見つかりませんでした。" },
        { status: 404 }
      );
    }

    // checkedをトグル（true → false、false → true）
    const newchecked = !post.checked;

    // 更新
    const { error: updateError } = await supabase
      .from("posts")
      .update({ checked: newchecked })
      .eq("id", id);

    if (updateError) {
      console.error(updateError.message);
      return NextResponse.json(
        { message: "更新に失敗しました。" },
        { status: 500 }
      );
    }

    return NextResponse.json({ id, checked: newchecked });
  } catch (err: any) {
    console.error("PATCH Error:", err.message);
    return NextResponse.json({ message: "不正なリクエストです。" }, { status: 400 });
  }
}
