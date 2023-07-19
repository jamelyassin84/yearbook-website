import {STORE_LOADERS} from '@digital_brand_work/constants/store-loaders'
import {
    PaginationLink,
    StoreLoaders,
} from '@digital_brand_work/models/core.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {Staff} from 'app/app-core/models/staff.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const staffAdapter: EntityAdapter<Staff> = createEntityAdapter<Staff>()

export interface StaffState extends EntityState<Staff>, StoreLoaders {
    error: any
    staff: Staff
    links: PaginationLink[]
}

export const initialState: StaffState = staffAdapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
    staff: undefined,
    links: [],
})

export const staffReducer = createReducer(
    initialState,

    on(StoreAction.STAFFS.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.STAFFS.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.STAFFS.show.onSuccess, (state, action) => ({
        ...state,
        staff: action.staff,
    })),

    on(StoreAction.STAFFS.yearbook.setLinks, (state, action) => ({
        ...state,
        links: action.links,
    })),

    on(StoreAction.STAFFS.load.onSuccess, (state, action) =>
        staffAdapter.setAll(action.staffs, state),
    ),

    on(StoreAction.STAFFS.add.onSuccess, (state, action) =>
        staffAdapter.addOne(action.staff, state),
    ),

    on(StoreAction.STAFFS.update.onSuccess, (state, action) =>
        staffAdapter.upsertOne(action.staff, state),
    ),

    on(StoreAction.STAFFS.remove.request, (state, action) =>
        staffAdapter.removeOne(action.id, state),
    ),
)
