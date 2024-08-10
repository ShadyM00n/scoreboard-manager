import { world } from "@minecraft/server"

class Player {

    /**
     * Get the score of a player from a specified scoreboard.
     * @param {string} name - The name of the player.
     * @param {string} scoreboard - The name of the scoreboard.
     * @returns {Promise<void>}
     */
    static async get(name, scoreboard) {
        try {
            const oB = await world.scoreboard.getObjective(scoreboard);
            if (typeof name == "string")
                return oB.getScore(
                    await   oB.getParticipants().find((pT) => pT.displayName == name)
                );
            if (await oB.getScore(target.scoreboardIdentity) == undefined) {
                return 0;
            } else {
                return await oB.getScore(target.scoreboardIdentity);
            }
        } catch {
            return await true ? 0 : NaN;
        }
    }


    

/**
 * Set the specified amount to the player in the scoreboard
 * @param {string} name - The name of the player.
 * @param {string} scoreboard - The name of the scoreboard.
 * @param {number} amount - The amount to give.
 * @returns {Promise<void>}
 */

static async set(name, scoreboard, amount) {
    const score = await world.scoreboard.getObjective(scoreboard);
    const pl = await score.getParticipants().find(pl => pl.displayName === name);
    await score.setScore(pl, amount);
    return true;
}


/**
 * clear the specified players score in the scoreboard
 * @param {string} name - The name of the player.
 * @param {string} scoreboard - The name of the scoreboard.
 * @returns {Promise<void>}
 */

static async clear(name, scoreboard) {
    const score = await world.scoreboard.getObjective(scoreboard);
    const pl = await score.getParticipants().find(pl => pl.displayName === name);
    await score.removeParticipant(pl);
    return true;
}


/**
 * Add the specified amount to the player in the scoreboard
 * @param {string} name - The name of the player.
 * @param {string} scoreboard - The name of the scoreboard.
 * @param {number} amount - The amount to give.
 * @returns {Promise<void>}
 */

static async add(name, scoreboard, amount) {
    const score = await world.scoreboard.getObjective(scoreboard);
    const pl = await score.getParticipants().find(pl => pl.displayName === name);
    const sc = await this.get(name, scoreboard);
    await score.setScore(pl, sc + amount);
    return true;
}

/**
 * Remove the specified amount to the player in the scoreboard
 * @param {string} name - The name of the player.
 * @param {string} scoreboard - The name of the scoreboard.
 * @param {number} amount - The amount to give.
 * @returns {Promise<void>}
 */

static async remove(name, scoreboard, amount) {
    const score = await world.scoreboard.getObjective(scoreboard);
    const pl = await score.getParticipants().find(pl => pl.displayName === name);
    const sc = await this.get(name, scoreboard);
    await score.setScore(pl, sc - amount);
    return true;
}



}

class ScoreboardClass {
    static player = Player;

    /**
     * Get the over-all balance of the specified score.
     * @param {string} scoreboard - The name of the scoreboard.
     * @returns {Promise<void>}
     */
    static async total (scoreboard) {
        const score = await world.scoreboard.getObjective(scoreboard)
        let sc = 0;
        await score.getScores().forEach(value => sc = sc + value.score);
        return await sc;
     }

    /**
     * Get all the players from the specified score.
     * @param {string} scoreboard - The name of the scoreboard.
     * @returns {Promise<void>}
     */
    static async list (scoreboard) {
        const score = await world.scoreboard.getObjective(scoreboard)
        let sc = [];
        await score.getScores().forEach(val => sc.push({ name: val.participant.displayName, value: val.score.valueOf()}));
        return await sc;
     }
 
    /**
     * Get all data from the specified score.
     * @param {string} scoreboard - The name of the scoreboard.
     * @returns {Promise<void>}
     */
    static async allData (scoreboard) {
        const list = await this.list(scoreboard);
        const total = await this.total(scoreboard);
        return await { total: total, players: list};
    }
/**
 * Transfer a specified amount from one player to another in the specified score.
 * @param {[object, object]} players - An array containing two player objects: the sender and the receiver.
 * @param {string} scoreboard - The name of the scoreboard.
 * @param {number} amount - The amount to transfer from the first player to the second.
 * 
 * @returns {Promise<void>}
 */
static async transfer(players = [player1, player2], scoreboard, amount) {
    const score = world.scoreboard.getObjective(scoreboard);
    let senderScore = await this.player.get(players[0], scoreboard);
    let receiverScore = await this.player.get(players[1], scoreboard);
    const senderParticipant = await score.getParticipants().find(p => p.displayName === players[0]);
    const receiverParticipant = await score.getParticipants().find(p => p.displayName === players[1]);
    if (!senderParticipant || !receiverParticipant) {
        await console.error("One or both players do not exist on the scoreboard.");
        return false;
    }
    if (amount > senderScore || receiverScore + amount > Math.pow(2, 32)) {
        return false;
    }
    try {
        await score.setScore(senderParticipant, senderScore - amount);
        await score.setScore(receiverParticipant, receiverScore + amount);
        return true;
    } catch (err) {
        await console.error(err);
        return false;
    }
}

/**
 * Grab the highest balances of the specified score
 * @param {string} scoreboard - The name of the scoreboard.
 * @param {number} [amount] - The amount of scores you want to receive (optional).
 * 
 * @returns {Promise<Array<{ placement: number, name: string, value: number }>>}
 */
static async leaderboard(scoreboard, amount = 10) {
    const list = await this.list(scoreboard);
    const sortedList = await list.sort((a, b) => b.value - a.value);
    const limitedList = await sortedList.slice(0, amount);
    return await limitedList.map((item, index) => ({
        placement: index + 1,
        name: item.name,
        value: item.value
    }));
}

/**
 * Delete the specified scoreboard from the game
 * @param {string} scoreboard - The name of the scoreboard.
 * @returns {Promise<void>}
 */

static async delete(scoreboard) {
        return await world.scoreboard.removeObjective(scoreboard).valueOf();
    }


/**
 * Clear all the scores of the specified scoreboard
 * @param {string} scoreboard - The name of the scoreboard.
 * @returns {Promise<void>}
 */

static async clear(scoreboard) {
    const score = await world.scoreboard.getObjective(scoreboard);
    
    await score.getParticipants().forEach(async player => {
      await score.removeParticipant(player.displayName);
    })
}

}
const player = {
   add: Player.add,
   remove: Player.remove,
   clear: Player.clear,
   get: Player.get,
   set: Player.set
}

const Scoreboard = {
    total: ScoreboardClass.total,
    list: ScoreboardClass.list,
    allData: ScoreboardClass.allData,
    transfer: ScoreboardClass.transfer,
    leaderboard: ScoreboardClass.leaderboard,
    delete: ScoreboardClass.delete,
    clear: ScoreboardClass.clear,
    player: player
};

export { Scoreboard }
