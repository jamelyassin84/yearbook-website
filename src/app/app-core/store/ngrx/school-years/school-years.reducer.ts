import {STORE_LOADERS} from '@digital_brand_work/constants/store-loaders'
import {StoreLoaders} from '@digital_brand_work/models/core.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const schoolYearAdapter: EntityAdapter<SchoolYear> =
    createEntityAdapter<SchoolYear>()

export interface SchoolYearState extends EntityState<SchoolYear>, StoreLoaders {
    error: any
    schoolYear: SchoolYear
}

export const initialState: SchoolYearState = schoolYearAdapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
    schoolYear: undefined,
})

export const schoolYearReducer = createReducer(
    initialState,

    on(StoreAction.SCHOOL_YEARS.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.SCHOOL_YEARS.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.SCHOOL_YEARS.load.onSuccess, (state, action) =>
        schoolYearAdapter.setAll(action.schoolYears, state),
    ),

    on(StoreAction.SCHOOL_YEARS.show.onSuccess, (state, action) => ({
        ...state,
        schoolYear: action.schoolYear,
    })),

    on(StoreAction.SCHOOL_YEARS.add.onSuccess, (state, action) =>
        schoolYearAdapter.addOne(action.schoolYear, state),
    ),

    on(StoreAction.SCHOOL_YEARS.update.onSuccess, (state, action) =>
        schoolYearAdapter.upsertOne(action.schoolYear, state),
    ),

    on(StoreAction.SCHOOL_YEARS.remove.request, (state, action) =>
        schoolYearAdapter.removeOne(action.id, state),
    ),
)
