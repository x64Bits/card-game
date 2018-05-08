'use strict'

const Schema = use('Schema')

class MarketSchema extends Schema {
  up () {
    this.create('markets', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('markets')
  }
}

module.exports = MarketSchema
