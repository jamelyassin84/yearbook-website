import {STORE_LOADERS} from '@digital_brand_work/constants/store-loaders'
import {StoreLoaders} from '@digital_brand_work/models/core.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {SchoolEvent} from 'app/app-core/models/event.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const schoolEventAdapter: EntityAdapter<SchoolEvent> =
    createEntityAdapter<SchoolEvent>()

export interface SchoolEventState
    extends EntityState<SchoolEvent>,
        StoreLoaders {
    error: any
    schoolEvent: SchoolEvent
}

export const initialState: SchoolEventState =
    schoolEventAdapter.getInitialState({
        ...STORE_LOADERS,
        error: null,
        schoolEvent: undefined,
    })

export const schoolEventReducer = createReducer(
    initialState,

    on(StoreAction.EVENTS.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.EVENTS.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.EVENTS.show.onSuccess, (state, action) => ({
        ...state,
        schoolEvent: action.schoolEvent,
    })),

    on(StoreAction.EVENTS.load.onSuccess, (state, action) =>
        schoolEventAdapter.setAll(action.schoolEvents, state),
    ),

    on(StoreAction.EVENTS.add.onSuccess, (state, action) =>
        schoolEventAdapter.addOne(action.schoolEvent, state),
    ),

    on(StoreAction.EVENTS.update.onSuccess, (state, action) =>
        schoolEventAdapter.upsertOne(action.schoolEvent, state),
    ),

    on(StoreAction.EVENTS.remove.request, (state, action) =>
        schoolEventAdapter.removeOne(action.id, state),
    ),
)
