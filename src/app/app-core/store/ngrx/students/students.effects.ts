import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, tap} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {AlertService} from '@digital_brand_work/services/alert.service'
import {ManageStudentModal} from 'app/modules/modals/manage-student/manage-student.service'
import {StudentService} from './students.service'
import {AppState} from '../../core/app.state'
import {Store} from '@ngrx/store'

@Injectable({
    providedIn: 'root',
})
export class StudentEffects {
    constructor(
        private _actions$: Actions,
        private _store: Store<AppState>,
        private _alertService: AlertService,
        private _manageStudentModal: ManageStudentModal,
        private _studentService: StudentService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.STUDENTS.load.request),
            switchMap(() =>
                this._studentService.get().pipe(
                    map((response) =>
                        StoreAction.STUDENTS.load.onSuccess({
                            students: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    yearbook$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.STUDENTS.yearbook.request),
            switchMap((action) =>
                this._studentService.yearbook(action.filter).pipe(
                    tap((response) => {
                        this._store.dispatch(
                            StoreAction.STUDENTS.yearbook.setLinks({
                                links: response.links,
                            }),
                        )
                    }),
                    map((response) =>
                        StoreAction.STUDENTS.load.onSuccess({
                            students: response.data,
                        }),
                    ),
                ),
            ),
        ),
    )

    filter$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.STUDENTS.filter.request),
            switchMap((action) =>
                this._studentService.filter(action.filter).pipe(
                    map((response) =>
                        StoreAction.STUDENTS.load.onSuccess({
                            students: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    show$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.STUDENTS.show.request),
            switchMap((action) =>
                this._studentService.show(action.id).pipe(
                    map((response) =>
                        StoreAction.STUDENTS.show.onSuccess({
                            student: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    add$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.STUDENTS.add.request),
            switchMap((action) =>
                this._studentService.add(action.student).pipe(
                    tap(() => {
                        this._manageStudentModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Added',
                            message: 'List has been successfully added.',
                        })
                    }),
                    map((response) =>
                        StoreAction.STUDENTS.add.onSuccess({
                            student: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    update$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.STUDENTS.update.request),
            switchMap((action) =>
                this._studentService.update(action.student).pipe(
                    tap(() => {
                        this._manageStudentModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Updated',
                            message: 'List has been successfully updated.',
                        })
                    }),
                    map((response) =>
                        StoreAction.STUDENTS.update.onSuccess({
                            student: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    remove$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.STUDENTS.remove.request),
            switchMap((action) =>
                this._studentService.remove(action.id).pipe(
                    map(() =>
                        StoreAction.STUDENTS.remove.onSuccess({
                            id: action.id,
                        }),
                    ),
                ),
            ),
        ),
    )
}
