import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {StudentsComponent} from './students.component'
import {StudentListComponent} from './student-list/student-list.component'
import {StudentDetailsComponent} from './student-details/student-details.component'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'

@NgModule({
    declarations: [
        StudentsComponent,
        StudentListComponent,
        StudentDetailsComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: StudentsComponent},
            {path: ':id', component: StudentDetailsComponent},
        ]),
    ],
})
export class StudentsModule {}
