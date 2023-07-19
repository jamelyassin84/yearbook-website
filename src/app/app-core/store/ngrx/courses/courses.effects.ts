import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, tap} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {AlertService} from '@digital_brand_work/services/alert.service'
import {CourseService} from './courses.service'
import {ManageCourseModal} from 'app/modules/modals/manage-course/manage-course.service'

@Injectable({
    providedIn: 'root',
})
export class CourseEffects {
    constructor(
        private _actions$: Actions,
        private _alertService: AlertService,
        private _manageCourseModal: ManageCourseModal,
        private _courseService: CourseService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.COURSES.load.request),
            switchMap(() =>
                this._courseService.get().pipe(
                    map((response) =>
                        StoreAction.COURSES.load.onSuccess({
                            courses: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    filter$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.COURSES.filter.request),
            switchMap((action) =>
                this._courseService.filter(action.filter).pipe(
                    map((response) =>
                        StoreAction.COURSES.load.onSuccess({
                            courses: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    show$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.COURSES.show.request),
            switchMap((action) =>
                this._courseService.show(action.id).pipe(
                    map((response) =>
                        StoreAction.COURSES.show.onSuccess({
                            course: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    add$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.COURSES.add.request),
            switchMap((action) =>
                this._courseService.add(action.course).pipe(
                    tap(() => {
                        this._manageCourseModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Added',
                            message: 'List has been successfully added.',
                        })
                    }),
                    map((response) =>
                        StoreAction.COURSES.add.onSuccess({
                            course: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    update$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.COURSES.update.request),
            switchMap((action) =>
                this._courseService.update(action.course).pipe(
                    tap(() => {
                        this._manageCourseModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Updated',
                            message: 'List has been successfully updated.',
                        })
                    }),
                    map((response) =>
                        StoreAction.COURSES.update.onSuccess({
                            course: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    remove$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.COURSES.remove.request),
            switchMap((action) =>
                this._courseService.remove(action.id).pipe(
                    map(() =>
                        StoreAction.COURSES.remove.onSuccess({
                            id: action.id,
                        }),
                    ),
                ),
            ),
        ),
    )
}
