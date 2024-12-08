const readlineSync = require("readline-sync");
const { fetchReferralData } = require("./api");
const {
  fetchTasks,
  startTask,
  claimTask,
  dailyCheckin,
  startFarming,
  claimFarming,
  fetchDiamond,
  claimDiamond,
  getGameInfo,
  claimGameReward,
  getDiamondBreathInfo,
  claimDiamondBreathReward,
} = require("./api");
const { displayHeader, createTable } = require("./display");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const moment = require("moment");

async function handleTasks(BEARERS) {
  displayHeader();
  console.log(`🚀 Fetching data, please wait...\n`.yellow);

  const table = await createTable(BEARERS, fetchReferralData);
  console.log(table);

  try {
    const options = readlineSync.question(`
Choose an option:
1. 🚀 Auto complete all tasks
2. 🪐 Auto click asteroid
3. 📅 Auto daily check-in
4. 🌱 Auto farming
5. 🎮 Auto play Space Tapper
6. 💎 Auto play Diamond Breath
7. ❌ Exit

Enter 1-7: `);

    if (options === "7") {
      console.log("👋 Exiting the bot. See you next time!".cyan);
      console.log("Subscribe: https://t.me/NoDrops.".green);
      console.log("Subscribe: https://t.me/HappyCuanAirdrop.".green);
      process.exit(0);
    }

    if (options === "1") {
      await runTasks(BEARERS);
    } else if (options === "2") {
      await runMine(BEARERS);
    } else if (options === "3") {
      await runCheckin(BEARERS);
    } else if (options === "4") {
      await runFarm(BEARERS);
    } else if (options === "5") {
      await runGame(BEARERS);
    } else if (options === "6") {
      await runDiamondBreathGame(BEARERS);
    } else {
      console.log("Invalid option!".red);
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`.red);
  }
}

async function randomDelay(min, max) {
  const delayTime = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delayTime));
}

async function runCheckin(BEARERS) {
  for (const [index, BEARER] of BEARERS.entries()) {
    console.log(`Account ${index + 1}:`);

    const checkinData = await dailyCheckin(BEARER);

    if (checkinData.claimed) {
      console.log(`Daily check-in successful!`.green);
    } else {
      console.log(
        `✗ You've already done the daily check-in. Try again tomorrow!`.red
      );
    }

    console.log(`Total daily check-ins: ${checkinData.totalDays}`.green);
    console.log(`Daily reward: ${checkinData.dailyReward}`.green);
    console.log(`Balance after check-in: ${checkinData.balance}`.green);
    console.log("");
  }

  await randomDelay(1000, 10000);
}

async function runFarm(BEARERS) {
  for (const [index, BEARER] of BEARERS.entries()) {
    console.log(`Account ${index + 1}:`);

    const claimResult = await claimFarming(BEARER);
    if (claimResult) {
      console.log(`Farming rewards claimed successfully!`.green);
    } else {
      console.log(`✗ No farming rewards to claim.`.yellow);
    }

    const farm = await startFarming(BEARER);
    if (farm) {
      console.log(`New farming session started!`.green);
      console.log(
        `Start time: ${moment(farm.timings.start).format(
          "MMMM Do YYYY, h:mm:ss a"
        )}`.green
      );
      console.log(
        `End time: ${moment(farm.timings.finish).format(
          "MMMM Do YYYY, h:mm:ss a"
        )}`.green
      );
    } else {
      console.log(`✗ Failed to start new farming session.`.red);
      console.log("");
    }

    await randomDelay(1000, 10000);
  }
}

async function runMine(BEARERS) {
  for (const [index, BEARER] of BEARERS.entries()) {
    console.log(`Account ${index + 1}:`);

    try {
      const getDiamond = await fetchDiamond(BEARER);

      if (getDiamond.state === "unavailable") {
        console.log(
          `✗ Your diamond is not available, please try again at ${moment(
            getDiamond.timings.nextAt
          ).format("MMMM Do YYYY, h:mm:ss a")}`.red
        );
        console.log("");
      } else {
        console.log(`Cracking...`.yellow);

        await claimDiamond(BEARER, getDiamond.diamondNumber);

        console.log(
          `Asteroid has been cracked! You get ${getDiamond.settings.totalReward} ◈!`
            .green
        );
        console.log("");
      }
    } catch (error) {
      console.log(`Error cracking diamond`.red);
      console.log("");
    }

    await randomDelay(1000, 10000);
  }
}

