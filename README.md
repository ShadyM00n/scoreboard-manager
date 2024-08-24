# Minecraft Scoreboard Manager

This module provides a utility for managing Minecraft scoreboards using the `@minecraft/server` module. It includes methods to get, set, add, and transfer scores between players, as well as other useful functions for handling scoreboards.

## Installation

To use this module, ensure you have the `@minecraft/server` module installed in your project. You can install it using npm if you haven't already:

```bash
npm install @minecraft/server
```

## Usage

Import the `Scoreboard` module and use the provided methods to interact with scoreboards.

### Example Code

```javascript
import { Scoreboard } from './path/to/your/scoreboard-module';

// Example: Setting a score for a player
await Scoreboard.player.set('player1', 'myScoreboard', 100);

// Example: Getting a player's score
const score = await Scoreboard.player.get('player1', 'myScoreboard');
console.log(`Player1's score: ${score}`);

// Example: Adding to a player's score
await Scoreboard.player.add('player1', 'myScoreboard', 50);

// Example: Clearing a player's score
await Scoreboard.player.clear('player1', 'myScoreboard');

// Example: Transferring scores between players
const transferResult = await Scoreboard.transfer(['player1', 'player2'], 'myScoreboard', 30);
if (transferResult) {
    console.log('Score transferred successfully.');
} else {
    console.error('Score transfer failed.');
}

// Example: Getting the total score across all players
const totalScore = await Scoreboard.total('myScoreboard');
console.log(`Total score: ${totalScore}`);

// Example: Getting the leaderboard
const leaderboard = await Scoreboard.leaderboard('myScoreboard');
console.log('Leaderboard:', leaderboard);

// Example: Deleting a scoreboard
await Scoreboard.delete('myScoreboard');
console.log('Scoreboard deleted.');

// Example: Clearing all scores from a scoreboard
await Scoreboard.clear('myScoreboard');
console.log('All scores cleared.');
```

## Methods

### `Scoreboard.player.get(name, scoreboard)`

Get the score of a player from a specified scoreboard.

- **Parameters:**
  - `name` (string): The name of the player.
  - `scoreboard` (string): The name of the scoreboard.

- **Returns:** `Promise<number>`

### `Scoreboard.player.set(name, scoreboard, amount)`

Set the specified amount to the player in the scoreboard.

- **Parameters:**
  - `name` (string): The name of the player.
  - `scoreboard` (string): The name of the scoreboard.
  - `amount` (number): The amount to set.

- **Returns:** `Promise<boolean>`

### `Scoreboard.player.clear(name, scoreboard)`

Clear the specified player's score in the scoreboard.

- **Parameters:**
  - `name` (string): The name of the player.
  - `scoreboard` (string): The name of the scoreboard.

- **Returns:** `Promise<boolean>`

### `Scoreboard.player.add(name, scoreboard, amount)`

Add the specified amount to the player in the scoreboard.

- **Parameters:**
  - `name` (string): The name of the player.
  - `scoreboard` (string): The name of the scoreboard.
  - `amount` (number): The amount to add.

- **Returns:** `Promise<boolean>`

### `Scoreboard.player.remove(name, scoreboard, amount)`

Remove the specified amount from the player in the scoreboard.

- **Parameters:**
  - `name` (string): The name of the player.
  - `scoreboard` (string): The name of the scoreboard.
  - `amount` (number): The amount to remove.

- **Returns:** `Promise<boolean>`

### `Scoreboard.transfer(players, scoreboard, amount)`

Transfer a specified amount from one player to another in the specified scoreboard.

- **Parameters:**
  - `players` (Array<[string, string]>): An array containing two player names: the sender and the receiver.
  - `scoreboard` (string): The name of the scoreboard.
  - `amount` (number): The amount to transfer.

- **Returns:** `Promise<boolean>`

### `Scoreboard.total(scoreboard)`

Get the overall balance of the specified scoreboard.

- **Parameters:**
  - `scoreboard` (string): The name of the scoreboard.

- **Returns:** `Promise<number>`

### `Scoreboard.list(scoreboard)`

Get all the players and their scores from the specified scoreboard.

- **Parameters:**
  - `scoreboard` (string): The name of the scoreboard.

- **Returns:** `Promise<Array<{ name: string, value: number }>>`

### `Scoreboard.allData(scoreboard)`

Get all data from the specified scoreboard.

- **Parameters:**
  - `scoreboard` (string): The name of the scoreboard.

- **Returns:** `Promise<{ total: number, players: Array<{ name: string, value: number }> }>` 

### `Scoreboard.leaderboard(scoreboard, amount)`

Grab the highest balances of the specified scoreboard.

- **Parameters:**
  - `scoreboard` (string): The name of the scoreboard.
  - `amount` (number, optional): The number of top scores to retrieve (default is 10).

- **Returns:** `Promise<Array<{ placement: number, name: string, value: number }>>`

### `Scoreboard.delete(scoreboard)`

Delete the specified scoreboard from the game.

- **Parameters:**
  - `scoreboard` (string): The name of the scoreboard.

- **Returns:** `Promise<boolean>`

### `Scoreboard.clear(scoreboard)`

Clear all scores of the specified scoreboard.

- **Parameters:**
  - `scoreboard` (string): The name of the scoreboard.

- **Returns:** `Promise<void>`


## Support

- [x] Javascript
- [x] Typescript


## Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
