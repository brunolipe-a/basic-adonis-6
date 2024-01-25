/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import './routes/api.js'
import router from '@adonisjs/core/services/router'

const SessionController = () => import('#controllers/session_controller')

router.get('/', () => ({ server: 'API' }))

router
  .group(() => {
    router.post('login', [SessionController, 'login']).as('login')
    router.post('register', [SessionController, 'register']).as('register')
  })
  .as('v1')
  .prefix('v1')
