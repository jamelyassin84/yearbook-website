import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, tap} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {AlertService} from '@digital_brand_work/services/alert.service'
import {ManageFacultyModal} from 'app/modules/modals/manage-faculty/manage-faculty.service'
import {FacultyService} from './faculties.service'
import {AppState} from '../../core/app.state'
import {Store} from '@ngrx/store'

@Injectable({
    providedIn: 'root',
})
export class FacultyEffects {
    constructor(
        private _actions$: Actions,
        private _store: Store<AppState>,
        private _alertService: AlertService,
        private _manageFacultyModal: ManageFacultyModal,
        private _facultyService: FacultyService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.FACULTIES.load.request),
            switchMap(() =>
                this._facultyService.get().pipe(
                    map((response) =>
                        StoreAction.FACULTIES.load.onSuccess({
                            faculties: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    yearbook$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.FACULTIES.yearbook.request),
            switchMap((action) =>
                this._facultyService.yearbook(action.filter).pipe(
                    tap((response) => {
                        this._store.dispatch(
                            StoreAction.FACULTIES.yearbook.setLinks({
                                links: response.links,
                            }),
                        )
                    }),
                    map((response) =>
                        StoreAction.FACULTIES.load.onSuccess({
                            faculties: response.data,
                        }),
                    ),
                ),
            ),
        ),
    )

    filter$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.FACULTIES.filter.request),
            switchMap((action) =>
                this._facultyService.filter(action.filter).pipe(
                    map((response) =>
                        StoreAction.FACULTIES.load.onSuccess({
                            faculties: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    show$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.FACULTIES.show.request),
            switchMap((action) =>
                this._facultyService.show(action.id).pipe(
                    map((response) =>
                        StoreAction.FACULTIES.show.onSuccess({
                            faculty: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    add$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.FACULTIES.add.request),
            switchMap((action) =>
                this._facultyService.add(action.faculty).pipe(
                    tap(() => {
                        this._manageFacultyModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Added',
                            message: 'List has been successfully added.',
                        })
                    }),
                    map((response) =>
                        StoreAction.FACULTIES.add.onSuccess({
                            faculty: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    update$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.FACULTIES.update.request),
            switchMap((action) =>
                this._facultyService.update(action.faculty).pipe(
                    tap(() => {
                        this._manageFacultyModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Updated',
                            message: 'List has been successfully updated.',
                        })
                    }),
                    map((response) =>
                        StoreAction.FACULTIES.update.onSuccess({
                            faculty: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    remove$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.FACULTIES.remove.request),
            switchMap((action) =>
                this._facultyService.remove(action.id).pipe(
                    map(() =>
                        StoreAction.FACULTIES.remove.onSuccess({
                            id: action.id,
                        }),
                    ),
                ),
            ),
        ),
    )
}
