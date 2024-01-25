import { VineString } from '@vinejs/vine'

import { UniqueSimpleOptions, uniqueSimpleRule } from '#validators/rules/unique_simple'
import { ExistsSimpleOptions, existsSimpleRule } from '#validators/rules/exists_simple'

declare module '@vinejs/vine' {
  interface VineString {
    uniqueSimple(options: UniqueSimpleOptions): this
    existsSimple(options: ExistsSimpleOptions): this
  }
}

VineString.macro('uniqueSimple', function (this: VineString, options: UniqueSimpleOptions) {
  return this.use(uniqueSimpleRule(options))
})

VineString.macro('existsSimple', function (this: VineString, options: UniqueSimpleOptions) {
  return this.use(existsSimpleRule(options))
})
