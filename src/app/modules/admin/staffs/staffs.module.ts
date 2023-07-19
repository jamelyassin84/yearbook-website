import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {StaffsComponent} from './staffs.component'
import {StaffListComponent} from './staff-list/staff-list.component'
import {StaffDetailsComponent} from './staff-details/staff-details.component'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'

@NgModule({
    declarations: [StaffsComponent, StaffListComponent, StaffDetailsComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: StaffsComponent},
            {path: ':id', component: StaffDetailsComponent},
        ]),
    ],
})
export class StaffsModule {}
