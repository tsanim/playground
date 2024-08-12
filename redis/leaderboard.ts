import { isEmpty } from 'ramda';
import redis from 'redis'

const client = await redis.createClient()

const leaderboardScoresKey = 'leaderboard:scores'
const leaderboardExpireKey = 'leaderboard:expire'

/**
 * leaderboard:scores
 *      player(string) score(number)
 *      player score
 */
const addPlayerScore = async (player: string, score: number): Promise<number | Buffer> => {
    const playerScore: number | null = await client.zScore(leaderboardScoresKey, player)

    if (isEmpty(playerScore)) {
        // add the player for expiration
        await client.zAdd(leaderboardScoresKey, { score: Date.now(), value: player })
        return client.zAdd(leaderboardScoresKey, { score, value: player })
    }

    return client.zIncrBy(leaderboardScoresKey, score, player)
}

const cleanExpired = (players: string[]): Promise<number[]> => Promise.all(
    [
        ...players.map(p => client.zRem(leaderboardScoresKey, p)),
        ...players.map(p => client.zRem(leaderboardExpireKey, p))
    ]
)

const checkExpired = async (): Promise<number[]> => {
    const dayAgo: number = Date.now() - 24 * 60 * 60 * 1000

    const expiredPlayers: string[] = await client.zRangeByScore(leaderboardExpireKey, '-inf', dayAgo)

    return cleanExpired(expiredPlayers)
}

const pagination = async (page: number, size: number): Promise<string[]> => {
    const max = (page - 1) * size
    const min = page * size - 1

    return client.zRange(leaderboardScoresKey, min, max)
}

export {
    addPlayerScore,
    cleanExpired,
    checkExpired,
    pagination
}