async function runTasks(BEARERS) {
  for (const [index, BEARER] of BEARERS.entries()) {
    console.log(`Account ${index + 1}:`);
    const tasks = await fetchTasks(BEARER);

    for (const item of tasks.tasks) {
      if (item.status === "available") {
        console.log(`Starting '${item.slug}' task...`.yellow);

        const startedTask = await startTask(BEARER, item.id);

        if (startedTask.status === "verifying") {
          console.log(`Task "${item.slug}" started!`.green);

          console.log(`Claiming ${item.slug} task...`.yellow);

          const claimedTask = await claimTask(BEARER, item.id);

          await delay(1000);

          if (claimedTask) {
            console.log(`Task "${item.slug}" claimed! Congrats!`.green);
          }
        }
      } else {
        console.log(`Claiming ${item.slug} task...`.yellow);

        const claimedTask = await claimTask(BEARER, item.id);

        await delay(1000);

        console.log("");

        if (claimedTask) {
          console.log(`Task "${item.slug}" claimed! Congrats!`.green);
          console.log("");
        }
      }
    }
  }
}

async function runGame(BEARERS) {
  const gamePromises = BEARERS.map(async (BEARER, index) => {
    try {
      const gameInfo = await getGameInfo(BEARER);

      const minScore = 374;
      const maxScore = 648;

      if (!gameInfo) {
        console.log(
          `Account ${
            index + 1
          }: ✗ Unable to fetch game info, please try again later`.red
        );
        console.log("");
        return;
      }

      const score =
        Math.floor(Math.random() * (maxScore - minScore + 1)) + minScore;
      const delayTime = score * (0.5 + Math.random() * 0.5);

      const actualScore = score * gameInfo.rate;
      console.log(
        `Account ${index + 1}: Playing for ${actualScore} scores...`.yellow
      );
      console.log("");

      await delay(delayTime * 1000);

      const claimResult = await claimGameReward(BEARER, score);

      if (claimResult) {
        const actualScore = claimResult.actualReward * gameInfo.rate;
        console.log(
          `Account ${
            index + 1
          }: Reward successfully claimed! You earned ${actualScore} points.`
            .green
        );
      } else {
        console.log(
          `Account ${
            index + 1
          }: ✗ Failed to claim reward, please try again later`.red
        );
      }
      console.log("");
    } catch (error) {
      console.log(`Error processing  game for Account ${index + 1}`.red);
      console.log("");
    }
  });

  await Promise.all(gamePromises);
}

async function runDiamondBreathGame(BEARERS) {
  const gamePromises = BEARERS.map(async (BEARER, index) => {
    try {
      const { isAvailableGame, rewardPerSecond } = await getDiamondBreathInfo(
        BEARER
      );

      if (!isAvailableGame) {
        console.log(
          ` Account ${index + 1}: ✗ Game is not available, try again later`.red
        );
        console.log("");
        return;
      }

      const seconds = Math.floor(Math.random() * (30 - 20 + 1)) + 20;

      console.log(
        `Account ${
          index + 1
        }: Playing for ${seconds} seconds... . (Reward Per Second: ${rewardPerSecond})`
          .cyan
      );
      console.log("");

      await delay(seconds * 1000);
      const claimResult = await claimDiamondBreathReward(BEARER, seconds);

      if (claimResult.reward) {
        console.log(
          `✓ Account ${index + 1}: Successfully claimed ${
            claimResult.reward
          } $HP!`.green
        );
      } else {
        console.log(`✗ Account ${index + 1}: Failed to claim reward`.red);
      }
    } catch (error) {
      console.log(`✗ Account ${index + 1}: Error occurred during game`.red);
    }
  });

  await Promise.all(gamePromises);
}

module.exports = {
  handleTasks,
  runMine,
  runTasks,
  runGame,
  runDiamondBreathGame,
  runFarm,
  runCheckin,
  randomDelay,
};
