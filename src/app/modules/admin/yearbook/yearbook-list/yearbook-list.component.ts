import {ManageYearbookModal} from 'app/modules/modals/manage-yearbook/manage-yearbook.service'
import {Component, Input} from '@angular/core'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'

@Component({
    selector: 'yearbook-list',
    templateUrl: './yearbook-list.component.html',
    animations: [...dbwAnimations],
})
export class YearbookListComponent {
    constructor(private _manageYearbookModal: ManageYearbookModal) {}

    @Input({required: true})
    schoolYears: SchoolYear[]

    view(schoolYear: SchoolYear) {
        this._manageYearbookModal.schoolYear$.next(schoolYear)
        this._manageYearbookModal.opened$.next(true)
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
