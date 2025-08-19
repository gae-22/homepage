# Copilot 実行前チェック

このリポジトリで作業する際は、必ず先に `.github/copilot-instrucstions.poml` を読み、その指示に従ってください。

- 本格的な運用方針・技術スタック・ディレクトリ構成・ブログ投稿規約・検索/タグ運用・フォーマッタ/リンター設定方針は、すべて POML に記載しています。
- 何をするか迷ったら、まず POML の `<task>` を確認して該当タスクを実行してください。

参照: `.github/copilot-instrucstions.poml`

## コミットメッセージ

<!-- Use a modern, consistent style combining emoji + Conventional Commits. Keep subjects short and imperative; add detail in the body. -->

- モダンで一貫性のあるスタイルを使用し、絵文字と Conventional Commits を組み合わせてください。
- 主題は短く命令形で、本文に詳細を追加してください。

### フォーマット

```
emoji type;(scope)<!>: <subject>
```

### 規則

<!-- - Subject: imperative mood, ≤ 72 chars, no trailing period.
- Scope: optional, lower-kebab-case (e.g., blog, tags, search, layout, components, lib, scripts, config, ci).
- Use ! for breaking changes and add a BREAKING CHANGE: footer.
- Body: why and what changed; wrap at ~72 chars.
- Footer: references (e.g., Closes #123), co-authors, BREAKING CHANGE. -->

- 主題: 命令形，72文字以下，末尾にピリオドなし．
- スコープ: 任意，小文字（例: blog, tags, search, layout, components, lib, scripts, config, ci）。
- `!` を使用してブレイキングチェンジを示し，`BREAKING CHANGE: フッター` を追加する。
- 本文: 変更の理由と内容; ~72文字で折り返す
- フッター: 参照（例: Closes #123）、共同作成者、BREAKING CHANGE．
- 日本語: コミットメッセージは日本語で記述する（簡潔な表現を心がける）。

Types + emoji:
✨ feat – new feature
🐛 fix – bug fix
📝 docs – docs only changes
🎨 style – formatting/ui changes (no logic)
♻️ refactor – code change that neither fixes a bug nor adds a feature
⚡️ perf – performance improvements
✅ test – add/update tests
🏗️ build – build system or dependencies
🤖 ci – CI configuration
🧹 chore – maintenance tasks
⏪ revert – revert previous commit

Examples:
✨ feat(blog): All Posts にインライン検索フィルタを追加
🐛 fix(tags): 空のタグ一覧でもクラッシュしないように修正
🎨 style(layout): 余白を調整しコントラストを改善
♻️ refactor(lib): Markdown ローダーと型を簡素化
🏗️ build: TypeScript を 5.6.x に固定
🤖 ci: Netlify 用に .next のビルドキャッシュを追加
