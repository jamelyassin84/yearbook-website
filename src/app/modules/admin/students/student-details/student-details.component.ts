import {Component} from '@angular/core'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {ActivatedRoute} from '@angular/router'
import {Store} from '@ngrx/store'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {
    studentDetails,
    studentLoaders,
} from 'app/app-core/store/ngrx/students/students.selectors'
import {map} from 'rxjs'

@Component({
    selector: 'student-details',
    templateUrl: './student-details.component.html',
})
export class StudentDetailsComponent {
    constructor(
        private _store: Store<AppState>,
        private _route: ActivatedRoute,
    ) {
        this._route.paramMap.pipe(takeUntilDestroyed()).subscribe((param) => {
            this._store.dispatch(
                StoreAction.STUDENTS.show.request({id: param.get('id')}),
            )
        })
    }

    readonly schoolEvent$ = this._store.select(studentDetails)

    readonly loader$ = this._store
        .select(studentLoaders)
        .pipe(map((loader) => loader.findOneLoader))
}
