import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AdminsComponent} from './admins.component'
import {AdminListComponent} from './admin-list/admin-list.component'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'

@NgModule({
    declarations: [AdminsComponent, AdminListComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([{path: '', component: AdminsComponent}]),
    ],
})
export class AdminsModule {}
