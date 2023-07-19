import {PHPBaseModel} from '@digital_brand_work/models/core.model'

export interface Admin extends PHPBaseModel {
    name: string
    email: string
    password: string
}
