import { users } from '../repository'

export type UserFields = typeof users.$inferSelect

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
  avatar?: string
}

export type TokenRequest = {
  token: string
}

export type PasswordResetRequest = {
  email: string
}
