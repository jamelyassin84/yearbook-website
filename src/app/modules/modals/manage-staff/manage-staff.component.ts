import {Component, HostListener} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {AppState} from 'app/app-core/store/core/app.state'
import {Observable, map, take} from 'rxjs'
import {ManageStaffModal} from './manage-staff.service'
import {StaffForm} from 'app/app-core/store/ngrx/staffs/staffs.form'
import {staffLoaders} from 'app/app-core/store/ngrx/staffs/staffs.selectors'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {SchoolYear} from 'app/app-core/models/school-year.model'

@Component({
    selector: 'manage-staff',
    templateUrl: './manage-staff.component.html',
    animations: [...dbwAnimations],
})
export class ManageStaffComponent {
    constructor(
        private _store: Store<AppState>,
        private _staffForm: StaffForm,
        private _manageStaffModal: ManageStaffModal,
    ) {}

    @HostListener('document:keydown.escape')
    onEscapePress() {
        this.opened$.next(false)
    }

    @State({selector: StateEnum.SCHOOL_YEARS, type: 'array'})
    readonly schoolYears$: Observable<SchoolYear[]>

    readonly loader$ = this._store
        .select(staffLoaders)
        .pipe(map((loader) => loader.createLoader))

    readonly opened$ = this._manageStaffModal.opened$

    readonly staff$ = this._manageStaffModal.staff$

    form = this._staffForm.get()

    ngOnInit(): void {
        this.staff$.pipe(take(2)).subscribe((staff) => {
            if (staff) {
                this.form = this._staffForm.set(staff)
            }
        })
    }

    ngOnDestroy(): void {
        this._manageStaffModal.staff$.next(null)
    }

    onImageUploaded(url: string) {
        this.form.get('picture')?.setValue(url)
    }

    save() {
        if (this.form.invalid) {
            return
        }

        this.staff$.pipe(take(1)).subscribe((staff) => {
            if (staff) {
                this._store.dispatch(
                    StoreAction.STAFFS.update.request({
                        staff: {
                            ...this.form.value,
                            id: staff.id,
                        } as any,
                    }),
                )

                return
            }

            this._store.dispatch(
                StoreAction.STAFFS.add.request({
                    staff: this.form.value as any,
                }),
            )
        })
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
