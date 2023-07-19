import {Component} from '@angular/core'
import {ManageAdminModal} from './manage-admin/manage-admin.service'
import {ManageCourseModal} from './manage-course/manage-course.service'
import {ManageDepartmentModal} from './manage-department/manage-department.service'
import {ManageSchoolEventModal} from './manage-event/manage-event.service'
import {ManageFacultyModal} from './manage-faculty/manage-faculty.service'
import {ManageSchoolAdminModal} from './manage-school-admin/manage-school-admin.service'
import {ManageSchoolYearModal} from './manage-school-year/manage-school-year.service'
import {ManageSectionModal} from './manage-section/manage-section.service'
import {ManageStaffModal} from './manage-staff/manage-staff.service'
import {ManageStudentModal} from './manage-student/manage-student.service'
import {ManageYearbookModal} from './manage-yearbook/manage-yearbook.service'

@Component({
    selector: 'modals',
    templateUrl: './modals.component.html',
})
export class ModalsComponent {
    constructor(
        private _manageAdminModal: ManageAdminModal,
        private _manageCourseModal: ManageCourseModal,
        private _manageDepartmentModal: ManageDepartmentModal,
        private _manageSchoolEventModal: ManageSchoolEventModal,
        private _manageFacultyModal: ManageFacultyModal,
        private _manageSchoolAdminModal: ManageSchoolAdminModal,
        private _manageSchoolYearModal: ManageSchoolYearModal,
        private _manageSectionModal: ManageSectionModal,
        private _manageStaffModal: ManageStaffModal,
        private _manageStudentModal: ManageStudentModal,
        private _manageYearbookModal: ManageYearbookModal,
    ) {}

    manageAdminModalOpened = this._manageAdminModal.opened$
    manageCourseModalOpened = this._manageCourseModal.opened$
    manageDepartmentModalOpened = this._manageDepartmentModal.opened$
    manageSchoolEventModalOpened = this._manageSchoolEventModal.opened$
    manageFacultyModalOpened = this._manageFacultyModal.opened$
    manageSchoolAdminModalOpened = this._manageSchoolAdminModal.opened$
    manageSchoolYearModalOpened = this._manageSchoolYearModal.opened$
    manageSectionModalOpened = this._manageSectionModal.opened$
    manageStaffModalOpened = this._manageStaffModal.opened$
    manageStudentModalOpened = this._manageStudentModal.opened$
    manageYearbookModalOpened = this._manageYearbookModal.opened$
}
