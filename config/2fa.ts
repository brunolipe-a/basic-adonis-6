import env from '#start/env'

import { TwoFactorAuthConfig } from '#services/two_factor_auth/two_factor_auth_manager'

const twoFactorAuthConfig: TwoFactorAuthConfig = {
  issuer: env.get('APP_ISSUER', 'Adonis'),
}

export default twoFactorAuthConfig
