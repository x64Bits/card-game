'use strict'

const Schema = use('Schema')

class CardPlayerSchema extends Schema {
  up () {
    this.create('card_players', (table) => {
      table.integer('user_id')
      table.integer('card_id')
      table.integer('level')
      table.integer('exp')
      table.integer('dmg')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('card_players')
  }
}

module.exports = CardPlayerSchema
