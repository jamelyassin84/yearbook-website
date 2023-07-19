import {createSelector} from '@ngrx/store'
import {getStoreLoaders} from '@digital_brand_work/constants/get-store-loaders'
import {AppState} from 'app/app-core/store/core/app.state'
import {DepartmentState} from './departments.reducer'

const feature = (state: AppState) => state.departments

export const departmentLoaders = createSelector(
    feature,
    (state: DepartmentState) => getStoreLoaders(state),
)

export const departmentDetails = createSelector(
    feature,
    (state: DepartmentState) => state.department,
)
