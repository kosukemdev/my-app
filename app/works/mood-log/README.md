# Mood Log App

日々の気分を5段階で記録し、振り返るためのシンプルな気分ログアプリです。

---

## 機能
- 気分（5段階）とメモの記録
- ログ一覧表示
- ログの編集・削除
- 今日のログをハイライト表示
- データの永続化（リロード後も保持）

---

## 使用技術
- Next.js (App Router)
- React
- TypeScript
- Zustand
- Tailwind CSS
- localStorage（Zustand persist）

---

## 工夫した点・学び
- **Zustand** を用いて状態管理を一元化し、propsのバケツリレーを解消しました
- `persist` ミドルウェアを使い、ログデータのみを永続化（UI状態は保存しない設計）
- 編集状態を考慮し、リストアイテムをコンポーネント単位で切り出しました
- 空データが保存されないよう、store 側でバリデーションを実装しました

---

## 今後追加したい機能
- 日付でのフィルタリング
- 気分のグラフ表示
- 認証機能を追加して複数ユーザー対応

---

## ディレクトリ構成（抜粋）
app/
└ works/mood-log/
├ components/
│ ├ MoodForm.tsx
│ ├ MoodList.tsx
│ └ MoodItem.tsx
└ store/
└ moodStore.ts