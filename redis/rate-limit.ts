import { isEmpty } from 'ramda';
import redis from 'redis'

const client = await redis.createClient()

const bucketCapacity = 100; // Max tokens in the bucket
const refillRate = 10; // Tokens per minute
const refillInterval = 60 * 1000; // Refill interval in milliseconds (1 minute)

const canProceed = async (userId: string): Promise<boolean> => {
    const hashKey: string = `rate-limit:${userId}`
    const userBucket = await client.hGetAll(hashKey)

    if (isEmpty(userBucket)) {
        await client.hSet(hashKey, {
            tokens: 100,
            lastRefil: Date.now()
        })

        return Promise.resolve(true)
    }

    const { tokens: rawTokens, lastRefil } = userBucket
    const tokens = parseInt(rawTokens)

    if (tokens >= bucketCapacity) return Promise.reject('Too many requests.')

    const elapsed: number = Date.now() - parseInt(lastRefil)
    const newTokens = Math.min(bucketCapacity, tokens + Math.floor(elapsed / refillInterval) * refillRate)

    await client.hSet(hashKey, {
        tokens: newTokens - 1,
        lastRefil: Date.now()
    })

    return Promise.resolve(true)
}

export { canProceed }