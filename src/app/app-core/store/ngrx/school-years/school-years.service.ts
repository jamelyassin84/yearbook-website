import {Injectable} from '@angular/core'
import {Loader} from '@digital_brand_work/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/enums/loading-type.enum'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {SchoolYearApi} from 'app/app-core/http/api/school-year.api'
import {SchoolYear} from 'app/app-core/models/school-year.model'

import {Observable, map} from 'rxjs'

@Injectable({providedIn: 'root'})
export class SchoolYearService {
    constructor(
        private _schoolYearApi: SchoolYearApi,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @Loader({
        state: 'SCHOOL_YEARS',
        loading: LoadingTypeEnum.GET,
    })
    get(): Observable<SchoolYear[]> {
        return this._schoolYearApi.get()
    }

    @Loader({
        state: 'SCHOOL_YEARS',
        loading: LoadingTypeEnum.FIND_ONE,
    })
    show(id: string): Observable<SchoolYear> {
        return this._schoolYearApi.findOne(id)
    }

    @Loader({
        state: 'SCHOOL_YEARS',
        loading: LoadingTypeEnum.CREATE,
    })
    add(schoolYear: SchoolYear): Observable<SchoolYear> {
        return this._schoolYearApi.post(schoolYear)
    }

    @Loader({
        state: 'SCHOOL_YEARS',
        loading: LoadingTypeEnum.UPDATE,
    })
    update(schoolYear: SchoolYear): Observable<SchoolYear> {
        return this._schoolYearApi.update(schoolYear.id, schoolYear)
    }

    @Loader({
        state: 'SCHOOL_YEARS',
        loading: LoadingTypeEnum.REMOVE,
    })
    remove(id: string): Observable<SchoolYear> {
        return this._schoolYearApi.remove(id)
    }
}
