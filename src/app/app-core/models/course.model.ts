import {PHPBaseModel} from '@digital_brand_work/models/core.model'
import {Department} from './department.model'
import {Section} from './section.model'
import {SchoolYear} from './school-year.model'

export interface Course extends PHPBaseModel {
    name: string
    department: Department
    sections: Section[]
    school_year: SchoolYear
}
