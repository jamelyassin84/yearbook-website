import {SystemActions} from '@digital_brand_work/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {Staff} from 'app/app-core/models/staff.model'

export const SYSTEM = SystemActions({name: 'Staff System'})

export const load = createActionGroup({
    source: 'Staff load',
    events: {
        request: emptyProps(),
        onSuccess: props<{staffs: Staff[]}>(),
    },
})

export const yearbook = createActionGroup({
    source: 'Staff yearbook',
    events: {
        request: props<{filter: any}>(),
        setLinks: props<{links: any}>(),
    },
})

export const filter = createActionGroup({
    source: 'Staff filter',
    events: {
        request: props<{filter: any}>(),
    },
})

export const show = createActionGroup({
    source: 'Staff Show',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{staff: Staff}>(),
    },
})

export const add = createActionGroup({
    source: 'Staff Update',
    events: {
        request: props<{staff: Staff}>(),
        onSuccess: props<{staff: Staff}>(),
    },
})

export const update = createActionGroup({
    source: 'Staff Add',
    events: {
        request: props<{staff: Staff}>(),
        onSuccess: props<{staff: Staff}>(),
    },
})

export const remove = createActionGroup({
    source: 'Staff Delete',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{id: string}>(),
    },
})
