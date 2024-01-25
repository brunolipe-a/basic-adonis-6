import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const SessionController = () => import('#controllers/session_controller')

router
  .group(() => {
    router.get('me', [SessionController, 'me']).as('me')
  })
  .as('v1')
  .prefix('v1')
  .use(middleware.auth())
