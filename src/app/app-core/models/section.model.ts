import {PHPBaseModel} from '@digital_brand_work/models/core.model'
import {Course} from './course.model'
import {Department} from './department.model'
import {SchoolYear} from './school-year.model'

export interface Section extends PHPBaseModel {
    name: string
    course: Course
    department: Department
    school_year: SchoolYear
}
