export default function createAvatar(name) {
  const AVATAR_URL = process.env.AVATAR_URL

  const colors = [
    'b6e3f4',
    'c0aede',
    'd1d4f9',
    'ffd5dc',
    'ffdfbf'
  ]

  const bgColor = colors[Math.floor(Math.random() * ((colors.length + 1) - 1))]

  // -------- PICK RANDOM COLOR AND INSERT IT INTO AVATAR --------

  const avatar = `${AVATAR_URL}/svg?seed=${name}&backgroundColor=${bgColor}`

  return avatar
}
