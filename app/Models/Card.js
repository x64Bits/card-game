'use strict'

const Model = use('Model')

class Card extends Model {
	playerCard () {
		return this.hasOne('App/Models/CardPlayer')
	}
}

module.exports = Card
