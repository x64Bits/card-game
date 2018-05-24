'use strict'

const User = use('App/Models/User')

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

    await User.create(data)

    return response.send({ 'code': 200, 'msg': 'Usuario Registrado con exito' })
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

  async destroy () {
  }
}

module.exports = UserController
