import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FacultiesComponent} from './faculties.component'
import {FacultyListComponent} from './faculty-list/faculty-list.component'
import {FacultyDetailsComponent} from './faculty-details/faculty-details.component'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'

@NgModule({
    declarations: [
        FacultiesComponent,
        FacultyListComponent,
        FacultyDetailsComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: FacultiesComponent},
            {path: ':id', component: FacultyDetailsComponent},
        ]),
    ],
})
export class FacultiesModule {}
