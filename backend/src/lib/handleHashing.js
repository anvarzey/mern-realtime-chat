import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
  const saltRounds = Number(process.env.SALT_ROUNDS) ?? 10

  const hashedPassword = bcrypt.hash(password, saltRounds)
    .then((hash) => hash)
    .catch((err) => err)

  return hashedPassword
}

export const comparePasswords = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword)
    .then((res) => res)
    .catch((err) => err)
}
