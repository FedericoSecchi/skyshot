// Shared utility for asset paths
const BASE_URL = import.meta.env.BASE_URL

export const assetPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${BASE_URL}${cleanPath}`
}

