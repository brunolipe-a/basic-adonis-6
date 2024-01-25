import router from '@adonisjs/core/services/router'

const TwoFactorsController = () => import('#controllers/two_factors_controller')

export function twoFactorAuthRoutes() {
  router
    .group(() => {
      router.post('generate', [TwoFactorsController, 'generate']).as('generate')
      router.post('verify', [TwoFactorsController, 'verify']).as('verify')
      router.post('disable', [TwoFactorsController, 'disable']).as('disable')
    })
    .as('2fa')
    .prefix('2fa')
}
