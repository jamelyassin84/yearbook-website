import {Component} from '@angular/core'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {ActivatedRoute} from '@angular/router'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {
    departmentDetails,
    departmentLoaders,
} from 'app/app-core/store/ngrx/departments/departments.selectors'
import {map} from 'rxjs'

@Component({
    selector: 'department-details',
    templateUrl: './department-details.component.html',
    animations: [...dbwAnimations],
})
export class DepartmentDetailsComponent {
    constructor(private _store: Store, private _route: ActivatedRoute) {
        this._route.paramMap.pipe(takeUntilDestroyed()).subscribe((param) => {
            this._store.dispatch(
                StoreAction.DEPARTMENTS.show.request({id: param.get('id')}),
            )
        })
    }

    readonly course$ = this._store.select(departmentDetails)

    readonly loader$ = this._store
        .select(departmentLoaders)
        .pipe(map((loader) => loader.findOneLoader))
}
