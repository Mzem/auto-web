import { apiGet } from 'api/apiClient'
import { Region } from './regions.service'
import { MerchantListItem } from './merchants.service'
import { CarModel } from './car-model.service'
import { ApiError } from '../httpClient'

export interface CarPostListItem {
  id: string
  source: string
  publishedAt: string
  publishedAtText: string
  region: Region
  merchant: MerchantListItem
  phone: number
  title: string
  image: string
  price: number
  make: string
  model: string
  year: number
  km: number
  fuel: string
  cv: number
  engine: string
  gearbox: string
  exchange: boolean
  leasing: boolean
  firstOwner: boolean
}

export interface CarPost {
  id: string
  source: string
  urlSource: string | undefined
  publishedAt: string
  publishedAtText: string
  region: Region
  merchant: MerchantListItem
  carEngine: CarModel | undefined
  phone: number | undefined
  title: string | undefined
  description: string | undefined
  images: string[]
  price: number | undefined
  make: string | undefined
  model: string | undefined
  body: string | undefined
  year: number | undefined
  km: number | undefined
  fuel: string | undefined
  cv: number | undefined
  engine: string | undefined
  gearbox: string | undefined
  interiorType: string | undefined
  interiorColor: string | undefined
  transmission: string | undefined
  carPlay: boolean | undefined
  bluetooth: boolean | undefined
  camera: boolean | undefined
  sunroof: boolean | undefined
  alarm: boolean | undefined
  acAuto: boolean | undefined
  ledLights: boolean | undefined
  ledInterior: boolean | undefined
  keyless: boolean | undefined
  aluRims: boolean | undefined
  warranty: boolean | undefined
  exchange: boolean | undefined
  leasing: boolean | undefined
  firstOwner: boolean | undefined
}

export async function getCarPosts(
  page: number,
  options: {
    searchText?: string
    isShop?: boolean
    isFirstOwner?: boolean
    isExchange?: boolean
    isLeasing?: boolean
  }
): Promise<CarPostListItem[]> {
  try {
    let url = `car-posts/?page=${page}`
    if (options.searchText) url += `&q=${options.searchText}`
    if (options.isShop) url += '&isShop=true'
    if (options.isFirstOwner) url += '&firstOwner=true'
    if (options.isExchange) url += '&exchange=true'
    if (options.isLeasing) url += '&leasing=true'
    const { content } = await apiGet<CarPostListItem[]>(url)
    return content
  } catch (e) {
    console.error('GET car posts error')
    throw e
  }
}

export async function getCarPost(id: string): Promise<CarPost | undefined> {
  try {
    const { content } = await apiGet<CarPost>(`car-posts/${id}`)
    return content
  } catch (e) {
    if (e instanceof ApiError) return undefined
    console.error('GET car post error')
    throw e
  }
}
