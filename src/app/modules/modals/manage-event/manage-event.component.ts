import {vendors} from './../../../mock-api/apps/ecommerce/inventory/data'
import {Component, HostListener} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {AppState} from 'app/app-core/store/core/app.state'
import {ManageSchoolEventModal} from './manage-event.service'
import {Store} from '@ngrx/store'
import {SchoolEventForm} from 'app/app-core/store/ngrx/events/events.forms'
import {Observable, map, take} from 'rxjs'
import {schoolEventLoaders} from 'app/app-core/store/ngrx/events/events.selectors'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {SchoolYear} from 'app/app-core/models/school-year.model'

@Component({
    selector: 'manage-event',
    templateUrl: './manage-event.component.html',
    animations: [...dbwAnimations],
})
export class ManageEventComponent {
    constructor(
        private _store: Store<AppState>,
        private _schoolEventForm: SchoolEventForm,
        private _manageSchoolEventModal: ManageSchoolEventModal,
    ) {}

    @HostListener('document:keydown.escape')
    onEscapePress() {
        this.opened$.next(false)
    }

    @State({selector: StateEnum.SCHOOL_YEARS, type: 'array'})
    readonly schoolYears$: Observable<SchoolYear[]>

    readonly loader$ = this._store
        .select(schoolEventLoaders)
        .pipe(map((loader) => loader.createLoader))

    readonly opened$ = this._manageSchoolEventModal.opened$

    readonly schoolEvent$ = this._manageSchoolEventModal.schoolEvent$

    form = this._schoolEventForm.get()

    ngOnInit(): void {
        this.schoolEvent$.pipe(take(2)).subscribe((schoolEvent) => {
            if (schoolEvent) {
                this.form = this._schoolEventForm.set(schoolEvent)
            }
        })
    }

    ngOnDestroy(): void {
        this._manageSchoolEventModal.schoolEvent$.next(null)
    }

    save() {
        if (this.form.invalid) {
            return
        }

        this.schoolEvent$.pipe(take(1)).subscribe((schoolEvent) => {
            if (schoolEvent) {
                this._store.dispatch(
                    StoreAction.EVENTS.update.request({
                        schoolEvent: {
                            ...this.form.value,
                            id: schoolEvent.id,
                        } as any,
                    }),
                )

                return
            }

            this._store.dispatch(
                StoreAction.EVENTS.add.request({
                    schoolEvent: this.form.value as any,
                }),
            )
        })
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
