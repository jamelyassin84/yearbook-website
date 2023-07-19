import {STORE_LOADERS} from '@digital_brand_work/constants/store-loaders'
import {
    PaginationLink,
    StoreLoaders,
} from '@digital_brand_work/models/core.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {Faculty} from 'app/app-core/models/faculty.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const facultyAdapter: EntityAdapter<Faculty> =
    createEntityAdapter<Faculty>()

export interface FacultyState extends EntityState<Faculty>, StoreLoaders {
    error: any
    faculty: Faculty
    links: PaginationLink[]
}

export const initialState: FacultyState = facultyAdapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
    faculty: undefined,
    links: [],
})

export const facultyReducer = createReducer(
    initialState,

    on(StoreAction.FACULTIES.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.FACULTIES.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.FACULTIES.show.onSuccess, (state, action) => ({
        ...state,
        faculty: action.faculty,
    })),

    on(StoreAction.FACULTIES.yearbook.setLinks, (state, action) => ({
        ...state,
        links: action.links,
    })),

    on(StoreAction.FACULTIES.load.onSuccess, (state, action) =>
        facultyAdapter.setAll(action.faculties, state),
    ),

    on(StoreAction.FACULTIES.add.onSuccess, (state, action) =>
        facultyAdapter.addOne(action.faculty, state),
    ),

    on(StoreAction.FACULTIES.update.onSuccess, (state, action) =>
        facultyAdapter.upsertOne(action.faculty, state),
    ),

    on(StoreAction.FACULTIES.remove.request, (state, action) =>
        facultyAdapter.removeOne(action.id, state),
    ),
)
