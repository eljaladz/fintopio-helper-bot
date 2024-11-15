const cron = require("node-cron");
const { fetchReferralData } = require("./api");
const { runCheckin, runFarm, runMine, runTasks, runGame, randomDelay } = require("./tasks");
const { createTable } = require("./display");

async function handleAutomate(BEARERS) {
  console.log("");
  console.log(`Fetching data, please wait...\n`.yellow);

  const currentTime = new Date();
  console.log(`Current time: ${currentTime.toLocaleTimeString("en-GB")}`);

  const table = await createTable(BEARERS, fetchReferralData);
  console.log(table);
  console.log("");

  console.log("Running bot for the first time...\n".cyan);
  await runCheckin(BEARERS);
  await runFarm(BEARERS);
  await runMine(BEARERS);
  await runTasks(BEARERS);
  await runGame(BEARERS);
  console.log("Completed ✓\n".green);

  cron.schedule("0 0-23 * * *", async () => {
    try {
      process.stdout.write("\x1Bc");
      const currentTime = new Date();
      console.log(`Fetching data, please wait...`.yellow);
      console.log("");
      console.log(`Current time: ${currentTime.toLocaleTimeString("en-GB")}`);
    } catch (error) {
      console.log("");
    }
  });

  cron.schedule("1 7 * * *", async () => {
    console.log("Checking in...".cyan);
    runCheckin(BEARERS);
    console.log("");
  });

  cron.schedule("3 7,15,23 * * *", async () => {
    console.log(`Farming...`.cyan);
    runFarm(BEARERS);
    console.log("");
  });

  cron.schedule("5 7-23 * * *", async () => {
    const tables = await createTable(BEARERS, fetchReferralData);
    console.log(tables);
    console.log("");
    console.log(`Starting mining...`.cyan);
    runMine(BEARERS);
    console.log("");
  });

  cron.schedule("10 7,15,23 * * *", async () => {
    console.log(`Starting game session...`.cyan);

    const startTime = Date.now();
    const maxDuration = 50 * 60 * 1000;
    let isSessionActive = true;

    const runGameSession = async () => {
      if (isSessionActive) {
        const currentTime = Date.now();
        if (currentTime - startTime >= maxDuration) {
          console.log(
            "Max duration reached, finishing current session only.".yellow
          );
          isSessionActive = false;
        }

        await runGame(BEARERS);
        await randomDelay(5000, 15000);
        
        if (isSessionActive) {
          runGameSession();
        } else {
          console.log(
            "Game session ended after completing the last round.".yellow
          );
        }
      }
    };

    runGameSession();
  });

  cron.schedule("10 7 * * 1,3,5", async () => {
    console.log(`Completing tasks...`.cyan);
    runTasks(BEARERS);
    console.log("");
  });

  console.log("Tasks scheduled. The bot will run automatically.".green);
  console.log("Subscribe: https://t.me/NoDrops ☂\n".green);
}

module.exports = {
  handleAutomate,
};
