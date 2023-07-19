import {Component, HostListener} from '@angular/core'
import {Store} from '@ngrx/store'
import {AppState} from 'app/app-core/store/core/app.state'
import {ManageSchoolAdminModal} from './manage-school-admin.service'
import {SchoolAdminForm} from 'app/app-core/store/ngrx/school-admins/school-admins.forms'
import {Observable, map, take} from 'rxjs'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {schoolAdminLoaders} from 'app/app-core/store/ngrx/school-admins/school-admins.selectors'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {SchoolYear} from 'app/app-core/models/school-year.model'

@Component({
    selector: 'manage-school-admin',
    templateUrl: './manage-school-admin.component.html',
    animations: [...dbwAnimations],
})
export class ManageSchoolAdminComponent {
    constructor(
        private _store: Store<AppState>,
        private _schoolAdminForm: SchoolAdminForm,
        private _manageSchoolAdminModal: ManageSchoolAdminModal,
    ) {}

    @HostListener('document:keydown.escape')
    onEscapePress() {
        this.opened$.next(false)
    }

    @State({selector: StateEnum.SCHOOL_YEARS, type: 'array'})
    readonly schoolYears$: Observable<SchoolYear[]>

    readonly loader$ = this._store
        .select(schoolAdminLoaders)
        .pipe(map((loader) => loader.createLoader))

    readonly opened$ = this._manageSchoolAdminModal.opened$

    readonly schoolAdmin$ = this._manageSchoolAdminModal.schoolAdmin$

    form = this._schoolAdminForm.get()

    ngOnInit(): void {
        this.schoolAdmin$.pipe(take(2)).subscribe((schoolAdmin) => {
            if (schoolAdmin) {
                this.form = this._schoolAdminForm.set(schoolAdmin)
            }
        })
    }

    ngOnDestroy(): void {
        this._manageSchoolAdminModal.schoolAdmin$.next(null)
    }

    onImageUploaded(url: string) {
        this.form.get('picture')?.setValue(url)
    }

    save() {
        if (this.form.invalid) {
            return
        }

        this.schoolAdmin$.pipe(take(1)).subscribe((schoolAdmin) => {
            if (schoolAdmin) {
                this._store.dispatch(
                    StoreAction.SCHOOL_ADMINS.update.request({
                        schoolAdmin: {
                            ...this.form.value,
                            id: schoolAdmin.id,
                        } as any,
                    }),
                )

                return
            }

            this._store.dispatch(
                StoreAction.SCHOOL_ADMINS.add.request({
                    schoolAdmin: this.form.value as any,
                }),
            )
        })
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
