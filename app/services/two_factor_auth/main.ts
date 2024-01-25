import app from '@adonisjs/core/services/app'

const twoFactorAuth = await app.container.make('two_factor_auth')
export { twoFactorAuth as default }
