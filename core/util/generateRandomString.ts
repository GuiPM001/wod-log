const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateRandomString(size: number) {
  let result = "";

  for (let i = 0; i < size; i++) {
    const indice = Math.floor(Math.random() * characters.length);
    result += characters[indice];
  }

  return result;
}
