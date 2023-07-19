import {Injectable} from '@angular/core'
import {Loader} from '@digital_brand_work/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/enums/loading-type.enum'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {YearbookApi} from 'app/app-core/http/api/yearbook.api'
import {Yearbook} from 'app/app-core/models/yearbook.model'
import {Observable, map} from 'rxjs'

@Injectable({providedIn: 'root'})
export class YearbookService {
    constructor(
        private _yearbookApi: YearbookApi,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @Loader({
        state: 'YEARBOOK',
        loading: LoadingTypeEnum.GET,
    })
    get(year_book_id: string): Observable<Yearbook> {
        return this._yearbookApi.custom(`?year_book_id=${year_book_id}`)
    }
}
