import {yearbookReducer} from './../../app-core/store/ngrx/yearbook/yearbook.reducer'
import {StoreModule} from '@ngrx/store'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {alertReducer} from 'app/app-core/store/ngrx/alert/alert.reducer'
import {courseReducer} from 'app/app-core/store/ngrx/courses/courses.reducer'
import {departmentReducer} from 'app/app-core/store/ngrx/departments/departments.reducer'
import {schoolEventReducer} from 'app/app-core/store/ngrx/events/events.reducer'
import {facultyReducer} from 'app/app-core/store/ngrx/faculties/faculties.reducer'
import {schoolAdminReducer} from 'app/app-core/store/ngrx/school-admins/school-admins.reducer'
import {schoolYearReducer} from 'app/app-core/store/ngrx/school-years/school-years.reducer'
import {sectionReducer} from 'app/app-core/store/ngrx/sections/sections.reducer'
import {staffReducer} from 'app/app-core/store/ngrx/staffs/staffs.reducer'
import {studentReducer} from 'app/app-core/store/ngrx/students/students.reducer'

export const appStateModules = [
    StoreModule.forFeature(StateEnum.ALERTS, alertReducer),
    StoreModule.forFeature(StateEnum.COURSES, courseReducer),
    StoreModule.forFeature(StateEnum.DEPARTMENTS, departmentReducer),
    StoreModule.forFeature(StateEnum.EVENTS, schoolEventReducer),
    StoreModule.forFeature(StateEnum.FACULTIES, facultyReducer),
    StoreModule.forFeature(StateEnum.SCHOOL_ADMINS, schoolAdminReducer),
    StoreModule.forFeature(StateEnum.SCHOOL_YEARS, schoolYearReducer),
    StoreModule.forFeature(StateEnum.SECTIONS, sectionReducer),
    StoreModule.forFeature(StateEnum.STAFFS, staffReducer),
    StoreModule.forFeature(StateEnum.STUDENTS, studentReducer),
    StoreModule.forFeature(StateEnum.YEARBOOK, yearbookReducer),
]
