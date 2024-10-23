import { env } from 'adex/env'

/**
 * @type {Record<string,import("knex").Knex.ConnectionConfig>}
 */
const proxyConnection = new Proxy(
  {},
  {
    get(p) {
      const dbEnv = env.get('NODE_ENV') === 'production' ? 'dev' : 'data'
      return {
        client: 'better-sqlite3',
        useNullAsDefault: true,
        connection: {
          filename: `./data/${dbEnv}.sqlite3`,
        },
      }
    },
  }
)

export default proxyConnection
