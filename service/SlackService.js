import { config as envConfig } from "dotenv";
import { WebClient as SlackWebClient } from "@slack/web-api";
envConfig();
const { env } = process;
const slack = new SlackWebClient(env.SLACK_TOKEN).chat;

export const slackMessage = async ({ text, channel }) => {
  try {
    await slack.postMessage({
      text,
      channel,
    });
  } catch (error) {
    console.log(error);
  }
};
