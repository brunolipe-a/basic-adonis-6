import { VineString } from '@vinejs/vine'

import { UniqueSimpleOptions, uniqueSimpleRule } from '#validators/rules/unique_simple'

declare module '@vinejs/vine' {
  interface VineString {
    uniqueSimple(options: UniqueSimpleOptions): this
  }
}

VineString.macro('uniqueSimple', function (this: VineString, options: UniqueSimpleOptions) {
  return this.use(uniqueSimpleRule(options))
})
