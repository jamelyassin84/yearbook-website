import {Store} from '@ngrx/store'
import {Injectable} from '@angular/core'
import {Loader} from '@digital_brand_work/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/enums/loading-type.enum'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {InformationApi} from 'app/app-core/http/api/information.api'
import {StudentApi, StudentYearbookApi} from 'app/app-core/http/api/student.api'
import {Student} from 'app/app-core/models/student.model'
import {Observable, map, switchMap, take, throwError} from 'rxjs'
import {AppState} from '../../core/app.state'
import {studentPageLinks} from './students.selectors'
import {PHPPaginatedResponse} from '@digital_brand_work/models/core.model'
import {updateUrlSegment} from '@digital_brand_work/helpers/update-url-segment'

@Injectable({providedIn: 'root'})
export class StudentService {
    constructor(
        private _store: Store<AppState>,
        private _studentApi: StudentApi,
        private _studentYearbookApi: StudentYearbookApi,
        private _informationApi: InformationApi,

        private _storeLoaderService: StoreLoaderService,
    ) {}

    readonly pageLinks$ = this._store.select(studentPageLinks)

    @Loader({
        state: 'STUDENTS',
        loading: LoadingTypeEnum.GET,
    })
    get(): Observable<Student[]> {
        return this._studentApi.get()
    }

    @Loader({
        state: 'STUDENTS',
        loading: LoadingTypeEnum.GET,
    })
    yearbook(filter: any): Observable<PHPPaginatedResponse<Student>> {
        return this.pageLinks$.pipe(
            take(1),
            switchMap((pageLinks) => {
                const payload = {...filter}
                const page =
                    filter.page === 'next'
                        ? pageLinks?.find((link) => link.active)?.url
                        : '1'
                const queryParams = new URLSearchParams(payload)

                if (
                    queryParams.has('page') &&
                    queryParams.get('page') === 'undefined'
                ) {
                    queryParams.delete('page')
                }

                let url = `?page=${page}`
                if (queryParams.toString()) {
                    url += `&${queryParams.toString()}`
                }

                return this._studentYearbookApi.custom(url)
            }),
        ) as Observable<PHPPaginatedResponse<Student>>
    }

    @Loader({
        state: 'STAFFS',
        loading: LoadingTypeEnum.GET,
    })
    filter(filter: any): Observable<Student[]> {
        return this._studentApi.custom(`?${new URLSearchParams(filter)}`)
    }

    @Loader({
        state: 'STUDENTS',
        loading: LoadingTypeEnum.FIND_ONE,
    })
    show(id: string): Observable<Student> {
        return this._studentApi.findOne(id)
    }

    @Loader({
        state: 'STUDENTS',
        loading: LoadingTypeEnum.CREATE,
    })
    add(student: Student): Observable<Student> {
        return this._informationApi.post(student)
    }

    @Loader({
        state: 'STUDENTS',
        loading: LoadingTypeEnum.UPDATE,
    })
    update(student: Student): Observable<Student> {
        return this._informationApi.update(student.id, student)
    }

    @Loader({
        state: 'STUDENTS',
        loading: LoadingTypeEnum.REMOVE,
    })
    remove(id: string): Observable<string> {
        return this._studentApi.remove(id).pipe(map(() => id))
    }
}
