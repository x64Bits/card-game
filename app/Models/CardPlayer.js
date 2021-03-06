'use strict'

const Model = use('Model')

class CardPlayer extends Model {
	user () {
		return this.belongsTo('App/Models/User', 'id', 'user_id')
	}
}

module.exports = CardPlayer
