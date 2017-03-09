import redis from "redis"
import bluebird from "bluebird"

bluebird.promisifyAll(redis.RedisClient.prototype)

export default (config) => redis.createClient(config.api.redis.port, config.api.redis.host)
