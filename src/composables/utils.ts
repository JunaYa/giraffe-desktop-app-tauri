import { v4 as uuidv4 } from 'uuid'
/**
 * 生成 uuid
 * https://developer.mozilla.org/en-US/docs/Web/API/crypto_property
 */
export const uuid = (): string => {
  return (crypto && crypto.randomUUID) ? crypto.randomUUID() : uuidv4()
}
