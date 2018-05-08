'use strict'

const Schema = use('Schema')

class CardSchema extends Schema {
  up () {
    this.create('cards', (table) => {
      table.string('name')
      table.string('tale')
      table.integer('dmg')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('cards')
  }
}

module.exports = CardSchema
