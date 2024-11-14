import { getTableName } from 'drizzle-orm'
import { db } from '../../db'
import { books } from '../../repository'
import booksData from './books.json'

export async function seedBooks() {
  const seedValues: (typeof books.$inferInsert)[] = booksData.map((book) => {
    const discountPrice = book.discount
      ? book.price - (book.price * book.discount) / 100
      : book.price

    return {
      id: book.id,
      title: book.title,
      authorId: book.author,
      genre: book.genre,
      imgUrl: book.imgUrl,
      description: book.description,
      publishYear: book.publishYear,
      rating: book.rating,
      price: book.price,
      discount: book.discount,
      discountPrice,
      topSellers: book.topSellers ?? false,
      newRelease: book.newRelease ?? false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  })

  await db.insert(books).values(seedValues)

  return {
    [getTableName(books)]: seedValues.length,
  }
}
