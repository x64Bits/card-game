'use strict'

const Schema = use('Schema')

class CardSchema extends Schema {
  up () {
    this.create('cards', (table) => {
      table.increments()
      table.string('name')
      table.string('tale')
      table.integer('dmg')   
      table.string('collection')   
      table.timestamps()
    })
  }

  down () {
    this.drop('cards')
  }
}

module.exports = CardSchema
