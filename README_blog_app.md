# Blog App — 説明ドキュメント（面接用）

このドキュメントは、`app/works/blog-app` の構成と設計意図、デモ手順、面接で使える説明ポイントを短くまとめたものです。面接で自分の実装を説明するときに読んでください。

---

## 1. エレベーターピッチ（30秒以内）
このプロジェクトは Next.js（App Router）を使ったシンプルなブログアプリです。主な特徴は、クライアント側でのフィルタ（Zustand）、データ取得に SWR、Markdown プレビュー（react-markdown）、および NextAuth を用いた GitHub 認証です。現在データはローカルの `posts.json` に保存する簡易的な実装で、学習目的と面接での説明に最適な構成になっています。

---

## 2. 技術スタックと役割
- Next.js (App Router)
- TypeScript / React
- SWR: データ取得のキャッシュと再検証
- next-auth: 認証（GitHub）
- zustand: クライアント状態管理（フィルタ）
- react-markdown + remark-gfm: Markdown レンダリング
- fs を使ったファイルベースの簡易永続化（`posts.json`）

---

## 3. アーキテクチャ（テキスト図）

Client (ブラウザ)
  ├─ Next.js Client Components (PostList, PostFilter, NewPost UI)
  ├─ Zustand (選択タグ、キーワード)
  └─ SWR -> GET /works/blog-app/api/posts  

Server (Next API Route)
  └─ app/works/blog-app/api/posts/route.ts
       ├─ readPosts() -> reads app/.../posts.json
       └─ writePosts() -> writes app/.../posts.json (注意: serverless では非推奨)

認証: next-auth が Session を提供し、UI にログイン状態を反映

---

## 4. 主要ファイル（短い説明）
- `app/works/blog-app/page.tsx` — 一覧ページ（SWR で /api/posts を取得、フィルタ UI 表示）
- `app/works/blog-app/layout.tsx` — blog-app 用の Session provider をラップ
- `app/works/blog-app/new/page.tsx` — 新規作成フォーム（Markdown プレビューあり）
- `app/works/blog-app/[id]/page.tsx` — 記事詳細ページ（Markdown をレンダリング）
- `app/works/blog-app/components/PostList.tsx` — 投稿の一覧表示（フィルタ適用）
- `app/works/blog-app/components/Postfilter.tsx` — タグ選択・検索 UI（zustand 使用）
- `app/works/blog-app/components/AuthButton.tsx` — ログイン/ログアウト UI
- `app/works/blog-app/api/posts/data.ts` — `readPosts()` / `writePosts()`（fs ベース）
- `app/works/blog-app/api/posts/route.ts` — GET（一覧）※ 現状 POST 実装が必要な場合あり
- `app/works/blog-app/api/posts/posts.json` — サンプルデータ

---

## 5. ローカルでのデモ手順（最小・読み取りのみ）
読み取りのみを確認する場合（環境変数なし）:

```powershell
# ルートで
npm install
npm run dev
# ブラウザで http://localhost:3000/works/blog-app を開く
```

認証（GitHub）を使う場合は `NEXTAUTH_URL`, `GITHUB_ID`, `GITHUB_SECRET` 等の環境変数が必要です。環境変数の設定方法はリポジトリの README に記載するか、`.env.local` に追加してください。

---

## 6. 面接で使える説明ポイント（短め）
- なぜ Next.js を選んだか: App Router によるサーバー/クライアント分離、ファイルベースルーティングの利便性。
- データ取得に SWR を使った理由: キャッシュ、再検証、フォールバックを簡潔に扱えるから。
- 状態管理に zustand を選んだ理由: 小さくてシンプル、使い勝手が良い（コンテキストの煩雑さを避けられる）。
- Markdown の扱い: `react-markdown` + `remark-gfm` で GitHub スタイルの Markdown をレンダリングしている。
- 認証: `next-auth` で GitHub OAuth を導入し、セッションに基づく表示制御（編集/投稿ボタンを表示）を行っている。

---

## 7. よくある質問と模範回答（面接想定）
Q: データ保存はどうしている？本番で問題ないの？
A: 現在は `posts.json` を fs で読み書きするローカル実装です。ローカル開発や面接デモ向けには十分ですが、Vercel のような serverless 環境では書き込みが推奨されません。本番では SQLite + Prisma、もしくは Supabase/Firebase のような永続ストレージに移行します。

Q: 同時書き込みの問題は？
A: 現状は対策していません。実務ならトランザクション管理や DB の排他制御、あるいは API 層での楽観ロックを検討します。

Q: セキュリティ対策は？
A: Markdown は `react-markdown` でレンダリングしており、危険な HTML を直接扱わないようにしていますが、ユーザー入力をサニタイズするか、XSS リスクを確認する必要があります。next-auth のセッションや OAuth の秘密情報は環境変数で保管します。

Q: テストはあるか？
A: 今はテスト未実装です。まずユニットテスト（投稿 API）とスモークテスト（主要ページのレンダリング）を追加し、CI（GitHub Actions）で自動化する予定です。

---

## 8. 改善案（短期〜中期）
- すぐやる（面接でポイントになる）: 新規投稿の POST 実装、型（Post）をコンポーネントへ適用、README にデプロイ注意点記載。
- 次にやる: 永続化を外部 DB へ移行（Supabase / SQLite + Prisma）、API に CRUD を追加、E2E テスト。
- 長期: CI/CD、テストカバレッジ、アクセシビリティ改善。

---

## 9. 面接での短いデモシナリオ（60〜90秒）
1. 一覧ページを開いてタグで絞り込む（UI の応答を説明）。
2. 記事をクリックして Markdown がレンダリングされる様子を見せる。
3. （ログインしていれば）新規投稿フォームで Markdown プレビューを見せる。作成はローカル実装では未完成なら "ここで POST して保存する想定" と説明。

---

## 10. トラブルシュート（よくある起動失敗）
- `npm run dev` が失敗する場合:
  - `node` / `npm` のバージョンを確認してください（推奨: Node 18+）
  - NextAuth の設定が無いとログイン関連でエラーが出ることがあります。環境変数を用意するか、ログイン機能に触らず読み取りだけを確認してください。

---

## 11. 次のステップ（私から提案）
- （A）新規投稿を実際に保存できるように POST ハンドラとフォーム送信を実装（ローカル fs ベース、30〜60 分）
- （B）型付けの整備（Post 型を厳密に使う、30〜90 分）
- （C）README にデプロイ手順と環境変数の説明を追記（15〜30 分）

どれを優先するか教えてください。さらに、面接の想定質問に対する模範回答の練習（ロールプレイ）を今から一緒にできます。