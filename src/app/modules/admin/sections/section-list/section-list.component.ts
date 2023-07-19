import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {Section} from 'app/app-core/models/section.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {ManageSectionModal} from 'app/modules/modals/manage-section/manage-section.service'

@Component({
    selector: 'section-list',
    templateUrl: './section-list.component.html',
    animations: [...dbwAnimations],
})
export class SectionListComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageSectionModal: ManageSectionModal,
    ) {}

    @Input({required: true})
    sections: Section[]

    edit(section: Section): void {
        this._manageSectionModal.section$.next(section)
        this._manageSectionModal.opened$.next(true)
    }

    remove(section: Section): void {
        const confirmed = confirm(
            `Are you sure you want to remove ${section.name}`,
        )

        if (confirmed) {
            this._store.dispatch(
                StoreAction.SECTIONS.remove.request({id: section.id}),
            )
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
