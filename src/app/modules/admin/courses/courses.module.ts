import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CoursesComponent} from './courses.component'
import {CourseListComponent} from './course-list/course-list.component'
import {CourseDetailsComponent} from './course-details/course-details.component'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'

@NgModule({
    declarations: [
        CoursesComponent,
        CourseListComponent,
        CourseDetailsComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: CoursesComponent},
            {path: ':id', component: CourseDetailsComponent},
        ]),
    ],
})
export class CoursesModule {}
