import {PHPBaseModel} from '@digital_brand_work/models/core.model'
import {Information} from './information.model'
import {SchoolYear} from './school-year.model'

export interface Staff extends PHPBaseModel {
    information_id: string
    information: Information
    school_year_id: string
    school_year: SchoolYear
    title: string
    position: string
}
