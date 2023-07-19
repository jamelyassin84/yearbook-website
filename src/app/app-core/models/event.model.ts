import {PHPBaseModel} from '@digital_brand_work/models/core.model'
import {SchoolYear} from './school-year.model'

export interface SchoolEvent extends PHPBaseModel {
    name: string
    date: string
    description: string
    school_year_id: string
    school_year: SchoolYear
}
