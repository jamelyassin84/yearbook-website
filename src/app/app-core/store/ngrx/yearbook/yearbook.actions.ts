import {SystemActions} from '@digital_brand_work/decorators/system.action.group'
import {createActionGroup, props} from '@ngrx/store'
import {Yearbook} from 'app/app-core/models/yearbook.model'

export const SYSTEM = SystemActions({name: 'Yearbook System'})

export const load = createActionGroup({
    source: 'Yearbook load',
    events: {
        request: props<{school_year_id: string}>(),
        onSuccess: props<{yearbook: Yearbook}>(),
    },
})
