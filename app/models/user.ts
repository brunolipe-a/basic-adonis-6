import { withAuthFinder } from '@adonisjs/auth'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { compose } from '@adonisjs/core/helpers'
import encryption from '@adonisjs/core/services/encryption'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

type TwoFactorSecret = {
  uri: string
  secret: string
  qr: string
}

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column({ consume: (value) => Boolean(value) })
  isTwoFactorEnabled: boolean = false

  @column({
    serializeAs: null,
    consume: (value: string) => (value ? JSON.parse(encryption.decrypt(value) ?? '{}') : null),
    prepare: (value: string) => encryption.encrypt(JSON.stringify(value)),
  })
  declare twoFactorSecret: TwoFactorSecret | null

  @column({
    serializeAs: null,
    consume: (value: string) => (value ? JSON.parse(encryption.decrypt(value) ?? '[]') : []),
    prepare: (value: string[]) => encryption.encrypt(JSON.stringify(value)),
  })
  declare twoFactorRecoveryCodes: string[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User, { expiresIn: '7d' })
}
