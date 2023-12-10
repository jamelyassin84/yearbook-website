import {vendors} from './../../../mock-api/apps/ecommerce/inventory/data'
import {Component, HostListener, signal} from '@angular/core'
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
import {FileService} from '@digital_brand_work/services/file.service'
import {HTMLInputEvent} from '@digital_brand_work/models/core.model'
import {unfreeze} from '@digital_brand_work/helpers/helpers'

@Component({
    selector: 'manage-event',
    templateUrl: './manage-event.component.html',
    animations: [...dbwAnimations],
})
export class ManageEventComponent {
    constructor(
        private readonly _store: Store<AppState>,
        private readonly _fileService: FileService,
        private readonly _schoolEventForm: SchoolEventForm,
        private readonly _manageSchoolEventModal: ManageSchoolEventModal,
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

    fileUrls: string[] = []

    ngOnInit(): void {
        this.schoolEvent$.pipe(take(2)).subscribe((schoolEvent) => {
            if (schoolEvent) {
                this.form = this._schoolEventForm.set(schoolEvent)
                setTimeout(() => {
                    this.fileUrls = unfreeze(schoolEvent.files)
                }, 1000)
            }
        })
    }

    ngOnDestroy(): void {
        this._manageSchoolEventModal.schoolEvent$.next(null)
    }

    async onDrop(event: FileList) {
        for (let i = 0; i < event.length; i++) {
            const file = event.item(i)
            if (file) {
                this.upload(file)
            }
        }
    }

    async onFileRead(event: Event) {
        const target = event.target as HTMLInputElement
        const files = target.files

        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files.item(i)
                if (file) {
                    this.upload(file)
                }
            }
        }
    }

    async upload(originalFile: File) {
        this._fileService.upload(originalFile).subscribe((file) => {
            this.fileUrls.push(file.url)
        })
    }

    remove(index: number) {
        this.fileUrls.splice(index, 1)
    }

    download(url: string) {
        const element = document.createElement('a')
        element.setAttribute('href', url)
        element.setAttribute('download', '')
        element.setAttribute('target', '_blank')
        element.click()
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
                            files: this.fileUrls,
                        } as any,
                    }),
                )

                return
            }

            this._store.dispatch(
                StoreAction.EVENTS.add.request({
                    schoolEvent: {
                        ...this.form.value,
                        files: this.fileUrls,
                    } as any,
                }),
            )
        })
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
