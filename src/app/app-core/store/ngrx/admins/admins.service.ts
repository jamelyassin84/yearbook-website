import {Injectable} from '@angular/core'
import {Loader} from '@digital_brand_work/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/enums/loading-type.enum'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {AdminApi} from 'app/app-core/http/api/admin.api'
import {Admin} from 'app/app-core/models/admin.model'
import {Observable, map} from 'rxjs'

@Injectable({providedIn: 'root'})
export class AdminService {
    constructor(
        private _adminApi: AdminApi,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @Loader({
        state: 'ADMIN',
        loading: LoadingTypeEnum.GET,
    })
    get(): Observable<Admin[]> {
        return this._adminApi.get()
    }

    @Loader({
        state: 'ADMIN',
        loading: LoadingTypeEnum.FIND_ONE,
    })
    show(id: string): Observable<Admin> {
        return this._adminApi.findOne(id)
    }

    @Loader({
        state: 'ADMIN',
        loading: LoadingTypeEnum.CREATE,
    })
    add(admin: Admin): Observable<Admin> {
        return this._adminApi.post(admin)
    }

    @Loader({
        state: 'ADMIN',
        loading: LoadingTypeEnum.UPDATE,
    })
    update(admin: Admin): Observable<Admin> {
        return this._adminApi.update(admin.id, admin)
    }

    @Loader({
        state: 'ADMIN',
        loading: LoadingTypeEnum.REMOVE,
    })
    remove(id: string): Observable<string> {
        return this._adminApi.remove(id).pipe(map(() => id))
    }
}
