import {STORE_LOADERS} from '@digital_brand_work/constants/store-loaders'
import {StoreLoaders} from '@digital_brand_work/models/core.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {Section} from 'app/app-core/models/section.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const sectionAdapter: EntityAdapter<Section> =
    createEntityAdapter<Section>()

export interface SectionState extends EntityState<Section>, StoreLoaders {
    error: any
    section: Section
}

export const initialState: SectionState = sectionAdapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
    section: undefined,
})

export const sectionReducer = createReducer(
    initialState,

    on(StoreAction.SECTIONS.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.SECTIONS.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.SECTIONS.show.onSuccess, (state, action) => ({
        ...state,
        section: action.section,
    })),

    on(StoreAction.SECTIONS.load.onSuccess, (state, action) =>
        sectionAdapter.setAll(action.sections, state),
    ),

    on(StoreAction.SECTIONS.add.onSuccess, (state, action) =>
        sectionAdapter.addOne(action.section, state),
    ),

    on(StoreAction.SECTIONS.update.onSuccess, (state, action) =>
        sectionAdapter.upsertOne(action.section, state),
    ),

    on(StoreAction.SECTIONS.remove.request, (state, action) =>
        sectionAdapter.removeOne(action.id, state),
    ),
)
