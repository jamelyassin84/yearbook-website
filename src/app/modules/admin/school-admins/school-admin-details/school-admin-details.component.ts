import {Store} from '@ngrx/store'
import {Component} from '@angular/core'
import {AppState} from 'app/app-core/store/core/app.state'
import {ActivatedRoute} from '@angular/router'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {
    schoolAdminDetails,
    schoolAdminLoaders,
} from 'app/app-core/store/ngrx/school-admins/school-admins.selectors'
import {map} from 'rxjs'

@Component({
    selector: 'school-admin-details',
    templateUrl: './school-admin-details.component.html',
})
export class SchoolAdminDetailsComponent {
    constructor(
        private _store: Store<AppState>,
        private _route: ActivatedRoute,
    ) {
        this._route.paramMap.pipe(takeUntilDestroyed()).subscribe((param) => {
            this._store.dispatch(
                StoreAction.SCHOOL_ADMINS.show.request({id: param.get('id')}),
            )
        })
    }

    readonly schoolEvent$ = this._store.select(schoolAdminDetails)

    readonly loader$ = this._store
        .select(schoolAdminLoaders)
        .pipe(map((loader) => loader.findOneLoader))
}
