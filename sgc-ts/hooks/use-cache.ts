import { useCacheStore } from "@/lib/cache-store"

export const useCache = () => {
  const {
    setItem: setCacheItem,
    getItem: getCacheItem,
    removeItem: removeCacheItem,
    clear: clearCache,
  } = useCacheStore()

  return {
    setCacheItem,
    getCacheItem,
    removeCacheItem,
    clearCache,
  }
}
