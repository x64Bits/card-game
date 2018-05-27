'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

 const Factory = use('Factory')


  Factory.blueprint('App/Models/Card', (faker) => {
    return {
      name: faker.name(),
      tale: faker.sentence(),
      dmg: faker.integer({ min: 3, max: 13 }),
      collection: 'starting'
    }
  })
