import type { HttpContext } from '@adonisjs/core/http'

import twoFactorAuth from '#services/two_factor_auth/main'
import { verifyOtpValidator } from '#validators/verify_otp'

export default class TwoFactorsController {
  async generate({ auth }: HttpContext) {
    const user = auth.user!

    user.twoFactorSecret = twoFactorAuth.generateSecret(user.email)
    user.isTwoFactorEnabled = false

    await user.save()

    return user.twoFactorSecret
  }

  async disable({ auth, response }: HttpContext) {
    await auth.user!.merge({ isTwoFactorEnabled: false }).save()

    return response.noContent()
  }

  async verify({ auth, request, response }: HttpContext) {
    const { otp } = await request.validateUsing(verifyOtpValidator)

    const user = auth.user!

    if (user.isTwoFactorEnabled) {
      return response.badRequest({ message: 'Usuário já cadastrado com 2FA' })
    }

    const isValid = twoFactorAuth.verifyToken(user.twoFactorSecret?.secret, otp)

    if (!isValid) {
      return response.badRequest({ message: 'OTP inválido' })
    }

    const recoveryCodes = twoFactorAuth.generateRecoveryCodes()

    await user.merge({ isTwoFactorEnabled: true, twoFactorRecoveryCodes: recoveryCodes }).save()

    return { recovery_codes: recoveryCodes }
  }
}
