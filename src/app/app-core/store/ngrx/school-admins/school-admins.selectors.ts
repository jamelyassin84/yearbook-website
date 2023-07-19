import {createSelector} from '@ngrx/store'
import {getStoreLoaders} from '@digital_brand_work/constants/get-store-loaders'
import {AppState} from 'app/app-core/store/core/app.state'
import {SchoolAdminState} from './school-admins.reducer'

const feature = (state: AppState) => state.schoolAdmins

export const schoolAdminLoaders = createSelector(
    feature,
    (state: SchoolAdminState) => getStoreLoaders(state),
)

export const schoolAdminDetails = createSelector(
    feature,
    (state: SchoolAdminState) => state.schoolAdmin,
)

export const schoolAdminPageLinks = createSelector(
    feature,
    (state: SchoolAdminState) => state.links,
)
