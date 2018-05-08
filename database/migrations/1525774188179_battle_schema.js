'use strict'

const Schema = use('Schema')

class BattleSchema extends Schema {
  up () {
    this.create('battles', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('battles')
  }
}

module.exports = BattleSchema
