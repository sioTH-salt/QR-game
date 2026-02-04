# イベント計測仕様 v1.0

## 1. 方針
- 最小構成で「流入 → 開始 → 完走 → CTA」の漏斗を追う。
- イベント名は固定し、パラメータを共通化する。

## 2. 共通パラメータ（全イベント）
- `stage_id`: チラシ/QR識別子（例: `flyer_a_001`）
- `difficulty`: 難易度（`easy`, `easy_plus`, `normal`, `hard_minus`, `hard`）
- `session_id`: ランダムID（1プレイ開始時に採番）
- `device_hint`: 簡易端末情報（例: `ios_safari`）
- `lang`: 言語（`ja`）
- `ts`: 送信時刻（UNIX ms）

## 3. イベント一覧
- `page_view_qr`: QR流入の初回表示
- `game_start`: ゲーム開始
- `game_quit_mid`: 途中離脱
- `bug_mid_start`: 途中バグ発見開始
- `bug_mid_complete`: 途中バグ発見完了
- `bug_final_start`: 最終バグ発見開始
- `bug_final_complete`: 最終バグ発見完了
- `game_complete`: 完走（またはクリア）
- `cta_click`: 予約ボタンクリック
- `form_visit`: 予約フォーム到達（可能なら遷移先で計測）

## 4. 追加パラメータ（イベント別）
- `game_start`: `selected_difficulty`
- `game_quit_mid`: `elapsed_sec`, `distance`, `mistake_count`
- `bug_mid_complete`: `is_correct`, `time_spent_ms`
- `bug_final_complete`: `is_correct`, `time_spent_ms`
- `game_complete`: `score`, `distance`, `mistake_count`, `diagnosis_type`
- `cta_click`: `cta_url`

## 5. KPI定義
- QR流入開始率 = `game_start / page_view_qr`
- 開始完走率 = `game_complete / game_start`
- 完走CTAクリック率 = `cta_click / game_complete`
- CTAフォーム到達率 = `form_visit / cta_click`

## 6. 送信失敗時
- 送信失敗でもゲーム進行は止めない。
- 可能ならメモリキューで再送、無理なら破棄。
