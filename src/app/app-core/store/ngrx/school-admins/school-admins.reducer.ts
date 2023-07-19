import {STORE_LOADERS} from '@digital_brand_work/constants/store-loaders'
import {
    PaginationLink,
    StoreLoaders,
} from '@digital_brand_work/models/core.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {SchoolAdmin} from 'app/app-core/models/school-admin.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const schoolAdminAdapter: EntityAdapter<SchoolAdmin> =
    createEntityAdapter<SchoolAdmin>()

export interface SchoolAdminState
    extends EntityState<SchoolAdmin>,
        StoreLoaders {
    error: any
    schoolAdmin: SchoolAdmin
    links: PaginationLink[]
}

export const initialState: SchoolAdminState =
    schoolAdminAdapter.getInitialState({
        ...STORE_LOADERS,
        error: null,
        schoolAdmin: undefined,
        links: [],
    })

export const schoolAdminReducer = createReducer(
    initialState,

    on(StoreAction.SCHOOL_ADMINS.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.SCHOOL_ADMINS.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.SCHOOL_ADMINS.show.onSuccess, (state, action) => ({
        ...state,
        schoolEvent: action.schoolAdmin,
    })),

    on(StoreAction.SCHOOL_ADMINS.yearbook.setLinks, (state, action) => ({
        ...state,
        links: action.links,
    })),

    on(StoreAction.SCHOOL_ADMINS.load.onSuccess, (state, action) =>
        schoolAdminAdapter.setAll(action.schoolAdmins, state),
    ),

    on(StoreAction.SCHOOL_ADMINS.add.onSuccess, (state, action) =>
        schoolAdminAdapter.addOne(action.schoolAdmin, state),
    ),

    on(StoreAction.SCHOOL_ADMINS.update.onSuccess, (state, action) =>
        schoolAdminAdapter.upsertOne(action.schoolAdmin, state),
    ),

    on(StoreAction.FACULTIES.remove.request, (state, action) =>
        schoolAdminAdapter.removeOne(action.id, state),
    ),
)
