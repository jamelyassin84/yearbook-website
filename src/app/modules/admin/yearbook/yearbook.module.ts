import {NgModule} from '@angular/core'
import {YearbookComponent} from './yearbook.component'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'
import {YearbookListComponent} from './yearbook-list/yearbook-list.component'

@NgModule({
    declarations: [YearbookComponent, YearbookListComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([{path: '', component: YearbookComponent}]),
    ],
})
export class YearbookModule {}
