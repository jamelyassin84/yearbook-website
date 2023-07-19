import {SystemActions} from '@digital_brand_work/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {Faculty} from 'app/app-core/models/faculty.model'

export const SYSTEM = SystemActions({name: 'Faculty System'})

export const load = createActionGroup({
    source: 'Faculty load',
    events: {
        request: emptyProps(),
        onSuccess: props<{faculties: Faculty[]}>(),
    },
})

export const yearbook = createActionGroup({
    source: 'Faculty yearbook',
    events: {
        request: props<{filter: any}>(),
        setLinks: props<{links: any}>(),
    },
})

export const filter = createActionGroup({
    source: 'Faculty filter',
    events: {
        request: props<{filter: any}>(),
    },
})

export const show = createActionGroup({
    source: 'Faculty Show',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{faculty: Faculty}>(),
    },
})

export const add = createActionGroup({
    source: 'Faculty Update',
    events: {
        request: props<{faculty: Faculty}>(),
        onSuccess: props<{faculty: Faculty}>(),
    },
})

export const update = createActionGroup({
    source: 'Faculty Add',
    events: {
        request: props<{faculty: Faculty}>(),
        onSuccess: props<{faculty: Faculty}>(),
    },
})

export const remove = createActionGroup({
    source: 'Faculty Delete',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{id: string}>(),
    },
})
