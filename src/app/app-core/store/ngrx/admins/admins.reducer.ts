import {STORE_LOADERS} from '@digital_brand_work/constants/store-loaders'
import {StoreLoaders} from '@digital_brand_work/models/core.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {Admin} from 'app/app-core/models/admin.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const adminAdapter: EntityAdapter<Admin> = createEntityAdapter<Admin>()

export interface AdminState extends EntityState<Admin>, StoreLoaders {
    error: any
    admin: Admin
}

export const initialState: AdminState = adminAdapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
    admin: undefined,
})

export const adminReducer = createReducer(
    initialState,

    on(StoreAction.ADMIN.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.ADMIN.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.ADMIN.show.onSuccess, (state, action) => ({
        ...state,
        admin: action.admin,
    })),

    on(StoreAction.ADMIN.load.onSuccess, (state, action) =>
        adminAdapter.setAll(action.admins, state),
    ),

    on(StoreAction.ADMIN.add.onSuccess, (state, action) =>
        adminAdapter.addOne(action.admin, state),
    ),

    on(StoreAction.ADMIN.update.onSuccess, (state, action) =>
        adminAdapter.upsertOne(action.admin, state),
    ),

    on(StoreAction.ADMIN.remove.request, (state, action) =>
        adminAdapter.removeOne(action.id, state),
    ),
)
