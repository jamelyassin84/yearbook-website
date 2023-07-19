import {PHPBaseModel} from '@digital_brand_work/models/core.model'
import {Department} from './department.model'
import {SchoolYear} from './school-year.model'
import {Information} from './information.model'

export interface Faculty extends PHPBaseModel {
    information_id: string
    school_year_id: string
    department_id: string
    department: Department
    school_year: SchoolYear
    information: Information
    title: string
    position: string
}
