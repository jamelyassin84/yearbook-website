import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, tap} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {YearbookService} from './yearbook.service'

@Injectable({
    providedIn: 'root',
})
export class YearbookEffects {
    constructor(
        private _actions$: Actions,
        private _yearbookService: YearbookService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.YEARBOOK.load.request),
            switchMap((action) =>
                this._yearbookService.get(action.school_year_id).pipe(
                    map((response) =>
                        StoreAction.YEARBOOK.load.onSuccess({
                            yearbook: response,
                        }),
                    ),
                ),
            ),
        ),
    )
}
