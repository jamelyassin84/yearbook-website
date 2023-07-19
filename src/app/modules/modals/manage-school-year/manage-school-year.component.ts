import {Component, HostListener} from '@angular/core'
import {Store} from '@ngrx/store'
import {AppState} from 'app/app-core/store/core/app.state'
import {map, take} from 'rxjs'
import {ManageSchoolYearModal} from './manage-school-year.service'
import {SchoolYearForm} from 'app/app-core/store/ngrx/school-years/school-years.form'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {schoolYearLoaders} from 'app/app-core/store/ngrx/school-years/school-years.selectors'

@Component({
    selector: 'manage-school-year',
    templateUrl: './manage-school-year.component.html',
    animations: [...dbwAnimations],
})
export class ManageSchoolYearComponent {
    constructor(
        private _store: Store<AppState>,
        private _schoolYearForm: SchoolYearForm,
        private _manageSchoolYearModal: ManageSchoolYearModal,
    ) {}

    @HostListener('document:keydown.escape')
    onEscapePress() {
        this.opened$.next(false)
    }

    readonly opened$ = this._manageSchoolYearModal.opened$

    readonly schoolYear$ = this._manageSchoolYearModal.schoolYear$

    readonly loader$ = this._store
        .select(schoolYearLoaders)
        .pipe(map((loader) => loader.createLoader))

    form = this._schoolYearForm.get()

    ngOnInit(): void {
        this.schoolYear$.pipe(take(2)).subscribe((schoolYear) => {
            if (schoolYear) {
                this.form = this._schoolYearForm.set(schoolYear)
            }
        })
    }

    ngOnDestroy(): void {
        this._manageSchoolYearModal.schoolYear$.next(null)
    }

    save() {
        if (this.form.invalid) {
            return
        }

        this.schoolYear$.pipe(take(1)).subscribe((schoolYear) => {
            if (schoolYear) {
                this._store.dispatch(
                    StoreAction.SCHOOL_YEARS.update.request({
                        schoolYear: {
                            ...this.form.value,
                            id: schoolYear.id,
                        } as any,
                    }),
                )

                return
            }

            this._store.dispatch(
                StoreAction.SCHOOL_YEARS.add.request({
                    schoolYear: this.form.value as any,
                }),
            )
        })
    }
}
