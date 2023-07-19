import {SystemActions} from '@digital_brand_work/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {Department} from 'app/app-core/models/department.model'

export const SYSTEM = SystemActions({name: 'Department System'})

export const load = createActionGroup({
    source: 'Department load',
    events: {
        request: emptyProps(),
        onSuccess: props<{departments: Department[]}>(),
    },
})

export const filter = createActionGroup({
    source: 'Department filter',
    events: {
        request: props<{filter: any}>(),
    },
})

export const show = createActionGroup({
    source: 'Department Show',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{department: Department}>(),
    },
})

export const add = createActionGroup({
    source: 'Department Update',
    events: {
        request: props<{department: Department}>(),
        onSuccess: props<{department: Department}>(),
    },
})

export const update = createActionGroup({
    source: 'Department Add',
    events: {
        request: props<{department: Department}>(),
        onSuccess: props<{department: Department}>(),
    },
})

export const remove = createActionGroup({
    source: 'Department Delete',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{id: string}>(),
    },
})
