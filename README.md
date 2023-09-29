# Slackメッセージタスク抽出ツール

このツールは、Slackからのメッセージを取得し、そのメッセージから行動やタスクをGPT-4を使用してリストアップし、再度Slackにそのタスクリストを送信します。

## 設定

1. `SLACK_WEBHOOK_URL`、`GPT_API_ENDPOINT`、および`GPT_API_KEY`の各定数を適切な値に設定します。

## 主な関数

### fetchTasksFromMessage(originalMessage)

- **パラメータ:** 
  - `originalMessage` (string): タスクを抽出する元のSlackメッセージ。
- **戻り値:** 抽出されたタスクのリストまたはエラーメッセージ。

### postToSlack(message)

- **パラメータ:** 
  - `message` (string): Slackに送信するメッセージ。
- **戻り値:** なし。

### parseUrlEncodedData(data)

- **パラメータ:** 
  - `data` (string): URLエンコードされたデータ。
- **戻り値:** パースされたデータのオブジェクト。

### doPost(e)

- **パラメータ:** 
  - `e` (object): doPostイベントのデータ。
- **戻り値:** 処理結果メッセージ。

## 使用方法

1. Slackからのメッセージを受け取るためのWebhookを設定します。
2. このスクリプトをホストして、SlackからのWebhookリクエストを受け取るようにします。
3. メッセージが受信されると、`doPost`関数が実行され、そのメッセージからタスクが抽出され、再度Slackに送信されます。
