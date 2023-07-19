import {STORE_LOADERS} from '@digital_brand_work/constants/store-loaders'
import {StoreLoaders} from '@digital_brand_work/models/core.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {Yearbook} from 'app/app-core/models/yearbook.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const yearbookAdapter: EntityAdapter<Yearbook> =
    createEntityAdapter<Yearbook>()

export interface YearbookState extends EntityState<Yearbook>, StoreLoaders {
    error: any
}

export const initialState: YearbookState = yearbookAdapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
})

export const yearbookReducer = createReducer(
    initialState,

    on(StoreAction.YEARBOOK.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.YEARBOOK.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.YEARBOOK.load.onSuccess, (state, action) =>
        yearbookAdapter.setAll([action.yearbook], state),
    ),
)
