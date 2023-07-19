import {createSelector} from '@ngrx/store'
import {getStoreLoaders} from '@digital_brand_work/constants/get-store-loaders'
import {AppState} from 'app/app-core/store/core/app.state'
import {YearbookState} from './yearbook.reducer'

const feature = (state: AppState) => state.yearbook

export const yearbookLoaders = createSelector(feature, (state: YearbookState) =>
    getStoreLoaders(state),
)
