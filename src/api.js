const axios = require("axios");

async function fetchReferralData(token) {
  try {
    const { data } = await axios({
      url: "https://fintopio-tg.fintopio.com/api/referrals/data",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.log(
      `✗ Error fetching referral data: ${error.response.data.message}`.red
    );
  }
}

async function fetchTasks(token) {
  try {
    const { data } = await axios({
      url: "https://fintopio-tg.fintopio.com/api/hold/tasks",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.log(`✗ Error fetching tasks: ${error.response.data.message}`.red);
  }
}

async function startTask(token, id) {
  try {
    const { data } = await axios({
      url: `https://fintopio-tg.fintopio.com/api/hold/tasks/${id}/start`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {},
    });

    return data;
  } catch (error) {
    if ( error.response.data.message.includes("update task") || error.response.data.message.includes("not found") ) {
      console.log(
        `✗ Task with ID "${id}" failed to start, please do it manually!`.red
      );
    } else {
      console.log(`✗ Error starting task: ${error.response.data.message}`.red);
    }
  }
}

async function claimTask(token, id) {
  try {
    const { data } = await axios({
      url: `https://fintopio-tg.fintopio.com/api/hold/tasks/${id}/claim`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {},
    });

    return data;
  } catch (error) {
    if (
      error.response.data.message.includes("update task") ||
      error.response.data.message.includes("not found")
    ) {
      console.log(
        `✗ Task with ID "${id}" failed to claim, please do it manually!`.red
      );
    } else {
      console.log(`✗ Error claiming task: ${error.response.data.message}`.red);
    }
  }
}

async function dailyCheckin(token) {
  try {
    const { data } = await axios({
      url: "https://fintopio-tg.fintopio.com/api/daily-checkins",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {},
    });

    return data;
  } catch (error) {
    console.log(`✗ Error during daily check-in: ${error}`);
  }
}

async function claimFarming(token) {
  try {
    const { data } = await axios({
      url: "https://fintopio-tg.fintopio.com/api/farming/claim",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {},
    });

    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log(`Farming already claimed, try again later!`.red);
    } else {
      console.log(`✗ Error claiming farming: ${error}`.yellow);
    }
  }
}

async function startFarming(token) {
  try {
    const { data } = await axios({
      url: "https://fintopio-tg.fintopio.com/api/farming/farm",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {},
    });

    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log(`Farming already started, try again later!`.red);
    } else {
      console.log(`✗ Error starting farming: ${error}`);
    }
  }
}

async function fetchDiamond(token) {
  try {
    const { data } = await axios({
      url: "https://fintopio-tg.fintopio.com/api/clicker/diamond/state",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.log(`✗ Error fetching diamond: ${error.response.data.message}`.red);
  }
}

async function claimDiamond(token, id) {
  try {
    const { data } = await axios({
      url: "https://fintopio-tg.fintopio.com/api/clicker/diamond/complete",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        diamondNumber: id,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

async function getGameInfo(token) {
  try {
    const { data } = await axios({
      url: "https://fintopio-tg.fintopio.com/api/hold/space-tappers/game-settings",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.log(`✗ Error fetching diamond: ${error.response.data.message}`.red);
  }
}

async function claimGameReward(token, score) {
  try {
    const { data } = await axios({
      url: "https://fintopio-tg.fintopio.com/api/hold/space-tappers/add-new-result",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        score: score,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetchReferralData,
  fetchTasks,
  startTask,
  claimTask,
  dailyCheckin,
  claimFarming,
  startFarming,
  fetchDiamond,
  claimDiamond,
  getGameInfo,
  claimGameReward,
};
