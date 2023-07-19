import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {SchoolEvent} from 'app/app-core/models/event.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {ManageSchoolEventModal} from 'app/modules/modals/manage-event/manage-event.service'

@Component({
    selector: 'event-list',
    templateUrl: './event-list.component.html',
    animations: [...dbwAnimations],
})
export class EventListComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageSchoolEventModal: ManageSchoolEventModal,
    ) {}

    @Input({required: true})
    schoolEvents: SchoolEvent[]

    edit(schoolEvent: SchoolEvent): void {
        this._manageSchoolEventModal.schoolEvent$.next(schoolEvent)
        this._manageSchoolEventModal.opened$.next(true)
    }

    remove(schoolEvent: SchoolEvent): void {
        const confirmed = confirm(
            `Are you sure you want to remove ${schoolEvent.name}`,
        )

        if (confirmed) {
            this._store.dispatch(
                StoreAction.EVENTS.remove.request({id: schoolEvent.id}),
            )
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
