const SLACK_WEBHOOK_URL = "";
const GPT_API_ENDPOINT = "";
const GPT_API_KEY = "";

function fetchTasksFromMessage(originalMessage) {
  const instruction =
    'このメッセージから行動やタスクをリストアップしてください: "' +
    originalMessage +
    '"';
  const options = {
    method: "post",
    headers: {
      Authorization: "Bearer " + GPT_API_KEY,
      "Content-type": "application/json",
    },
    muteHttpExceptions: true,
    payload: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: instruction }],
    }),
  };

  try {
    const response = UrlFetchApp.fetch(GPT_API_ENDPOINT, options);
    const jsonResponse = JSON.parse(response.getContentText());
    return jsonResponse["choices"][0]["message"]["content"];
  } catch (error) {
    return "Error: " + error.toString();
  }
}

function postToSlack(message) {
  const payload = {
    text: message,
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  };

  UrlFetchApp.fetch(SLACK_WEBHOOK_URL, options);
}

function parseUrlEncodedData(data) {
  const parsedData = {};
  const pairs = data.split("&");
  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    parsedData[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  return parsedData;
}

function doPost(e) {
  try {
    const receivedData = e.postData.contents;
    const slackData = parseUrlEncodedData(receivedData);
    const slackMessage = slackData.text;
    const tasks = fetchTasksFromMessage(slackMessage);

    postToSlack(tasks);

    return ContentService.createTextOutput("Message processed.");
  } catch (error) {
    return ContentService.createTextOutput(`Error: ${error.toString()}`);
  }
}
