import {Injectable} from '@angular/core'
import {Loader} from '@digital_brand_work/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/enums/loading-type.enum'
import {PHPPaginatedResponse} from '@digital_brand_work/models/core.model'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {InformationApi} from 'app/app-core/http/api/information.api'
import {
    SchoolAdminApi,
    SchoolAdminYearbookApi,
} from 'app/app-core/http/api/school-admin.api'
import {SchoolAdmin} from 'app/app-core/models/school-admin.model'

import {Observable, map, switchMap, take} from 'rxjs'
import {AppState} from '../../core/app.state'
import {Store} from '@ngrx/store'
import {schoolAdminPageLinks} from './school-admins.selectors'

@Injectable({providedIn: 'root'})
export class SchoolAdminService {
    constructor(
        private _store: Store<AppState>,
        private _schoolAdminApi: SchoolAdminApi,
        private _schoolAdminYearbookApi: SchoolAdminYearbookApi,
        private _informationApi: InformationApi,

        private _storeLoaderService: StoreLoaderService,
    ) {}

    readonly pageLinks$ = this._store.select(schoolAdminPageLinks)

    @Loader({
        state: 'SCHOOL_ADMINS',
        loading: LoadingTypeEnum.GET,
    })
    get(): Observable<SchoolAdmin[]> {
        return this._schoolAdminApi.get()
    }

    @Loader({
        state: 'SCHOOL_ADMINS',
        loading: LoadingTypeEnum.GET,
    })
    yearbook(filter: any): Observable<PHPPaginatedResponse<SchoolAdmin>> {
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

                return this._schoolAdminYearbookApi.custom(url)
            }),
        ) as Observable<PHPPaginatedResponse<SchoolAdmin>>
    }

    @Loader({
        state: 'SCHOOL_ADMINS',
        loading: LoadingTypeEnum.GET,
    })
    filter(filter: any): Observable<SchoolAdmin[]> {
        return this._schoolAdminApi.custom(`?${new URLSearchParams(filter)}`)
    }

    @Loader({
        state: 'SCHOOL_ADMINS',
        loading: LoadingTypeEnum.FIND_ONE,
    })
    show(id: string): Observable<SchoolAdmin> {
        return this._schoolAdminApi.findOne(id)
    }

    @Loader({
        state: 'SCHOOL_ADMINS',
        loading: LoadingTypeEnum.CREATE,
    })
    add(schoolAdmin: SchoolAdmin): Observable<SchoolAdmin> {
        return this._informationApi.post(schoolAdmin)
    }

    @Loader({
        state: 'SCHOOL_ADMINS',
        loading: LoadingTypeEnum.UPDATE,
    })
    update(schoolAdmin: SchoolAdmin): Observable<SchoolAdmin> {
        return this._informationApi.update(schoolAdmin.id, schoolAdmin)
    }

    @Loader({
        state: 'SCHOOL_ADMINS',
        loading: LoadingTypeEnum.REMOVE,
    })
    remove(id: string): Observable<string> {
        return this._schoolAdminApi.remove(id).pipe(map(() => id))
    }
}
