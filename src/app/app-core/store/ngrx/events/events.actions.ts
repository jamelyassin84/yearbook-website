import {SystemActions} from '@digital_brand_work/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {SchoolEvent} from 'app/app-core/models/event.model'

export const SYSTEM = SystemActions({name: 'SchoolEvent System'})

export const load = createActionGroup({
    source: 'SchoolEvent load',
    events: {
        request: emptyProps(),
        onSuccess: props<{schoolEvents: SchoolEvent[]}>(),
    },
})

export const filter = createActionGroup({
    source: 'SchoolEvent filter',
    events: {
        request: props<{filter: any}>(),
    },
})

export const show = createActionGroup({
    source: 'SchoolEvent Show',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{schoolEvent: SchoolEvent}>(),
    },
})

export const add = createActionGroup({
    source: 'SchoolEvent Update',
    events: {
        request: props<{schoolEvent: SchoolEvent}>(),
        onSuccess: props<{schoolEvent: SchoolEvent}>(),
    },
})

export const update = createActionGroup({
    source: 'SchoolEvent Add',
    events: {
        request: props<{schoolEvent: SchoolEvent}>(),
        onSuccess: props<{schoolEvent: SchoolEvent}>(),
    },
})

export const remove = createActionGroup({
    source: 'SchoolEvent Delete',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{id: string}>(),
    },
})
