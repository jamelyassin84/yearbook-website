import {Injectable} from '@angular/core'
import {Loader} from '@digital_brand_work/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/enums/loading-type.enum'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {CourseApi} from 'app/app-core/http/api/course.api'
import {Course} from 'app/app-core/models/course.model'
import {Observable, map} from 'rxjs'

@Injectable({providedIn: 'root'})
export class CourseService {
    constructor(
        private _courseApi: CourseApi,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @Loader({
        state: 'COURSES',
        loading: LoadingTypeEnum.GET,
    })
    get(): Observable<Course[]> {
        return this._courseApi.get()
    }

    @Loader({
        state: 'COURSES',
        loading: LoadingTypeEnum.GET,
    })
    filter(filter: any): Observable<Course[]> {
        return this._courseApi.custom(`?${new URLSearchParams(filter)}`)
    }

    @Loader({
        state: 'COURSES',
        loading: LoadingTypeEnum.FIND_ONE,
    })
    show(id: string): Observable<Course> {
        return this._courseApi.findOne(id)
    }

    @Loader({
        state: 'COURSES',
        loading: LoadingTypeEnum.CREATE,
    })
    add(course: Course): Observable<Course> {
        return this._courseApi.post(course)
    }

    @Loader({
        state: 'COURSES',
        loading: LoadingTypeEnum.UPDATE,
    })
    update(course: Course): Observable<Course> {
        return this._courseApi.update(course.id, course)
    }

    @Loader({
        state: 'COURSES',
        loading: LoadingTypeEnum.REMOVE,
    })
    remove(id: string): Observable<string> {
        return this._courseApi.remove(id).pipe(map(() => id))
    }
}
