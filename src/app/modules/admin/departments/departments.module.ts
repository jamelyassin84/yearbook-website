import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DepartmentsComponent} from './departments.component'
import {DepartmentListComponent} from './department-list/department-list.component'
import {DepartmentDetailsComponent} from './department-details/department-details.component'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'

@NgModule({
    declarations: [
        DepartmentsComponent,
        DepartmentListComponent,
        DepartmentDetailsComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: DepartmentsComponent},
            {path: '', component: DepartmentDetailsComponent},
        ]),
    ],
})
export class DepartmentsModule {}
