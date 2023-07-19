import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, tap} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {AlertService} from '@digital_brand_work/services/alert.service'
import {ManageSchoolYearModal} from 'app/modules/modals/manage-school-year/manage-school-year.service'
import {SchoolYearService} from './school-years.service'

@Injectable({
    providedIn: 'root',
})
export class SchoolYearEffects {
    constructor(
        private _actions$: Actions,
        private _alertService: AlertService,
        private _manageSchoolYearModal: ManageSchoolYearModal,
        private _schoolYearService: SchoolYearService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SCHOOL_YEARS.load.request),
            switchMap(() =>
                this._schoolYearService.get().pipe(
                    map((response) =>
                        StoreAction.SCHOOL_YEARS.load.onSuccess({
                            schoolYears: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    show$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SCHOOL_YEARS.show.request),
            switchMap((action) =>
                this._schoolYearService.show(action.id).pipe(
                    map((response) =>
                        StoreAction.SCHOOL_YEARS.show.onSuccess({
                            schoolYear: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    add$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SCHOOL_YEARS.add.request),
            switchMap((action) =>
                this._schoolYearService.add(action.schoolYear).pipe(
                    tap(() => {
                        this._manageSchoolYearModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Added',
                            message: 'List has been successfully added.',
                        })
                    }),
                    map((response) =>
                        StoreAction.SCHOOL_YEARS.add.onSuccess({
                            schoolYear: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    update$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SCHOOL_YEARS.update.request),
            switchMap((action) =>
                this._schoolYearService.update(action.schoolYear).pipe(
                    tap(() => {
                        this._manageSchoolYearModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Updated',
                            message: 'List has been successfully updated.',
                        })
                    }),
                    map((response) =>
                        StoreAction.SCHOOL_YEARS.update.onSuccess({
                            schoolYear: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    remove$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SCHOOL_YEARS.remove.request),
            switchMap((action) =>
                this._schoolYearService.remove(action.id).pipe(
                    map((response) =>
                        StoreAction.SCHOOL_YEARS.remove.onSuccess({
                            id: response.id,
                        }),
                    ),
                ),
            ),
        ),
    )
}
