import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

import db from '@adonisjs/lucid/services/db'

/**
 * Options accepted by the uniqueSimple rule
 */
export type UniqueSimpleOptions = {
  table: string
  column?: string
}

/**
 * Implementation
 */
async function uniqueSimple(value: unknown, options: UniqueSimpleOptions, field: FieldContext) {
  /**
   * We do not want to deal with non-string
   * values. The "string" rule will handle the
   * the validation.
   */
  if (typeof value !== 'string') {
    return
  }

  if (typeof field.name !== 'string') {
    return
  }

  const row = await db.from(options.table).select(field.name).where(field.name, value).first()

  if (row) {
    field.report('The {{ field }} has already been taken', 'database.unique', field)
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const uniqueSimpleRule = vine.createRule(uniqueSimple)
