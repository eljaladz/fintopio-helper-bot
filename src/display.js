require('colors');
const Table = require('cli-table3');

function displayHeader() {
  process.stdout.write('\x1Bc');
  const art = `
       _  __        ___                        
      / |/ / ___   / _ \\  ____ ___    ___   ___
     /    / / _ \\ / // / / __// _ \\  / _ \\ (_-<
    /_/|_/  \\___//____/ /_/   \\___/ / .__//___/
                                   /_/         
    `.blue;
  console.log(art);
  console.log("              ☂ https://t.me/NoDrops ☂          \n".cyan);
}

async function createTable(BEARERS, fetchReferralData) {
  const table = new Table({
    head: ['Number', 'Balance', 'Referral(s)', 'Level', 'Rank'],
    colWidths: [10, 15, 15, 10, 10],
    chars: {
      'top': '', 'top-mid': '', 'top-left': '', 'top-right': '',
      'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
      'left': '', 'left-mid': '', 'mid': '', 'mid-mid': '',
      'right': '', 'right-mid': '', 'middle': ' '
    },
    style: { 'padding-left': 0, 'padding-right': 0 }
  });

  let counter = 1;

  for (const BEARER of BEARERS) {
    const user = await fetchReferralData(BEARER);
    table.push([
      counter,
      user.balance,
      `${user.activations.used}/${user.activations.total}`,
      user.level.name,
      user.leaderboard.position,
    ]);
    counter++;
  }

  return table.toString();
}

module.exports = {
  displayHeader,
  createTable,
};
