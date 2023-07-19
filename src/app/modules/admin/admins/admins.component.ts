import {Component} from '@angular/core'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {Store} from '@ngrx/store'
import {Admin} from 'app/app-core/models/admin.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {adminLoaders} from 'app/app-core/store/ngrx/admins/admins.selectors'
import {Observable, map} from 'rxjs'

@Component({
    selector: 'admins',
    templateUrl: './admins.component.html',
})
export class AdminsComponent {
    constructor(private _store: Store<AppState>) {}

    @State({selector: StateEnum.ADMIN, type: 'array'})
    readonly admins$: Observable<Admin[]>

    readonly loader$ = this._store
        .select(adminLoaders)
        .pipe(map((loader) => loader.getLoader))

    ngOnInit(): void {
        this._store.dispatch(StoreAction.ADMIN.load.request())
    }
}
