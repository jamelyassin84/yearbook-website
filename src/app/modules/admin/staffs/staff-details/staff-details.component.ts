import {Component} from '@angular/core'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {ActivatedRoute} from '@angular/router'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {
    staffDetails,
    staffLoaders,
} from 'app/app-core/store/ngrx/staffs/staffs.selectors'
import {map} from 'rxjs'

@Component({
    selector: 'staff-details',
    templateUrl: './staff-details.component.html',
    animations: [...dbwAnimations],
})
export class StaffDetailsComponent {
    constructor(
        private _store: Store<AppState>,
        private _route: ActivatedRoute,
    ) {
        this._route.paramMap.pipe(takeUntilDestroyed()).subscribe((param) => {
            this._store.dispatch(
                StoreAction.STAFFS.show.request({id: param.get('id')}),
            )
        })
    }

    readonly schoolEvent$ = this._store.select(staffDetails)

    readonly loader$ = this._store
        .select(staffLoaders)
        .pipe(map((loader) => loader.findOneLoader))
}
