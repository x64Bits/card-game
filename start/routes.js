'use strict'

const Route = use('Route')

Route.get('/', () => {
    return 'Bienvenido a la raiz del sitio.'
} )

Route
    .group( () => {
        Route.resource('/', 'UserController')
        Route.post('change-password/:id', 'UserController.changePassword')
            .as('/.change-password')       
    })
    .prefix('user')

Route 
    .group( () => {
        Route.resource('/', 'CardController')
    })
    .prefix('card')