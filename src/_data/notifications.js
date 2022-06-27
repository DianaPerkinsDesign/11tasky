require("dotenv").config();
const path = require("path");
const fs = require("fs");
const { Octokit } = require("@octokit/rest");
const NOTIFICATIONS_CACHE_PATH = path.resolve("src/_data/.cached-notifications.json");

const token = process.env.PERSONAL_GITHUB_TOKEN;
const username = process.env.GITHUB_USERNAME;
const octokit = new Octokit({
  auth: token,
});

const logcolor = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  // Foreground (text) colors
  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    crimson: "\x1b[38m",
  },
  // Background colors
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    crimson: "\x1b[48m",
  },
};

const log = (color, text) => {
  console.log(`${color}%s${logcolor.reset}`, text);
};

module.exports = async function handler(req, res) {
  let cachedData;

  // Look for cached file
  try {
    cachedData = JSON.parse(fs.readFileSync(NOTIFICATIONS_CACHE_PATH, "utf8"));
    console.log(
      "🍕 Found a cache file. Number of notifications: ",
      Object.keys(cachedData).length
    );
    return cachedData;
  } catch (error) {
    console.log("💁‍♀️ No cache data found here:", NOTIFICATIONS_CACHE_PATH);
  }

  // Create cached file
  if (!cachedData) {
    console.log("🐈‍⬛ Fetching fresh issue data from GitHub...");
    const allNotifications = await octokit.rest.activity.listNotificationsForAuthenticatedUser()
      .then((notifications) => {
        let allFreshNotifications = notifications.data;

        console.log(
          "🍕🍕🍕 Grabbed from GitHub. Number of notifications: ",
          Object.keys(allFreshNotifications).length
        );
        cachedData = allFreshNotifications;
        return cachedData;
      });

    // Write to cache file
    console.log(Object.keys(allNotifications).length);
    try {
      fs.writeFileSync(NOTIFICATIONS_CACHE_PATH, JSON.stringify(allNotifications), "utf8");
      console.log("🍕 Created notifications cache");
    } catch (error) {
      log(logcolor.fg.red, "ERROR WRITING CACHE TO FILE");
      console.log(error);
    }
  }

  // return the cachedData
  return cachedData;
};

