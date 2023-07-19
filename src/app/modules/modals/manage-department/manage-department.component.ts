import {Component, HostListener} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {AppState} from 'app/app-core/store/core/app.state'
import {DepartmentForm} from 'app/app-core/store/ngrx/departments/departments.form'
import {ManageDepartmentModal} from './manage-department.service'
import {Observable, map, take} from 'rxjs'
import {departmentLoaders} from 'app/app-core/store/ngrx/departments/departments.selectors'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {SchoolYear} from 'app/app-core/models/school-year.model'

@Component({
    selector: 'manage-department',
    templateUrl: './manage-department.component.html',
    animations: [...dbwAnimations],
})
export class ManageDepartmentComponent {
    constructor(
        private _store: Store<AppState>,
        private _departmentForm: DepartmentForm,
        private _manageDepartmentModal: ManageDepartmentModal,
    ) {}

    @HostListener('document:keydown.escape')
    onEscapePress() {
        this.opened$.next(false)
    }

    @State({selector: StateEnum.SCHOOL_YEARS, type: 'array'})
    readonly schoolYears$: Observable<SchoolYear[]>

    readonly loader$ = this._store
        .select(departmentLoaders)
        .pipe(map((loader) => loader.createLoader))

    readonly opened$ = this._manageDepartmentModal.opened$

    readonly department$ = this._manageDepartmentModal.department$

    form = this._departmentForm.get()

    ngOnInit(): void {
        this.department$.pipe(take(2)).subscribe((department) => {
            if (department) {
                this.form = this._departmentForm.set(department)
            }
        })
    }

    ngOnDestroy(): void {
        this._manageDepartmentModal.department$.next(null)
    }

    save() {
        if (this.form.invalid) {
            return
        }

        this.department$.pipe(take(1)).subscribe((department) => {
            if (department) {
                this._store.dispatch(
                    StoreAction.DEPARTMENTS.update.request({
                        department: {
                            ...this.form.value,
                            id: department.id,
                        } as any,
                    }),
                )

                return
            }

            this._store.dispatch(
                StoreAction.DEPARTMENTS.add.request({
                    department: this.form.value as any,
                }),
            )
        })
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
