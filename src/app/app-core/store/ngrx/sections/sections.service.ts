import {Injectable} from '@angular/core'
import {Loader} from '@digital_brand_work/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/enums/loading-type.enum'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {SectionApi} from 'app/app-core/http/api/section.api'
import {Section} from 'app/app-core/models/section.model'

import {Observable, map} from 'rxjs'

@Injectable({providedIn: 'root'})
export class SectionService {
    constructor(
        private _sectionApi: SectionApi,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @Loader({
        state: 'SECTIONS',
        loading: LoadingTypeEnum.GET,
    })
    get(): Observable<Section[]> {
        return this._sectionApi.get()
    }

    @Loader({
        state: 'SECTIONS',
        loading: LoadingTypeEnum.GET,
    })
    filter(filter: any): Observable<Section[]> {
        return this._sectionApi.custom(`?${new URLSearchParams(filter)}`)
    }

    @Loader({
        state: 'SECTIONS',
        loading: LoadingTypeEnum.FIND_ONE,
    })
    show(id: string): Observable<Section> {
        return this._sectionApi.findOne(id)
    }

    @Loader({
        state: 'SECTIONS',
        loading: LoadingTypeEnum.CREATE,
    })
    add(section: Section): Observable<Section> {
        return this._sectionApi.post(section)
    }

    @Loader({
        state: 'SECTIONS',
        loading: LoadingTypeEnum.UPDATE,
    })
    update(section: Section): Observable<Section> {
        return this._sectionApi.update(section.id, section)
    }

    @Loader({
        state: 'SECTIONS',
        loading: LoadingTypeEnum.REMOVE,
    })
    remove(id: string): Observable<string> {
        return this._sectionApi.remove(id).pipe(map(() => id))
    }
}
