import {Component} from '@angular/core'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {ActivatedRoute} from '@angular/router'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {
    facultyDetails,
    facultyLoaders,
} from 'app/app-core/store/ngrx/faculties/faculties.selectors'
import {map} from 'rxjs'

@Component({
    selector: 'faculty-details',
    templateUrl: './faculty-details.component.html',
    animations: [...dbwAnimations],
})
export class FacultyDetailsComponent {
    constructor(
        private _store: Store<AppState>,
        private _route: ActivatedRoute,
    ) {
        this._route.paramMap.pipe(takeUntilDestroyed()).subscribe((param) => {
            this._store.dispatch(
                StoreAction.FACULTIES.show.request({id: param.get('id')}),
            )
        })
    }

    readonly schoolEvent$ = this._store.select(facultyDetails)

    readonly loader$ = this._store
        .select(facultyLoaders)
        .pipe(map((loader) => loader.findOneLoader))
}
