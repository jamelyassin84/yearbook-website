import {SystemActions} from '@digital_brand_work/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {Admin} from 'app/app-core/models/admin.model'

export const SYSTEM = SystemActions({name: 'Admin System'})

export const load = createActionGroup({
    source: 'Admin load',
    events: {
        request: emptyProps(),
        onSuccess: props<{admins: Admin[]}>(),
    },
})

export const show = createActionGroup({
    source: 'Admin Show',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{admin: Admin}>(),
    },
})

export const add = createActionGroup({
    source: 'Admin Update',
    events: {
        request: props<{admin: Admin}>(),
        onSuccess: props<{admin: Admin}>(),
    },
})

export const update = createActionGroup({
    source: 'Admin Add',
    events: {
        request: props<{admin: Admin}>(),
        onSuccess: props<{admin: Admin}>(),
    },
})

export const remove = createActionGroup({
    source: 'Admin Delete',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{id: string}>(),
    },
})
