import {LoadingStateEnum} from '@digital_brand_work/enums/loading-state.enum'
import {LoadingTypeEnum} from '@digital_brand_work/enums/loading-type.enum'

export interface PHPBaseModel {
    id?: string
    created_at?: string
    updated_at?: string
}

export interface NodeBaseModel {
    id?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface PHPFile extends PHPBaseModel {
    name: string
    path: string
    url: string
    extension: string
    mime_type: string
    size: number
}

export interface NestFile extends NodeBaseModel {
    authId: string
    authType: string
    url: string
    type: string
}

export type Time = `${string}:${string}`

export type BreakPoint = 'phone' | 'tablet' | 'laptop' | 'desktop' | 'max'

export interface CountryWithCity {
    [key: string]: string[]
}
export interface DialCode {
    name: string
    dial_code: string
    code: string
}

export interface CountryISO {
    name: string
    'alpha-2': string
    'alpha-3': string
    'country-code': string
    'iso_3166-2': string
    region: string
    'sub-region': string
    'intermediate-region': string
    'region-code': string
    'sub-region-code': string
    'intermediate-region-code': string
}

export interface GoogleMapStyle {
    featureType: string
    elementType: string
    stylers: {[key: string]: string | number}[]
}
export interface LaravelResponse<T> {
    data: {data: T}
}

export interface Coordinates {
    latitude: number
    longitude: number
}

export interface Entity<T> {
    entities: [string: T]
    ids: string[]
}

export interface NodeResponse<T> {
    data: T
    meta: NodePaginationMeta
}
export interface NodePaginationMeta {
    total: number
    per_page: number
    current_page: number
    last_page: number
    first_page: number
    first_page_url: string
    last_page_url: string
    next_page_url: null
    previous_page_url: null
}

export type NodeFile =
    | File
    | {
          url: string
      }

export interface Alert {
    id?: string
    title: string
    message: string
    type: 'success' | 'info' | 'error'
}

export interface PHPUnPaginatedResponse<T> {
    data: T
}

export interface PHPPaginatedResponse<T> {
    data: T[]
    links: {
        first: string
        last: string
        next: string | null
        prev: string | null
    }
    meta: {
        current_page: number
        from: number
        last_page: number
        path: string
        per_page: number
        to: number
        total: number
        links: {
            active: boolean
            label: string
            url: null | string
        }[]
    }
}

export interface LoadingState {
    state: LoadingStateEnum
    type: LoadingTypeEnum
}

export interface StoreLoaders {
    createLoader: LoadingStateEnum
    updateLoader: LoadingStateEnum
    getLoader: LoadingStateEnum
    findOneLoader: LoadingStateEnum
    removeLoader: LoadingStateEnum
}

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
}

export interface PaginationLink {
    url: string | null
    label: string
    active: boolean
}
