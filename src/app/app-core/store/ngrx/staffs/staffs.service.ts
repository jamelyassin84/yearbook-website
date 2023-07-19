import {Injectable} from '@angular/core'
import {Loader} from '@digital_brand_work/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/enums/loading-type.enum'
import {PHPPaginatedResponse} from '@digital_brand_work/models/core.model'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {InformationApi} from 'app/app-core/http/api/information.api'
import {StaffApi, StaffYearbookApi} from 'app/app-core/http/api/staff.api'
import {Staff} from 'app/app-core/models/staff.model'
import {Observable, map, switchMap, take} from 'rxjs'
import {AppState} from '../../core/app.state'
import {Store} from '@ngrx/store'
import {staffPageLinks} from './staffs.selectors'

@Injectable({providedIn: 'root'})
export class StaffService {
    constructor(
        private _staffApi: StaffApi,
        private _store: Store<AppState>,
        private _informationApi: InformationApi,
        private _staffYearbookApi: StaffYearbookApi,

        private _storeLoaderService: StoreLoaderService,
    ) {}

    readonly pageLinks$ = this._store.select(staffPageLinks)

    @Loader({
        state: 'STAFFS',
        loading: LoadingTypeEnum.GET,
    })
    get(): Observable<Staff[]> {
        return this._staffApi.get()
    }

    @Loader({
        state: 'STAFFS',
        loading: LoadingTypeEnum.GET,
    })
    yearbook(filter: any): Observable<PHPPaginatedResponse<Staff>> {
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

                return this._staffYearbookApi.custom(url)
            }),
        ) as Observable<PHPPaginatedResponse<Staff>>
    }

    @Loader({
        state: 'STAFFS',
        loading: LoadingTypeEnum.GET,
    })
    filter(filter: any): Observable<Staff[]> {
        return this._staffApi.custom(`?${new URLSearchParams(filter)}`)
    }

    @Loader({
        state: 'STAFFS',
        loading: LoadingTypeEnum.FIND_ONE,
    })
    show(id: string): Observable<Staff> {
        return this._staffApi.findOne(id)
    }

    @Loader({
        state: 'STAFFS',
        loading: LoadingTypeEnum.CREATE,
    })
    add(staff: Staff): Observable<Staff> {
        return this._informationApi.post(staff)
    }

    @Loader({
        state: 'STAFFS',
        loading: LoadingTypeEnum.UPDATE,
    })
    update(staff: Staff): Observable<Staff> {
        return this._informationApi.update(staff.id, staff)
    }

    @Loader({
        state: 'STAFFS',
        loading: LoadingTypeEnum.REMOVE,
    })
    remove(id: string): Observable<string> {
        return this._staffApi.remove(id).pipe(map(() => id))
    }
}
