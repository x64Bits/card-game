'use strict'

const Card = use('App/Models/Card')
const { validateAll } = use('Validator')
const Helpers = use('Helpers')

class CardController {
  async index () {
    return await Card.all()
  } 

  async create () {
  }

  async store ({ request, response }) {

    const graph_image = request.file('graph_path', {
      types: ['image'],
      size: '10mb'
    })

    await graph_image.move(Helpers.tmpPath('card_graph'), {
      name: `${Date.now()}${graph_image.size}.jpg`
    })

    if(!graph_image.moved()){
      return graph_image.error()
    }
    
    const data = request.only([
      'name', 
      'tale', 
      'dmg', 
      'collection', 
      'graph_path',
    ])

    data.graph_path = graph_image.fileName

    const validation = await validateAll(data, {
      name: 'required',
      dmg: 'required',
      collection: 'required',
      graph_path: 'required'
    })

    if (validation.fails()) {
      return response.send({ 'code': 500, 'msg': validation.messages()} )
    }

    const cardCreated = await Card.create(data)

    return response.send({ 'code': 201, 'msg': 'Carta agregada con exito'})
  }

  async show ({ params, request, response }) {

    const { id } = params

    const card = await Card.find(id)

    return response.send({'code': 200, card})

  }

  async edit () {
  }

  async update ({ params, request, response }) {

    const { id } = params

    const card = await Card.find(id)

    const data = request.only([
      'name',
      'tale',
      'dmg',
      'collection',
      'graph_path'
    ])

    card.merge(data)

    await card.save()

    return response.send({'code': 200, 'msg': 'Carta modificada con exito'})
  }

  async destroy ({ params, request, response }) {

    const { id } = params

    const card = await Card.find(id)

    await card.delete()

    return response.send({'code': 200, 'msg': 'La carta ha sido eliminada con exito'})
    
  }
}

module.exports = CardController
