import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Store} from '@ngrx/store'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {
    courseDetails,
    courseLoaders,
} from 'app/app-core/store/ngrx/courses/courses.selectors'
import {map} from 'rxjs'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {AppState} from 'app/app-core/store/core/app.state'

@Component({
    selector: 'course-details',
    templateUrl: './course-details.component.html',
    animations: [...dbwAnimations],
})
export class CourseDetailsComponent {
    constructor(
        private _store: Store<AppState>,
        private _route: ActivatedRoute,
    ) {
        this._route.paramMap.pipe(takeUntilDestroyed()).subscribe((param) => {
            this._store.dispatch(
                StoreAction.COURSES.show.request({id: param.get('id')}),
            )
        })
    }

    readonly course$ = this._store.select(courseDetails)

    readonly loader$ = this._store
        .select(courseLoaders)
        .pipe(map((loader) => loader.findOneLoader))
}
