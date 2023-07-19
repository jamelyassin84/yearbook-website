import {createSelector} from '@ngrx/store'
import {getStoreLoaders} from '@digital_brand_work/constants/get-store-loaders'
import {AppState} from 'app/app-core/store/core/app.state'
import {UserState} from './auth.reducer'

const feature = (state: AppState) => state.user

export const authLoaders = createSelector(feature, (state: UserState) =>
    getStoreLoaders(state),
)
