# Fintopio Helper Bot

Automation to complete tasks, daily check in, farming and play games on the Fintopio Mini App.

## Features

- ✅ Auto Complete All Tasks
- 💎 Auto Click Asteroid (diamond)
- 📅 Auto Daily Check-in
- 🌱 Auto Farming
- 🎮 Auto Play Game
- 🌐 Multiple Accounts
- 🔄 Autorun (Scheduled 🌙)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/eljaladz/fintopio-helper-bot.git
   cd fintopio-helper-bot
   mv bearers.json.example bearers.json
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Input your token into `bearers.json` file.
    ```bash
    nano bearers.json
    ```

### Format of `bearers.json`

The `bearers.json` file should be an array of strings, each string being a bearer token for one account:

```json
[
  "your_bearer_token_1",
  "your_bearer_token_2",
  "your_bearer_token_3"
]
```

### How to get your Bearer Token

1. Open the Fintopio Telegram Bot: [JOIN HERE](https://fintop.io/UzXNTxGw)
2. Right-click anywhere in the bot and select **Inspect** to open the browser's developer tools.
3. Navigate to the **Console** tab.
4. Paste the following code in the console:

   ```javascript
   console.log(localStorage.getItem(Object.keys(localStorage).find(k => k.startsWith('authToken_'))));
   ```

5. The console will print your bearer token. Copy this token and paste it into the `bearers.json` file.

## Running the Bot

After setting up the `bearers.json` file, you can run the bot with the following command:

```bash
npm start
```

Follow the instructions in the terminal to select your desired action. 

> Use [GNU screen](https://www.gnu.org/software/screen/) or docker for better experience when using 🔄 Autorun features. 

## Disclaimer

This project is for educational purposes only. Use at your own risk. The authors are not responsible for any consequences resulting from the use of this software.

## References
- [Repository references](https://github.com/dante4rt/fintopio-airdrop-bot.git)

## Contributing

Feel free to submit issues or create pull requests to improve the bot.

## Donations

If you would like to support the development of this project, you can make a donation using the following addresses:

- **TON**: `UQDoLQNF-nt9CFOHBs9mQqxH9YJKrZ6mFPbAeHH8Jo9xIGCb`
- **EVM**: `0xfD1847bFAA92fb8c0d100b207d377490C5acd34c`
- **SOL**: `BBZjp11sJNvekXZEBhhYDro9gsyyhEKXXcfEEub5ubje`

## License

This project is licensed under the [MIT License](https://github.com/eljaladz/fintopio-helper-bot/blob/main/LICENSE).
