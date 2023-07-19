import {PHPBaseModel} from '@digital_brand_work/models/core.model'

export interface User extends PHPBaseModel {
    name: string
    email: string
    password: string
    access: {
        token: string
        expiry: string
    }
}
