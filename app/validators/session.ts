import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string(),
    email: vine.string().email().uniqueSimple({ table: 'users' }),
    password: vine.string().minLength(8).confirmed(),
  })
)
