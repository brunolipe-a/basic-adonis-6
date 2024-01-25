import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/session'

export default class SessionController {
  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    return token
  }

  async register({ request, response }: HttpContext) {
    const { fullName, email, password } = await request.validateUsing(registerValidator)

    const user = await User.create({ fullName, email, password })

    return response.created(user)
  }

  async me({ auth }: HttpContext) {
    return auth.user!
  }
}
