import {createSelector} from '@ngrx/store'
import {getStoreLoaders} from '@digital_brand_work/constants/get-store-loaders'
import {AppState} from 'app/app-core/store/core/app.state'
import {SectionState} from './sections.reducer'

const feature = (state: AppState) => state.sections

export const sectionLoaders = createSelector(feature, (state: SectionState) =>
    getStoreLoaders(state),
)
export const sectionDetails = createSelector(
    feature,
    (state: SectionState) => state.section,
)
