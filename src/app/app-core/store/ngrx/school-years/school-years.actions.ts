import {SystemActions} from '@digital_brand_work/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {SchoolYear} from 'app/app-core/models/school-year.model'

export const SYSTEM = SystemActions({name: 'SchoolYear System'})

export const load = createActionGroup({
    source: 'SchoolYear load',
    events: {
        request: emptyProps(),
        onSuccess: props<{schoolYears: SchoolYear[]}>(),
    },
})

export const show = createActionGroup({
    source: 'SchoolYear Show',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{schoolYear: SchoolYear}>(),
    },
})

export const add = createActionGroup({
    source: 'SchoolYear Update',
    events: {
        request: props<{schoolYear: SchoolYear}>(),
        onSuccess: props<{schoolYear: SchoolYear}>(),
    },
})

export const update = createActionGroup({
    source: 'SchoolYear Add',
    events: {
        request: props<{schoolYear: SchoolYear}>(),
        onSuccess: props<{schoolYear: SchoolYear}>(),
    },
})

export const remove = createActionGroup({
    source: 'SchoolYear Delete',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{id: string}>(),
    },
})
