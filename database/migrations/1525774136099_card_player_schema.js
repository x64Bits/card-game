'use strict'

const Schema = use('Schema')

class CardPlayerSchema extends Schema {
  up () {
    this.create('card_players', (table) => {
      table.increments()
      table.integer('user_id')
      table.integer('card_id')
      table.integer('level').default(1)
      table.integer('exp').default(1)
      table.integer('dmg')
      table.timestamps()
    })
  }

  down () {
    this.drop('card_players')
  }
}

module.exports = CardPlayerSchema
