import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

import db from '@adonisjs/lucid/services/db'
import { DatabaseQueryBuilderContract } from '@adonisjs/lucid/types/querybuilder'

/**
 * Options accepted by the existsSimple rule
 */
export type ExistsSimpleOptions = {
  table: string
  column?: string
  filter?: (db: DatabaseQueryBuilderContract, value: string, field: FieldContext) => Promise<void>
}

/**
 * Implementation
 */
async function existsSimple(value: unknown, options: ExistsSimpleOptions, field: FieldContext) {
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

  const columnName = options.column || field.name

  const baseQuery = db.from(options.table).select(columnName).where(columnName, value)

  await options.filter?.(baseQuery, value, field)

  const row = await baseQuery.first()

  if (!row) {
    field.report('The selected {{ field }} is invalid', 'database.unique', field)
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const existsSimpleRule = vine.createRule(existsSimple)
