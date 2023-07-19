import {createSelector} from '@ngrx/store'
import {getStoreLoaders} from '@digital_brand_work/constants/get-store-loaders'
import {AppState} from 'app/app-core/store/core/app.state'
import {AdminState} from './admins.reducer'

const feature = (state: AppState) => state.admins

export const adminLoaders = createSelector(feature, (state: AdminState) =>
    getStoreLoaders(state),
)

export const adminDetails = createSelector(
    feature,
    (state: AdminState) => state.admin,
)
