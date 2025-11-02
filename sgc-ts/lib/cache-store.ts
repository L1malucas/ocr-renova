import { create } from "zustand"
import { persist } from "zustand/middleware"

// Simples ofuscação para o local storage
const secretKey = "cpg-caduceu-client-secret-key" // Em um app real, isso deveria ser mais seguro e não hardcoded

const encode = (str: string): string => {
  try {
    // Primeiro, codifica a string para Base64 para garantir que ela não contenha caracteres que possam ser corrompidos
    const base64Encoded = btoa(unescape(encodeURIComponent(str)))
    // Em seguida, aplica a ofuscação XOR
    return base64Encoded
      .split("")
      .map((char, i) =>
        String.fromCharCode(
          char.charCodeAt(0) ^ secretKey.charCodeAt(i % secretKey.length)
        )
      )
      .join("")
  } catch (e) {
    console.error("Encoding failed:", e)
    return ""
  }
}

const decode = (encoded: string): string => {
  try {
    // Primeiro, reverte a ofuscação XOR
    const xorDecoded = encoded
      .split("")
      .map((char, i) =>
        String.fromCharCode(
          char.charCodeAt(0) ^ secretKey.charCodeAt(i % secretKey.length)
        )
      )
      .join("")
    // Em seguida, decodifica a string Base64
    return decodeURIComponent(escape(atob(xorDecoded)))
  } catch (e) {
    console.error("Decoding failed:", e)
    return ""
  }
}

interface CacheState {
  cache: Record<string, string>
  setItem: (key: string, value: any) => void
  getItem: <T>(key: string) => T | null
  removeItem: (key: string) => void
  clear: () => void
}

export const useCacheStore = create<CacheState>()(
  persist(
    (set, get) => ({
      cache: {},
      setItem: (key, value) => {
        const encodedKey = encode(key)
        const encodedValue = encode(JSON.stringify(value))
        set(state => ({
          cache: {
            ...state.cache,
            [encodedKey]: encodedValue,
          },
        }))
      },
      getItem: <T>(key: string): T | null => {
        const encodedKey = encode(key)
        const state = get()
        if (
          !state.cache ||
          typeof state.cache !== "object" ||
          !state.cache[encodedKey]
        ) {
          return null
        }
        const encodedValue = state.cache[encodedKey]
        if (!encodedValue) {
          return null
        }
        try {
          const decodedValue = decode(encodedValue)
          return JSON.parse(decodedValue) as T
        } catch (error) {
          console.error("Error parsing cached JSON:", error)
          // Se a decodificação falhar, remova o item inválido do cache
          get().removeItem(key)
          return null
        }
      },
      removeItem: key => {
        const encodedKey = encode(key)
        set(state => {
          const newCache = { ...state.cache }
          delete newCache[encodedKey]
          return { cache: newCache }
        })
      },
      clear: () => set({ cache: {} }),
    }),
    {
      name: "cpg-caduceu-cache", // Nome do item no storage (deve ser único)
      storage: {
        getItem: name => {
          const str = localStorage.getItem(name)
          if (!str) return null
          const { state } = JSON.parse(str)
          return {
            state: {
              ...state,
              cache: Object.entries(state.cache).reduce(
                (acc, [key, value]) => {
                  try {
                    // Apenas para garantir que a chave e o valor são strings
                    if (typeof key === "string" && typeof value === "string") {
                      acc[key] = value
                    }
                  } catch (e) {
                    console.error("Error migrating cache:", e)
                  }
                  return acc
                },
                {} as Record<string, string>
              ),
            },
          }
        },
        setItem: (name, newValue) => {
          localStorage.setItem(name, JSON.stringify(newValue))
        },
        removeItem: name => localStorage.removeItem(name),
      },
    }
  )
)
