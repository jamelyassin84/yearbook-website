import {ModalHeaderComponent} from 'app/components/headers/modal-header/modal-header.component'
import {ManageAdminComponent} from 'app/modules/modals/manage-admin/manage-admin.component'
import {ManageCourseComponent} from 'app/modules/modals/manage-course/manage-course.component'
import {ManageDepartmentComponent} from 'app/modules/modals/manage-department/manage-department.component'
import {ManageEventComponent} from 'app/modules/modals/manage-event/manage-event.component'
import {ManageFacultyComponent} from 'app/modules/modals/manage-faculty/manage-faculty.component'
import {ManageSchoolAdminComponent} from 'app/modules/modals/manage-school-admin/manage-school-admin.component'
import {ManageSchoolYearComponent} from 'app/modules/modals/manage-school-year/manage-school-year.component'
import {ManageSectionComponent} from 'app/modules/modals/manage-section/manage-section.component'
import {ManageStaffComponent} from 'app/modules/modals/manage-staff/manage-staff.component'
import {ManageStudentComponent} from 'app/modules/modals/manage-student/manage-student.component'
import {BondPaperComponent} from 'app/modules/modals/manage-yearbook/components/bond-paper/bond-paper.component'
import {EntitiesWithTitleAndPositionComponent} from 'app/modules/modals/manage-yearbook/components/entities-with-title-and-position/entities-with-title-and-position.component'
import {PageLinksComponent} from 'app/modules/modals/manage-yearbook/components/page-links/page-links.component'
import {ReverseButtonComponent} from 'app/modules/modals/manage-yearbook/components/reverse-button/reverse-button.component'
import {SchoolYearComponent} from 'app/modules/modals/manage-yearbook/components/school-year/school-year.component'
import {ManageYearbookFacultyComponent} from 'app/modules/modals/manage-yearbook/manage-yearbook-faculty/manage-yearbook-faculty.component'
import {ManageYearbookSchoolAdminComponent} from 'app/modules/modals/manage-yearbook/manage-yearbook-school-admin/manage-yearbook-school-admin.component'
import {ManageYearbookStaffComponent} from 'app/modules/modals/manage-yearbook/manage-yearbook-staff/manage-yearbook-staff.component'
import {ManageYearbookStudentComponent} from 'app/modules/modals/manage-yearbook/manage-yearbook-student/manage-yearbook-student.component'
import {ManageYearbookComponent} from 'app/modules/modals/manage-yearbook/manage-yearbook.component'
import {ModalsComponent} from 'app/modules/modals/modals.component'

export const modalComponents = [
    ModalHeaderComponent,
    ManageDepartmentComponent,
    ManageEventComponent,
    ManageFacultyComponent,
    ManageSchoolAdminComponent,
    ManageSchoolYearComponent,
    ManageSectionComponent,
    ManageStaffComponent,
    ManageCourseComponent,
    ManageStudentComponent,
    ManageAdminComponent,
    ManageYearbookComponent,
    ModalsComponent,

    ManageYearbookStudentComponent,
    ManageYearbookFacultyComponent,
    ManageYearbookSchoolAdminComponent,
    ManageYearbookStaffComponent,

    EntitiesWithTitleAndPositionComponent,
    PageLinksComponent,
    ReverseButtonComponent,
    BondPaperComponent,
    SchoolYearComponent,
]
