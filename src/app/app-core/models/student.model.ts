import {PHPBaseModel} from '@digital_brand_work/models/core.model'
import {Department} from './department.model'
import {SchoolYear} from './school-year.model'
import {Information} from './information.model'
import {Course} from './course.model'
import {Section} from './section.model'

export interface Student extends PHPBaseModel {
    course_id: string
    department_id: string
    information_id: string
    school_year_id: string
    section_id: string

    course: Course
    section: Section
    department: Department
    school_year: SchoolYear
    information: Information
}
