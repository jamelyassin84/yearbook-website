import {STORE_LOADERS} from '@digital_brand_work/constants/store-loaders'
import {StoreLoaders} from '@digital_brand_work/models/core.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {User} from 'app/app-core/models/user.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>()

export interface UserState extends EntityState<User>, StoreLoaders {
    error: any
}

export const initialState: UserState = userAdapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
})

export const adminReducer = createReducer(
    initialState,

    on(StoreAction.AUTH.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.AUTH.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.AUTH.login.onSuccess, (state, action) =>
        userAdapter.setAll([action.user], state),
    ),
)
