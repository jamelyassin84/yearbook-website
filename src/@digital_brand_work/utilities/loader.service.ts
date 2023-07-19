import {Injectable} from '@angular/core'
import {LoadingStateEnum} from '@digital_brand_work/enums/loading-state.enum'
import {Store} from '@ngrx/store'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {catchError, EMPTY, finalize, Observable, tap} from 'rxjs'

@Injectable({providedIn: 'root'})
export class LoaderService {
    constructor(public _store: Store) {}

    load(
        state: string,
        type: 'get' | 'upsert' = 'upsert',
        loadValue: LoadingStateEnum = LoadingStateEnum.LOADING,
    ): void {
        const _state = state.toUpperCase()

        if (type === 'get') {
            this._store.dispatch(
                StoreAction[_state].SET_GET_LOADING({
                    loading: loadValue,
                }),
            )

            return
        }

        this._store.dispatch(
            StoreAction[_state].SET_LOADING({
                loading: loadValue,
            }),
        )
    }

    addLoadingState(
        state: string,
        type: 'get' | 'upsert' = 'upsert',
        _store: Store = this._store,
    ) {
        return function <T>(source: Observable<T>): Observable<T> {
            return new Observable((subscriber) => {
                const loader = new LoaderService(_store)

                source
                    .pipe(
                        tap(() =>
                            loader.load(
                                state,
                                type,
                                LoadingStateEnum.SUCCEEDED,
                            ),
                        ),
                        catchError(() => {
                            loader.load(state, type, LoadingStateEnum.FAILED)
                            return EMPTY
                        }),
                        finalize(() =>
                            setTimeout(() => {
                                loader.load(state, type, LoadingStateEnum.IDLE)
                            }, 1500),
                        ),
                    )
                    .subscribe({
                        next(value) {
                            if (value !== undefined && value !== null) {
                                subscriber.next(value)
                            }
                        },
                        error(error) {
                            subscriber.error(error)
                        },
                        complete() {
                            subscriber.complete()
                        },
                    })
            })
        }
    }
}
