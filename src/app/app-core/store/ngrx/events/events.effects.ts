import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, tap} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {AlertService} from '@digital_brand_work/services/alert.service'
import {ManageSchoolEventModal} from 'app/modules/modals/manage-event/manage-event.service'
import {SchoolEventService} from './events.service'

@Injectable({
    providedIn: 'root',
})
export class SchoolEventEffects {
    constructor(
        private _actions$: Actions,
        private _alertService: AlertService,
        private _manageSchoolEventModal: ManageSchoolEventModal,
        private _schoolEventService: SchoolEventService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.EVENTS.load.request),
            switchMap(() =>
                this._schoolEventService.get().pipe(
                    map((response) =>
                        StoreAction.EVENTS.load.onSuccess({
                            schoolEvents: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    filter$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.EVENTS.filter.request),
            switchMap((action) =>
                this._schoolEventService.filter(action.filter).pipe(
                    map((response) =>
                        StoreAction.EVENTS.load.onSuccess({
                            schoolEvents: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    show$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.EVENTS.show.request),
            switchMap((action) =>
                this._schoolEventService.show(action.id).pipe(
                    map((response) =>
                        StoreAction.EVENTS.show.onSuccess({
                            schoolEvent: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    add$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.EVENTS.add.request),
            switchMap((action) =>
                this._schoolEventService.add(action.schoolEvent).pipe(
                    tap(() => {
                        this._manageSchoolEventModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Added',
                            message: 'List has been successfully added.',
                        })
                    }),
                    map((response) =>
                        StoreAction.EVENTS.add.onSuccess({
                            schoolEvent: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    update$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.EVENTS.update.request),
            switchMap((action) =>
                this._schoolEventService.update(action.schoolEvent).pipe(
                    tap(() => {
                        this._manageSchoolEventModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Updated',
                            message: 'List has been successfully updated.',
                        })
                    }),
                    map((response) =>
                        StoreAction.EVENTS.update.onSuccess({
                            schoolEvent: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    remove$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.EVENTS.remove.request),
            switchMap((action) =>
                this._schoolEventService.remove(action.id).pipe(
                    map(() =>
                        StoreAction.EVENTS.remove.onSuccess({
                            id: action.id,
                        }),
                    ),
                ),
            ),
        ),
    )
}
