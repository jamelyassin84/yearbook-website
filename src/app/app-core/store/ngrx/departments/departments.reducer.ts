import {STORE_LOADERS} from '@digital_brand_work/constants/store-loaders'
import {StoreLoaders} from '@digital_brand_work/models/core.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {Department} from 'app/app-core/models/department.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const departmentAdapter: EntityAdapter<Department> =
    createEntityAdapter<Department>()

export interface DepartmentState extends EntityState<Department>, StoreLoaders {
    error: any
    department: Department
}

export const initialState: DepartmentState = departmentAdapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
    department: undefined,
})

export const departmentReducer = createReducer(
    initialState,

    on(StoreAction.DEPARTMENTS.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.DEPARTMENTS.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.DEPARTMENTS.show.onSuccess, (state, action) => ({
        ...state,
        department: action.department,
    })),

    on(StoreAction.DEPARTMENTS.load.onSuccess, (state, action) =>
        departmentAdapter.setAll(action.departments, state),
    ),

    on(StoreAction.DEPARTMENTS.add.onSuccess, (state, action) =>
        departmentAdapter.addOne(action.department, state),
    ),

    on(StoreAction.DEPARTMENTS.update.onSuccess, (state, action) =>
        departmentAdapter.upsertOne(action.department, state),
    ),

    on(StoreAction.DEPARTMENTS.remove.request, (state, action) =>
        departmentAdapter.removeOne(action.id, state),
    ),
)
