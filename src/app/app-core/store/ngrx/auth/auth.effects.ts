import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, tap} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {AuthService} from './auth.service'
import {LocalStorageEnum} from 'app/app-core/enums/local-storage.enum'
import {Router} from '@angular/router'

@Injectable({
    providedIn: 'root',
})
export class AuthEffects {
    constructor(
        private _router: Router,
        private _actions$: Actions,
        private _authService: AuthService,
    ) {}

    login$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.AUTH.login.request),
            switchMap((action) =>
                this._authService.login(action.user).pipe(
                    map((response) =>
                        StoreAction.AUTH.login.onSuccess({
                            user: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    logout$ = createEffect(
        () =>
            this._actions$.pipe(
                ofType(StoreAction.ADMIN.show.request),
                switchMap(() =>
                    this._authService.logout().pipe(
                        tap(() => {
                            localStorage.clear()
                            this._router.navigate(['/sign-out'])
                        }),
                    ),
                ),
            ),
        {dispatch: false},
    )

    check$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.ADMIN.add.request),
            switchMap(() =>
                this._authService.check().pipe(
                    tap((response) => {
                        localStorage.setItem(
                            LocalStorageEnum.ACCESS_TOKEN,
                            response.access.token,
                        )
                    }),
                    map((response) =>
                        StoreAction.AUTH.login.onSuccess({
                            user: response,
                        }),
                    ),
                ),
            ),
        ),
    )
}
