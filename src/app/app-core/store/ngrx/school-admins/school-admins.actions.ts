import {SystemActions} from '@digital_brand_work/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {SchoolAdmin} from 'app/app-core/models/school-admin.model'

export const SYSTEM = SystemActions({name: 'SchoolAdmin System'})

export const load = createActionGroup({
    source: 'SchoolAdmin load',
    events: {
        request: emptyProps(),
        onSuccess: props<{schoolAdmins: SchoolAdmin[]}>(),
    },
})

export const yearbook = createActionGroup({
    source: 'SchoolAdmin yearbook',
    events: {
        request: props<{filter: any}>(),
        setLinks: props<{links: any}>(),
    },
})

export const filter = createActionGroup({
    source: 'SchoolAdmin filter',
    events: {
        request: props<{filter: any}>(),
    },
})

export const show = createActionGroup({
    source: 'SchoolAdmin Show',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{schoolAdmin: SchoolAdmin}>(),
    },
})

export const add = createActionGroup({
    source: 'SchoolAdmin Update',
    events: {
        request: props<{schoolAdmin: SchoolAdmin}>(),
        onSuccess: props<{schoolAdmin: SchoolAdmin}>(),
    },
})

export const update = createActionGroup({
    source: 'SchoolAdmin Add',
    events: {
        request: props<{schoolAdmin: SchoolAdmin}>(),
        onSuccess: props<{schoolAdmin: SchoolAdmin}>(),
    },
})

export const remove = createActionGroup({
    source: 'SchoolAdmin Delete',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{id: string}>(),
    },
})
