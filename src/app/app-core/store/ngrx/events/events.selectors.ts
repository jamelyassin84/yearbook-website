import {createSelector} from '@ngrx/store'
import {getStoreLoaders} from '@digital_brand_work/constants/get-store-loaders'
import {AppState} from 'app/app-core/store/core/app.state'
import {SchoolEventState} from './events.reducer'

const feature = (state: AppState) => state.schoolEvents

export const schoolEventLoaders = createSelector(
    feature,
    (state: SchoolEventState) => getStoreLoaders(state),
)

export const schoolEventDetails = createSelector(
    feature,
    (state: SchoolEventState) => state.schoolEvent,
)
