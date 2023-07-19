import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {ManageSchoolYearModal} from 'app/modules/modals/manage-school-year/manage-school-year.service'

@Component({
    selector: 'school-year-list',
    templateUrl: './school-year-list.component.html',
    animations: [...dbwAnimations],
})
export class SchoolYearListComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageSchoolYearModal: ManageSchoolYearModal,
    ) {}

    @Input({required: true})
    schoolYears: SchoolYear[]

    edit(schoolYear: SchoolYear): void {
        this._manageSchoolYearModal.schoolYear$.next(schoolYear)
        this._manageSchoolYearModal.opened$.next(true)
    }

    remove(schoolYear: SchoolYear): void {
        const confirmed = confirm(
            `Are you sure you want to remove ${schoolYear.name}`,
        )

        if (confirmed) {
            this._store.dispatch(
                StoreAction.SCHOOL_YEARS.remove.request({id: schoolYear.id}),
            )
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
