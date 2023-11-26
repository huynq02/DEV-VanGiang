export { default as withAuth } from './withAuth'
export { default as redirectIfAuthenticated } from './redirectIfAuthenticated'
export { serializeCookie } from './cookie'
export const fetcher = (url: string) => fetch(url).then((res) => res.json())