import { brand } from '../brand/brandConfig'

export const productHunt = {
  postId: null as string | null,
  url: brand.productHuntUrl,
  embedUrl: `${brand.productHuntUrl}?embed=true&utm_source=embed&utm_medium=post_embed`,
} as const
