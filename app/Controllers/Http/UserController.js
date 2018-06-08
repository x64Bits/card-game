'use strict'

const User = use('App/Models/User')
const Card = use('App/Models/Card')
const CardPlayer = use('App/Models/CardPlayer')
const { validateAll } = use('Validator')
const Hash = use('Hash')

class UserController {
  async index () {
  }

  async create () {
  }

  async store ({ request, response }) {
    const data = request.only([
      'username',
      'email',
      'password' 
     ])

    const validation = await validateAll(data, {
      username: 'required|unique:users',
      email: 'required|unique:users'
    })

    if (validation.fails()) {
      return response.send({ 'code': 500, 'msg': 'Error al crear usuario'} )
    }

    const userCreated = await User.create(data)

    await this.firstCards( userCreated )

    return response.send({ 'code': 200, 'msg': 'Usuario Registrado con exito', userCreated })
  }

  async show ({ params, request, response }) {

    const user = await User.findOrFail(params.id)

    return response.send({'code': 200, user })

  }

  async edit () {
  }

  async update () {
    //
  }

  async changePassword ({ params, request, response }) {

    const safePassword = await Hash.make(request.input('password'))

    const validation = await validateAll(safePassword, {
        safePassword: 'required'
    })

    if(validation.fails()){
        return response.send(validation.messages())
    }

    const user = await User.findOrFail(params.id)
    user.password = safePassword
    await user.save()

    return response.send({"code": 200, "msg": "Contraseña cambiada con exito"})
  }

  async destroy ({ params, request, response }) {

    const { id } = params

    const user = await User.find(id)

    await user
      .cards()
      .where('user_id', '=', user.id)
      .delete()

    await user.delete()

    return response.send({'code': 200, 'msg': 'Usuario eliminado con exito'})

  }

  async firstCards ( userCreated ) {

    const startingCards = await Card
      .query()
      .where('collection', '=', 'starting')
      .get()

    for( let startingCard of startingCards ) {
      var card = new CardPlayer()
      card.user_id = userCreated.id
      card.card_id = startingCard.id
      card.dmg = startingCard.dmg
      
      await card.save()
    }

  }
}

module.exports = UserController
