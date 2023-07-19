import {EffectsModule} from '@ngrx/effects'
import {AdminEffects} from 'app/app-core/store/ngrx/admins/admins.effects'
import {CourseEffects} from 'app/app-core/store/ngrx/courses/courses.effects'
import {DepartmentEffects} from 'app/app-core/store/ngrx/departments/departments.effects'
import {SchoolEventEffects} from 'app/app-core/store/ngrx/events/events.effects'
import {FacultyEffects} from 'app/app-core/store/ngrx/faculties/faculties.effects'
import {SchoolAdminEffects} from 'app/app-core/store/ngrx/school-admins/school-admins.effects'
import {SchoolYearEffects} from 'app/app-core/store/ngrx/school-years/school-years.effects'
import {SectionEffects} from 'app/app-core/store/ngrx/sections/sections.effects'
import {StaffEffects} from 'app/app-core/store/ngrx/staffs/staffs.effects'
import {StudentEffects} from 'app/app-core/store/ngrx/students/students.effects'
import {YearbookEffects} from 'app/app-core/store/ngrx/yearbook/yearbook.effects'

export const AppEffects = [
    EffectsModule.forFeature([
        AdminEffects,
        CourseEffects,
        DepartmentEffects,
        SchoolEventEffects,
        FacultyEffects,
        SchoolAdminEffects,
        SchoolYearEffects,
        SectionEffects,
        StaffEffects,
        StudentEffects,
        YearbookEffects,
    ]),
]
