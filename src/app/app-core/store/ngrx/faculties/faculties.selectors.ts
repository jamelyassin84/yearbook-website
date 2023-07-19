import {createSelector} from '@ngrx/store'
import {getStoreLoaders} from '@digital_brand_work/constants/get-store-loaders'
import {AppState} from 'app/app-core/store/core/app.state'
import {FacultyState} from './faculties.reducer'

const feature = (state: AppState) => state.faculties

export const facultyLoaders = createSelector(feature, (state: FacultyState) =>
    getStoreLoaders(state),
)

export const facultyDetails = createSelector(
    feature,
    (state: FacultyState) => state.faculty,
)

export const facultyPageLinks = createSelector(
    feature,
    (state: FacultyState) => state.links,
)
