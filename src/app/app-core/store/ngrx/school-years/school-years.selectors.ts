import {createSelector} from '@ngrx/store'
import {getStoreLoaders} from '@digital_brand_work/constants/get-store-loaders'
import {AppState} from 'app/app-core/store/core/app.state'
import {SchoolYearState} from './school-years.reducer'

const feature = (state: AppState) => state.schoolYears

export const schoolYearLoaders = createSelector(
    feature,
    (state: SchoolYearState) => getStoreLoaders(state),
)
export const schoolYearDetails = createSelector(
    feature,
    (state: SchoolYearState) => state.schoolYear,
)
