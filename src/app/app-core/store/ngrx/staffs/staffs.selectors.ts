import {createSelector} from '@ngrx/store'
import {getStoreLoaders} from '@digital_brand_work/constants/get-store-loaders'
import {AppState} from 'app/app-core/store/core/app.state'
import {StaffState} from './staffs.reducer'

const feature = (state: AppState) => state.staffs

export const staffLoaders = createSelector(feature, (state: StaffState) =>
    getStoreLoaders(state),
)

export const staffDetails = createSelector(
    feature,
    (state: StaffState) => state.staff,
)

export const staffPageLinks = createSelector(
    feature,
    (state: StaffState) => state.links,
)
