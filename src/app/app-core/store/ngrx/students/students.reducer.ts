import {STORE_LOADERS} from '@digital_brand_work/constants/store-loaders'
import {
    PaginationLink,
    StoreLoaders,
} from '@digital_brand_work/models/core.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {Student} from 'app/app-core/models/student.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const studentAdapter: EntityAdapter<Student> =
    createEntityAdapter<Student>()

export interface StudentState extends EntityState<Student>, StoreLoaders {
    error: any
    student: Student
    links: PaginationLink[]
}

export const initialState: StudentState = studentAdapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
    student: undefined,
    links: [],
})

export const studentReducer = createReducer(
    initialState,

    on(StoreAction.STUDENTS.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.STUDENTS.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.STUDENTS.show.onSuccess, (state, action) => ({
        ...state,
        student: action.student,
    })),

    on(StoreAction.STUDENTS.yearbook.setLinks, (state, action) => ({
        ...state,
        links: action.links,
    })),

    on(StoreAction.STUDENTS.load.onSuccess, (state, action) =>
        studentAdapter.setAll(action.students, state),
    ),

    on(StoreAction.STUDENTS.add.onSuccess, (state, action) =>
        studentAdapter.addOne(action.student, state),
    ),

    on(StoreAction.STUDENTS.update.onSuccess, (state, action) =>
        studentAdapter.upsertOne(action.student, state),
    ),

    on(StoreAction.STUDENTS.remove.request, (state, action) =>
        studentAdapter.removeOne(action.id, state),
    ),
)
