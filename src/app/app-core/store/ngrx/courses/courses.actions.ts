import {SystemActions} from '@digital_brand_work/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {Course} from 'app/app-core/models/course.model'

export const SYSTEM = SystemActions({name: 'Course System'})

export const load = createActionGroup({
    source: 'Course load',
    events: {
        request: emptyProps(),
        onSuccess: props<{courses: Course[]}>(),
    },
})

export const filter = createActionGroup({
    source: 'Course filter',
    events: {
        request: props<{filter: any}>(),
    },
})

export const show = createActionGroup({
    source: 'Course Show',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{course: Course}>(),
    },
})

export const add = createActionGroup({
    source: 'Course Update',
    events: {
        request: props<{course: Course}>(),
        onSuccess: props<{course: Course}>(),
    },
})

export const update = createActionGroup({
    source: 'Course Add',
    events: {
        request: props<{course: Course}>(),
        onSuccess: props<{course: Course}>(),
    },
})

export const remove = createActionGroup({
    source: 'Course Delete',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{id: string}>(),
    },
})
