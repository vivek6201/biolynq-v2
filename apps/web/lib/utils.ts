export const validateUsernameFormat = (val: string) => {
  if (val.length < 3) return false
  const regex = /^[a-z0-9_-]+$/
  return regex.test(val)
}