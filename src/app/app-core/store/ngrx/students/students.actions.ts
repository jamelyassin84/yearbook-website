import {SystemActions} from '@digital_brand_work/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {Student} from 'app/app-core/models/student.model'

export const SYSTEM = SystemActions({name: 'Student System'})

export const load = createActionGroup({
    source: 'Student load',
    events: {
        request: emptyProps(),
        onSuccess: props<{students: Student[]}>(),
    },
})

export const yearbook = createActionGroup({
    source: 'Student yearbook',
    events: {
        request: props<{filter: any}>(),
        setLinks: props<{links: any}>(),
    },
})

export const filter = createActionGroup({
    source: 'Student filter',
    events: {
        request: props<{filter: any}>(),
    },
})

export const show = createActionGroup({
    source: 'Student Show',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{student: Student}>(),
    },
})

export const add = createActionGroup({
    source: 'Student Update',
    events: {
        request: props<{student: Student}>(),
        onSuccess: props<{student: Student}>(),
    },
})

export const update = createActionGroup({
    source: 'Student Add',
    events: {
        request: props<{student: Student}>(),
        onSuccess: props<{student: Student}>(),
    },
})

export const remove = createActionGroup({
    source: 'Student Delete',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{id: string}>(),
    },
})
