const generateConfirmationCode = (): String => {
  const number: Number = Math.floor(100000 + Math.random() * 90000)
  const numberString: String = String(number)
  const cuted: String = numberString.substring(0, 5)

  return cuted
}

export { generateConfirmationCode }