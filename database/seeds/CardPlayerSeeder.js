'use strict'

/*
|--------------------------------------------------------------------------
| CardPlayerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Database = use('Database')
const Factory = use('Factory')

class CardPlayerSeeder {
  async run () {
    const newCards = await Factory
      .model('App/Models/Card')
      .createMany(5)
  }
}

module.exports = CardPlayerSeeder
