import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SchoolAdminsComponent} from './school-admins.component'
import {SchoolAdminListComponent} from './school-admin-list/school-admin-list.component'
import {SchoolAdminDetailsComponent} from './school-admin-details/school-admin-details.component'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'

@NgModule({
    declarations: [
        SchoolAdminsComponent,
        SchoolAdminListComponent,
        SchoolAdminDetailsComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: SchoolAdminsComponent},
            {path: ':id', component: SchoolAdminDetailsComponent},
        ]),
    ],
})
export class SchoolAdminsModule {}
