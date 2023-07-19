import {Component, HostListener} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {AppState} from 'app/app-core/store/core/app.state'
import {ManageYearbookModal} from './manage-yearbook.service'
import {yearbookLoaders} from 'app/app-core/store/ngrx/yearbook/yearbook.selectors'
import {map} from 'rxjs'
import {InformationTypeEum} from 'app/app-core/enums/information-type.enum'

@Component({
    selector: 'manage-yearbook',
    templateUrl: './manage-yearbook.component.html',
    animations: [...dbwAnimations],
})
export class ManageYearbookComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageYearbookModal: ManageYearbookModal,
    ) {}

    @HostListener('document:keydown.escape')
    onEscapePress() {
        this.opened$.next(false)
    }

    readonly loader$ = this._store
        .select(yearbookLoaders)
        .pipe(map((loader) => loader.getLoader))

    readonly opened$ = this._manageYearbookModal.opened$

    readonly schoolYear$ = this._manageYearbookModal.schoolYear$

    readonly ENTITIES = Object.values(InformationTypeEum)

    currentEntity: InformationTypeEum = this.ENTITIES[0]

    ngOnInit(): void {
        document.body.style.overflow = 'hidden'
    }

    ngOnDestroy(): void {
        document.body.style.overflow = 'auto'
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
