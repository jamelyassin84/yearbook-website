import {SystemActions} from '@digital_brand_work/decorators/system.action.group'
import {createAction, createActionGroup, emptyProps, props} from '@ngrx/store'
import {User} from 'app/app-core/models/user.model'

export const SYSTEM = SystemActions({name: 'User System'})

export const login = createActionGroup({
    source: 'User login',
    events: {
        request: props<{user: User}>(),
        onSuccess: props<{user: User}>(),
    },
})

export const check = createActionGroup({
    source: 'User logout',
    events: {
        request: emptyProps(),
    },
})

export const logout = createActionGroup({
    source: 'User logout',
    events: {
        request: emptyProps(),
    },
})
