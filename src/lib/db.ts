import type { Knex } from 'knex'
import knex from 'knex'
import configs from '../../knexfile.js'
import { env } from 'adex/env'

const config = configs[env.get('NODE_ENV', 'development')]

export const db = createConnectionManager()(config)

function createConnectionManager() {
  let connection: Knex
  return function connectionManager(config: Knex.ConnectionConfig) {
    return connection ?? (connection = knex(config))
  }
}
