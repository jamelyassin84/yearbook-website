import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {EventsComponent} from './events.component'
import {EventListComponent} from './event-list/event-list.component'
import {EventDetailsComponent} from './event-details/event-details.component'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'

@NgModule({
    declarations: [EventsComponent, EventListComponent, EventDetailsComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: EventsComponent},
            {path: ':id', component: EventDetailsComponent},
        ]),
    ],
})
export class EventsModule {}
