/**
 * Retrieves the environment variable
 * @param The key of the environment variable
 * @returns The value of the environment variable
 */
export function getEnv(key: string):string {
  return process.env[`VUE_APP_${key}`];
}
