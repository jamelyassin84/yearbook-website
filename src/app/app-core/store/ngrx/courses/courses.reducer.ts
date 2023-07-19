import {STORE_LOADERS} from '@digital_brand_work/constants/store-loaders'
import {StoreLoaders} from '@digital_brand_work/models/core.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {Course} from 'app/app-core/models/course.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const courseAdapter: EntityAdapter<Course> =
    createEntityAdapter<Course>()

export interface CourseState extends EntityState<Course>, StoreLoaders {
    error: any
    course: Course
}

export const initialState: CourseState = courseAdapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
    course: undefined,
})

export const courseReducer = createReducer(
    initialState,

    on(StoreAction.COURSES.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.COURSES.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.COURSES.show.onSuccess, (state, action) => ({
        ...state,
        admin: action.course,
    })),

    on(StoreAction.COURSES.load.onSuccess, (state, action) =>
        courseAdapter.setAll(action.courses, state),
    ),

    on(StoreAction.COURSES.add.onSuccess, (state, action) =>
        courseAdapter.addOne(action.course, state),
    ),

    on(StoreAction.COURSES.update.onSuccess, (state, action) =>
        courseAdapter.upsertOne(action.course, state),
    ),

    on(StoreAction.COURSES.remove.request, (state, action) =>
        courseAdapter.removeOne(action.id, state),
    ),
)
