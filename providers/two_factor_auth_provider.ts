import {
  TwoFactorAuth,
  TwoFactorAuthConfig,
} from '#services/two_factor_auth/two_factor_auth_manager'
import type { ApplicationService } from '@adonisjs/core/types'

/**
 * Extending AdonisJS types
 */
declare module '@adonisjs/core/types' {
  export interface ContainerBindings {
    two_factor_auth: TwoFactorAuth
  }
}

export default class TwoFactorAuthProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.singleton('two_factor_auth', () => {
      const config = this.app.config.get<TwoFactorAuthConfig>('2fa')

      return new TwoFactorAuth(config)
    })
  }
}
