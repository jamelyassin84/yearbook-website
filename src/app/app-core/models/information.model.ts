import {PHPBaseModel, PHPFile} from '@digital_brand_work/models/core.model'
import {InformationTypeEum} from '../enums/information-type.enum'

export interface Information extends PHPBaseModel {
    suffix: string
    barangay: string
    province: string
    last_name: string
    first_name: string
    description: string
    middle_name: string
    municipality: string

    picture: string
    type: InformationTypeEum
}
