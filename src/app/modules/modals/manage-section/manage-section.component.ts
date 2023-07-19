import {Component, HostListener} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {AppState} from 'app/app-core/store/core/app.state'
import {Observable, map, take} from 'rxjs'
import {ManageSectionModal} from './manage-section.service'
import {SectionForm} from 'app/app-core/store/ngrx/sections/sections.form'
import {sectionLoaders} from 'app/app-core/store/ngrx/sections/sections.selectors'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {Department} from 'app/app-core/models/department.model'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {Course} from 'app/app-core/models/course.model'

@Component({
    selector: 'manage-section',
    templateUrl: './manage-section.component.html',
    animations: [...dbwAnimations],
})
export class ManageSectionComponent {
    constructor(
        private _store: Store<AppState>,
        private _sectionForm: SectionForm,
        private _manageSectionModal: ManageSectionModal,
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

    readonly loader$ = this._store
        .select(sectionLoaders)
        .pipe(map((loader) => loader.createLoader))

    readonly opened$ = this._manageSectionModal.opened$

    readonly section$ = this._manageSectionModal.section$

    form = this._sectionForm.get()

    ngOnInit(): void {
        this.section$.pipe(take(2)).subscribe((section) => {
            if (section) {
                this.form.setValue(this._sectionForm.set(section))
            }
        })
    }

    ngOnDestroy(): void {
        this._manageSectionModal.section$.next(null)
    }

    save() {
        if (this.form.invalid) {
            return
        }

        this.section$.pipe(take(1)).subscribe((section) => {
            if (section) {
                this._store.dispatch(
                    StoreAction.SECTIONS.update.request({
                        section: {
                            ...this.form.value,
                            id: section.id,
                        } as any,
                    }),
                )

                return
            }

            this._store.dispatch(
                StoreAction.SECTIONS.add.request({
                    section: this.form.value as any,
                }),
            )
        })
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
