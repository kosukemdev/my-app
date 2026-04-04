# Kosuke Masaki Portfolio

未経験からフロントエンドエンジニア転職を目指すために制作しているポートフォリオサイトです。  
React / Next.js を中心に、実務に近い課題設定を意識した Web アプリを掲載しています。

## URL

- Portfolio: `/`
- About: `/about`
- Works: `/works`

## 掲載作品

### 1. 業務日報アプリ

工場業務の進捗記録・共有を想定した日報管理アプリです。  
投稿・編集・削除に加えて、タグ絞り込み、キーワード検索、公開管理、確認済み状態の切り替えを実装しています。

- 主な技術: Next.js / TypeScript / Supabase / SWR / NextAuth
- 詳細: [`app/works/daily-report/README.md`](./app/works/daily-report/README.md)

### 2. 気分記録アプリ

日々の気分とメモを記録するシンプルなログアプリです。  
小規模な UI の中で Zustand を使った状態管理と永続化の整理を行いました。

- 主な技術: Next.js / TypeScript / Zustand / Tailwind CSS
- 詳細: [`app/works/mood-log/README.md`](./app/works/mood-log/README.md)

## 技術スタック

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
- SWR
- Zustand
- NextAuth

## 開発環境の起動

```bash
npm install
npm run dev
```

`.env.local` に必要な環境変数を設定してから起動してください。

## このポートフォリオで伝えたいこと

- 実務経験で得たコーディングの基礎を、アプリ開発へ広げて学習していること
- UI だけでなく、状態管理やデータ設計まで含めて考えていること
- 作った機能だけでなく、課題設定や実装意図も説明できること
