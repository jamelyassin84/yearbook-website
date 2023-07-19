import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, tap} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {AlertService} from '@digital_brand_work/services/alert.service'
import {ManageSectionModal} from 'app/modules/modals/manage-section/manage-section.service'
import {SectionService} from './sections.service'

@Injectable({
    providedIn: 'root',
})
export class SectionEffects {
    constructor(
        private _actions$: Actions,
        private _alertService: AlertService,
        private _manageSectionModal: ManageSectionModal,
        private _sectionService: SectionService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SECTIONS.load.request),
            switchMap(() =>
                this._sectionService.get().pipe(
                    map((response) =>
                        StoreAction.SECTIONS.load.onSuccess({
                            sections: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    filter$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SECTIONS.filter.request),
            switchMap((action) =>
                this._sectionService.filter(action.filter).pipe(
                    map((response) =>
                        StoreAction.SECTIONS.load.onSuccess({
                            sections: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    show$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SECTIONS.show.request),
            switchMap((action) =>
                this._sectionService.show(action.id).pipe(
                    map((response) =>
                        StoreAction.SECTIONS.show.onSuccess({
                            section: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    add$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SECTIONS.add.request),
            switchMap((action) =>
                this._sectionService.add(action.section).pipe(
                    tap(() => {
                        this._manageSectionModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Added',
                            message: 'List has been successfully added.',
                        })
                    }),
                    map((response) =>
                        StoreAction.SECTIONS.add.onSuccess({
                            section: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    update$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SECTIONS.update.request),
            switchMap((action) =>
                this._sectionService.update(action.section).pipe(
                    tap(() => {
                        this._manageSectionModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Updated',
                            message: 'List has been successfully updated.',
                        })
                    }),
                    map((response) =>
                        StoreAction.SECTIONS.update.onSuccess({
                            section: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    remove$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SECTIONS.remove.request),
            switchMap((action) =>
                this._sectionService.remove(action.id).pipe(
                    map(() =>
                        StoreAction.SECTIONS.remove.onSuccess({
                            id: action.id,
                        }),
                    ),
                ),
            ),
        ),
    )
}
