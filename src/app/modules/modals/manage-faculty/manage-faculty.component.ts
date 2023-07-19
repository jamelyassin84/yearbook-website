import {Component, HostListener} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {AppState} from 'app/app-core/store/core/app.state'
import {ManageFacultyModal} from './manage-faculty.service'
import {Observable, map, take} from 'rxjs'
import {FacultyForm} from 'app/app-core/store/ngrx/faculties/faculties.forms'
import {facultyLoaders} from 'app/app-core/store/ngrx/faculties/faculties.selectors'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {Department} from 'app/app-core/models/department.model'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {SchoolYear} from 'app/app-core/models/school-year.model'

@Component({
    selector: 'manage-faculty',
    templateUrl: './manage-faculty.component.html',
    animations: [...dbwAnimations],
})
export class ManageFacultyComponent {
    constructor(
        private _store: Store<AppState>,
        private _facultyForm: FacultyForm,
        private _manageFacultyModal: ManageFacultyModal,
    ) {}

    @HostListener('document:keydown.escape')
    onEscapePress() {
        this.opened$.next(false)
    }

    @State({selector: StateEnum.DEPARTMENTS, type: 'array'})
    readonly departments$: Observable<Department[]>

    @State({selector: StateEnum.SCHOOL_YEARS, type: 'array'})
    readonly schoolYears$: Observable<SchoolYear[]>

    readonly loader$ = this._store
        .select(facultyLoaders)
        .pipe(map((loader) => loader.createLoader))

    readonly opened$ = this._manageFacultyModal.opened$

    readonly faculty$ = this._manageFacultyModal.faculty$

    form = this._facultyForm.get()

    ngOnInit(): void {
        this.faculty$.pipe(take(2)).subscribe((faculty) => {
            if (faculty) {
                this.form = this._facultyForm.set(faculty)
            }
        })
    }

    ngOnDestroy(): void {
        this._manageFacultyModal.faculty$.next(null)
    }
    onImageUploaded(url: string) {
        this.form.get('picture')?.setValue(url)
    }

    save() {
        if (this.form.invalid) {
            return
        }

        this.faculty$.pipe(take(1)).subscribe((faculty) => {
            if (faculty) {
                this._store.dispatch(
                    StoreAction.FACULTIES.update.request({
                        faculty: {
                            ...this.form.value,
                            id: faculty.id,
                        } as any,
                    }),
                )

                return
            }

            this._store.dispatch(
                StoreAction.FACULTIES.add.request({
                    faculty: this.form.value as any,
                }),
            )
        })
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
