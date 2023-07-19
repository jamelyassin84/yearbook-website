import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SectionsComponent} from './sections.component'
import {SectionListComponent} from './section-list/section-list.component'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'

@NgModule({
    declarations: [SectionsComponent, SectionListComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: SectionsComponent},
            {path: ':id', component: SectionListComponent},
        ]),
    ],
})
export class SectionsModule {}
