import type { CacheOptions } from 'nitropack'

const runtimeConfig = useRuntimeConfig()

const commonCacheOptions: CacheOptions = {
  group: 'github',
  swr: true,
  maxAge: 60 * 60 * 6, // 6 hours
  staleMaxAge: 60 * 60 * 12 // 12 hours
}

const cacheOptions = (name: string): CacheOptions => ({ ...commonCacheOptions, name })

export const ghFetch = cachedFunction((url: string) => {
  return $fetch(url, {
    baseURL: 'https://api.github.com',
    headers: {
      Authorization: 'token ' + runtimeConfig.GITHUB_TOKEN
    }
  })
}, cacheOptions('api'))

export const ghRepo = cachedFunction((repo: string) => {
  return ghFetch(`/repos/${repo}`)
}, cacheOptions('repo'))