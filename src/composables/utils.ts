/**
 * 生成 uuid
 * https://developer.mozilla.org/en-US/docs/Web/API/crypto_property
 */
export const uuid = (): string => {
	return crypto.randomUUID()
}