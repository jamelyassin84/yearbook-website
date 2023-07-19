import {PHPBaseModel} from '@digital_brand_work/models/core.model'
import {Course} from './course.model'
import {SchoolYear} from './school-year.model'

export interface Department extends PHPBaseModel {
    name: string
    courses: Course[]
    school_year: SchoolYear
}
