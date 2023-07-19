import {Injectable} from '@angular/core'
import {Loader} from '@digital_brand_work/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/enums/loading-type.enum'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {AuthApi} from 'app/app-core/http/api/auth.api'
import {User} from 'app/app-core/models/user.model'
import {Observable, map} from 'rxjs'

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(
        private _authApi: AuthApi,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @Loader({state: 'ADMIN', loading: LoadingTypeEnum.CREATE})
    login(user: User): Observable<User> {
        return this._authApi.postCustom(`/login`, user)
    }

    @Loader({state: 'ADMIN', loading: LoadingTypeEnum.CREATE})
    logout(): Observable<void> {
        return this._authApi.custom('/logout')
    }

    @Loader({state: 'ADMIN', loading: LoadingTypeEnum.GET})
    check(): Observable<User> {
        return this._authApi.custom('/check')
    }
}
