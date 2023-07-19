import {Component, HostListener} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {AppState} from 'app/app-core/store/core/app.state'
import {Observable, map, take} from 'rxjs'
import {ManageStudentModal} from './manage-student.service'
import {StudentForm} from 'app/app-core/store/ngrx/students/students.form'
import {studentLoaders} from 'app/app-core/store/ngrx/students/students.selectors'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {Department} from 'app/app-core/models/department.model'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {Course} from 'app/app-core/models/course.model'
import {Section} from 'app/app-core/models/section.model'

@Component({
    selector: 'manage-student',
    templateUrl: './manage-student.component.html',
    animations: [...dbwAnimations],
})
export class ManageStudentComponent {
    constructor(
        private _store: Store<AppState>,
        private _studentForm: StudentForm,
        private _manageStudentModal: ManageStudentModal,
    ) {}

    @HostListener('document:keydown.escape')
    onEscapePress() {
        this.opened$.next(false)
    }

    @State({selector: StateEnum.DEPARTMENTS, type: 'array'})
    readonly departments$: Observable<Department[]>

    @State({selector: StateEnum.SCHOOL_YEARS, type: 'array'})
    readonly schoolYears$: Observable<SchoolYear[]>

    @State({selector: StateEnum.COURSES, type: 'array'})
    readonly courses$: Observable<Course[]>

    @State({selector: StateEnum.SECTIONS, type: 'array'})
    readonly sections$: Observable<Section[]>

    readonly loader$ = this._store
        .select(studentLoaders)
        .pipe(map((loader) => loader.createLoader))

    readonly opened$ = this._manageStudentModal.opened$

    readonly student$ = this._manageStudentModal.student$

    form = this._studentForm.get()

    ngOnInit(): void {
        this.student$.pipe(take(2)).subscribe((student) => {
            if (student) {
                this.form = this._studentForm.set(student)
            }
        })
    }
    ngOnDestroy(): void {
        this._manageStudentModal.student$.next(null)
    }
    onImageUploaded(url: string) {
        this.form.get('picture')?.setValue(url)
    }

    save() {
        console.log(this.form.value)
        if (this.form.invalid) {
            return
        }

        this.student$.pipe(take(1)).subscribe((student) => {
            if (student) {
                this._store.dispatch(
                    StoreAction.STUDENTS.update.request({
                        student: {
                            ...this.form.value,
                            id: student.id,
                        } as any,
                    }),
                )

                return
            }

            this._store.dispatch(
                StoreAction.STUDENTS.add.request({
                    student: this.form.value as any,
                }),
            )
        })
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
