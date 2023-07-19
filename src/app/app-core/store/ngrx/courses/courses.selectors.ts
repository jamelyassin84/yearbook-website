import {createSelector} from '@ngrx/store'
import {getStoreLoaders} from '@digital_brand_work/constants/get-store-loaders'
import {AppState} from 'app/app-core/store/core/app.state'
import {CourseState} from './courses.reducer'

const feature = (state: AppState) => state.courses

export const courseLoaders = createSelector(feature, (state: CourseState) =>
    getStoreLoaders(state),
)

export const courseDetails = createSelector(
    feature,
    (state: CourseState) => state.course,
)
