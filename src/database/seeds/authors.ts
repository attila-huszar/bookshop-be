import { getTableName } from 'drizzle-orm'
import { db } from '../../db'
import { authors } from '../../repository'
import authorsData from './authors.json'

export async function seedAuthors() {
  const seedValues: (typeof authors.$inferInsert)[] = authorsData.map(
    (author) => ({
      id: author.id,
      name: author.name,
      fullName: author.fullName,
      birthYear: author.birthYear,
      deathYear: author.deathYear,
      homeland: author.homeland,
      biography: author.biography,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
  )

  await db.insert(authors).values(seedValues)

  return {
    [getTableName(authors)]: seedValues.length,
  }
}
