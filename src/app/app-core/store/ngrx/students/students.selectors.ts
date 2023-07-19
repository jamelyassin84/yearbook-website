import {createSelector} from '@ngrx/store'
import {getStoreLoaders} from '@digital_brand_work/constants/get-store-loaders'
import {AppState} from 'app/app-core/store/core/app.state'
import {StudentState} from './students.reducer'

const feature = (state: AppState) => state.students

export const studentLoaders = createSelector(feature, (state: StudentState) =>
    getStoreLoaders(state),
)

export const studentDetails = createSelector(
    feature,
    (state: StudentState) => state.student,
)

export const studentPageLinks = createSelector(
    feature,
    (state: StudentState) => state.links,
)
