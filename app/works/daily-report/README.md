　# 業務日報アプリ

このアプリは、日々の作業内容や学習記録を手軽に残し、後から見返しやすくするための 個人向け業務日報アプリ です。
一覧・詳細・編集・削除までの基本的な CRUD を一通り実装した、Next.js（App Router）＋ Supabase＋SWR の学習を兼ねたプロジェクトです。

**目的（何のために作ったアプリ？）**

- 個人の作業ログ・学習ログを手軽に残せるようにする
- タグやキーワードで、必要な情報に素早くアクセスできるようにする
- Next.js App Router の理解（SSR/CSR/API Routes）
- Supabase の CRUD・スキーマ管理の経験
- SWR を使ったクライアントサイドのデータ取得 を実践するため

**主な機能**

- 投稿の作成・編集・削除（CRUD）
- タグ管理（複数タグ対応）
- キーワード検索
- タグフィルター（TagFilter コンポーネント）
- 下書き（draft）／公開ステータス
- 「確認済み/未確認」のチェックトグル
- API Routes（App Router 標準）でのバックエンド実装
- SWR を使ったクライアント側の楽観的更新

**技術構成**
- Framework: Next.js 14（App Router）
- Language: TypeScript
- UI: React / Tailwind CSS
- Backend: Next.js API Routes
- DB: Supabase（PostgreSQL）
- Data Fetching: SWR / fetch
- Form: React Hook Form（バリデーション含む）
- Auth: next-auth（ログインページのみ）

構成のポイント
- App Router のルーティングと API Routes を使い、フロント〜バックの流れを理解することを重視
- Supabase を採用し、DB スキーマと CRUD 操作を一通り体験
- フロントは SWR によるキャッシュ・更新の扱いを学習

**主な実装ディレクトリ**
app/
└── works/
    └── daily-report/
        ├── api/
        │   └── posts/             # CRUD API Routes
        ├── components/            # PostForm, PostList など UI
        ├── lib/
        │   ├── supabaseClient.ts  # Supabase 初期化
        │   └── fetcher.ts         # SWR 用 fetcher
        ├── page.tsx               # 一覧
        ├── [id]/page.tsx          # 詳細
        └── [id]/edit/page.tsx     # 編集


**エンドポイント一覧**
- `GET  /app/works/daily-report/api/posts` — 投稿一覧
- `POST /app/works/daily-report/api/posts` — 新規作成
- `GET  /app/works/daily-report/api/posts/:id` — 詳細取得
- `PUT  /app/works/daily-report/api/posts/:id` — 更新
- `DELETE /app/works/daily-report/api/posts/:id` — 削除
- `PATCH /app/works/daily-report/api/posts/check` — チェック状態をトグル

**環境変数（主なもの）**

- NEXT_PUBLIC_SUPABASE_URL=
- NEXT_PUBLIC_SUPABASE_ANON_KEY=
- NEXTAUTH_URL=
- NEXTAUTH_SECRET=

**開発手順（ローカル）**

```powershell
npm install
npm run dev
```

環境変数を .env.local に設定してから実行してください。

**データストアに Supabase を採用した理由**

- RLS や API を自前で書かなくてもよく、開発スピードが速い。
- Next.js との相性が良く、学習目的にも向いているため。

**認証について**

- 現状の仕様ではシンプルさを優先するため、単一ユーザーで運用できる形にしています。
- 今後、複数ユーザー運用（投稿者別管理）も追加予定のため、NextAuth を採用しています。

**今後の拡張予定（検討中）**

- コメント機能
- 投稿の CSV / PDF エクスポート
- 複数ユーザー対応（Supabase Auth + user_id での権限管理）

---
