import {AdminState} from '../ngrx/admins/admins.reducer'
import {AlertState} from '../ngrx/alert/alert.reducer'
import {CourseState} from '../ngrx/courses/courses.reducer'
import {DepartmentState} from '../ngrx/departments/departments.reducer'
import {FacultyState} from '../ngrx/faculties/faculties.reducer'
import {SchoolEventState} from '../ngrx/events/events.reducer'
import {SchoolAdminState} from '../ngrx/school-admins/school-admins.reducer'
import {SchoolYearState} from '../ngrx/school-years/school-years.reducer'
import {SectionState} from '../ngrx/sections/sections.reducer'
import {StaffState} from '../ngrx/staffs/staffs.reducer'
import {StudentState} from '../ngrx/students/students.reducer'
import {YearbookState} from '../ngrx/yearbook/yearbook.reducer'
import {UserState} from '../ngrx/auth/auth.reducer'

export interface AppState {
    alerts: AlertState
    admins: AdminState
    courses: CourseState
    departments: DepartmentState
    schoolEvents: SchoolEventState
    faculties: FacultyState
    schoolAdmins: SchoolAdminState
    schoolYears: SchoolYearState
    sections: SectionState
    staffs: StaffState
    students: StudentState
    yearbook: YearbookState
    user: UserState
}
