import {SystemActions} from '@digital_brand_work/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {Section} from 'app/app-core/models/section.model'

export const SYSTEM = SystemActions({name: 'Section System'})

export const load = createActionGroup({
    source: 'Section load',
    events: {
        request: emptyProps(),
        onSuccess: props<{sections: Section[]}>(),
    },
})

export const filter = createActionGroup({
    source: 'Section filter',
    events: {
        request: props<{filter: any}>(),
    },
})

export const show = createActionGroup({
    source: 'Section Show',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{section: Section}>(),
    },
})

export const add = createActionGroup({
    source: 'Section Update',
    events: {
        request: props<{section: Section}>(),
        onSuccess: props<{section: Section}>(),
    },
})

export const update = createActionGroup({
    source: 'Section Add',
    events: {
        request: props<{section: Section}>(),
        onSuccess: props<{section: Section}>(),
    },
})

export const remove = createActionGroup({
    source: 'Section Delete',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{id: string}>(),
    },
})
