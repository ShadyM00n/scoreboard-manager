import { world } from "@minecraft/server"

interface ScoreItem {
    name: string;
    value: number;
};

class Player {


    static async get(name: string, scoreboard: string) {
        try {
            const oB = await world.scoreboard.getObjective(scoreboard);
            if (typeof name == "string")
                return oB.getScore(
                    await oB.getParticipants().find((pT) => pT.displayName == name)
                );
            if (await oB.getScore(name) == undefined) {
                return 0;
            } else {
                return await oB.getScore(name);
            }
        } catch {
            return await true ? 0 : NaN;
        }
    }


    



static async set(name: string, scoreboard, amount) {
    const score = await world.scoreboard.getObjective(scoreboard);
    const pl = await score.getParticipants().find(pl => pl.displayName === name);
    await score.setScore(pl, amount);
    return true;
}




static async clear(name: string, scoreboard) {
    const score = await world.scoreboard.getObjective(scoreboard);
    const pl = await score.getParticipants().find(pl => pl.displayName === name);
    await score.removeParticipant(pl);
    return true;
}




static async add(name: string, scoreboard: string, amount: number) {
    const score = await world.scoreboard.getObjective(scoreboard);
    const pl = await score.getParticipants().find(pl => pl.displayName === name);
    const sc = await this.get(name, scoreboard);
    await score.setScore(pl, sc + amount);
    return true;
}



static async remove(name: string, scoreboard: string, amount: number) {
    const score = await world.scoreboard.getObjective(scoreboard);
    const pl = await score.getParticipants().find(pl => pl.displayName === name);
    const sc = await this.get(name, scoreboard);
    await score.setScore(pl, sc - amount);
    return true;
}



}

class ScoreboardClass {
    static player = Player;


    static async total (scoreboard: string) {
        const score = await world.scoreboard.getObjective(scoreboard)
        let sc = 0;
        await score.getScores().forEach(value => sc = sc + value.score);
        return await sc;
     }


    static async list (scoreboard: string): Promise<ScoreItem[]> {
        const score = await world.scoreboard.getObjective(scoreboard)
        let sc = [] as ScoreItem[];
        await score.getScores().forEach(val => sc.push({ name: val.participant.displayName, value: val.score.valueOf()}));
        return await sc;
     }

    static async allData (scoreboard: string): Promise<object> {
        const list = await this.list(scoreboard);
        const total = await this.total(scoreboard);
        return await { total: total, players: list};
    }

static async transfer(players: [string, string], scoreboard: string, amount: number) {
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


    static async leaderboard(scoreboard: string, amount: number = 10): Promise<Array<{ placement: number, name: string, value: number }>> {
        const list: ScoreItem[] = await this.list(scoreboard);
        const sortedList = list.sort((a, b) => b.value - a.value);
        const limitedList = sortedList.slice(0, amount);
        return limitedList.map((item, index) => ({
            placement: index + 1,
            name: item.name,
            value: item.value
        }));
    }



static async delete(scoreboard: string) {
        return await world.scoreboard.removeObjective(scoreboard).valueOf();
    }




static async clear(scoreboard: string) {
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
