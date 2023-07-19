import {PHPBaseModel} from '@digital_brand_work/models/core.model'
import {SchoolYear} from './school-year.model'
import {Student} from './student.model'
import {Faculty} from './faculty.model'
import {Staff} from './staff.model'
import {SchoolAdmin} from './school-admin.model'
import {SchoolEvent} from './event.model'

export interface Yearbook extends PHPBaseModel {
    school_year_id: string

    staffs: Staff[]
    students: Student[]
    faculties: Faculty[]
    schoolYear: SchoolYear[]
    schoolAdmins: SchoolAdmin[]
    schoolEvents: SchoolEvent[]
}
