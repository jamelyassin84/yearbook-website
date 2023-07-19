import {Injectable} from '@angular/core'
import {Loader} from '@digital_brand_work/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/enums/loading-type.enum'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {Store} from '@ngrx/store'
import {FacultyApi, FacultyYearbookApi} from 'app/app-core/http/api/faculty.api'
import {InformationApi} from 'app/app-core/http/api/information.api'
import {Faculty} from 'app/app-core/models/faculty.model'

import {Observable, map, switchMap, take} from 'rxjs'
import {AppState} from '../../core/app.state'
import {facultyPageLinks} from './faculties.selectors'
import {PHPPaginatedResponse} from '@digital_brand_work/models/core.model'

@Injectable({providedIn: 'root'})
export class FacultyService {
    constructor(
        private _store: Store<AppState>,
        private _facultyApi: FacultyApi,
        private _informationApi: InformationApi,
        private _facultyYearbookApi: FacultyYearbookApi,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    readonly pageLinks$ = this._store.select(facultyPageLinks)

    @Loader({
        state: 'FACULTIES',
        loading: LoadingTypeEnum.GET,
    })
    get(): Observable<Faculty[]> {
        return this._facultyApi.get()
    }

    @Loader({
        state: 'FACULTIES',
        loading: LoadingTypeEnum.GET,
    })
    yearbook(filter: any): Observable<PHPPaginatedResponse<Faculty>> {
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

                return this._facultyYearbookApi.custom(url)
            }),
        ) as Observable<PHPPaginatedResponse<Faculty>>
    }

    @Loader({
        state: 'FACULTIES',
        loading: LoadingTypeEnum.GET,
    })
    filter(filter: any): Observable<Faculty[]> {
        return this._facultyApi.custom(`?${new URLSearchParams(filter)}`)
    }

    @Loader({
        state: 'FACULTIES',
        loading: LoadingTypeEnum.FIND_ONE,
    })
    show(id: string): Observable<Faculty> {
        return this._facultyApi.findOne(id)
    }

    @Loader({
        state: 'FACULTIES',
        loading: LoadingTypeEnum.CREATE,
    })
    add(faculty: Faculty): Observable<Faculty> {
        return this._informationApi.post(faculty)
    }

    @Loader({
        state: 'FACULTIES',
        loading: LoadingTypeEnum.UPDATE,
    })
    update(faculty: Faculty): Observable<Faculty> {
        return this._informationApi.update(faculty.id, faculty)
    }

    @Loader({
        state: 'FACULTIES',
        loading: LoadingTypeEnum.REMOVE,
    })
    remove(id: string): Observable<string> {
        return this._facultyApi.remove(id).pipe(map(() => id))
    }
}
