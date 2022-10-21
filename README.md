Next.js + microCMS + Chakra UIの日記サイトです。

[https://www.qlitre-dialy.ink/](https://www.qlitre-dialy.ink/)

## microCMS APIスキーマ

### category
endpoint:`category`

| フィールド ID | 表示名       | 種類                        |
| ------------- | ---------- | --------------------------- |
| name         | カテゴリ名   | テキストフィールド          |

### tag
endpoint:`tag`

| フィールド ID | 表示名     | 種類                        |
| ------------- | ---------- | --------------------------- |
| name         | タグ名   | テキストフィールド          |

### カスタムフィールド
フィールドID:`richEditor`

| フィールド ID | 表示名     | 種類                        |
| ------------- | ---------- | --------------------------- |
| richText      | リッチエディタ | リッチエディタ |

フィールドID:`amazonLink`

| フィールド ID | 表示名            | 種類                         |
| ------------- | ----------       | --------------------------- |
| productName         | タイトル   | テキストフィールド            |
| productImage       | イメージ   | 画像                    |
| productLink         | リンク   | テキストエリア           |

### post
endpoint:`post`


| フィールド ID | 表示名     | 種類                        |
| ------------- | ---------- | ---------------------------|
| title         | タイトル   | テキストフィールド          |
| thumbnail       | サムネイル   | 画像                    |
| description         | 詳細   | テキストエリア          |
| keywords         | キーワード   | テキストフィールド　　|
| category      | カテゴリ | コンテンツ参照 - カテゴリー |
| tag           | タグ       | 複数コンテンツ参照 - タグ   |
| toc_visible   | 目次       | 真偽値                      |
| text          | 本文       | リッチエディタ              |
| useRepeatedBody   | リピートコンテンツを使うかどうか       | 真偽値 |
| repeatedBody | 繰り返し本文   | 繰り返し - カスタムフィールド |
