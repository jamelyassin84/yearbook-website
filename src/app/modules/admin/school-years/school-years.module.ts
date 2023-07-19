import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SchoolYearsComponent} from './school-years.component'
import {SchoolYearListComponent} from './school-year-list/school-year-list.component'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'

@NgModule({
    declarations: [SchoolYearsComponent, SchoolYearListComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: SchoolYearsComponent},
            {path: ':id', component: SchoolYearListComponent},
        ]),
    ],
})
export class SchoolYearsModule {}
