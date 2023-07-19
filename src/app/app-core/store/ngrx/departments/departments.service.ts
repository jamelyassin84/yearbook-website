import {Injectable} from '@angular/core'
import {Loader} from '@digital_brand_work/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/enums/loading-type.enum'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {DepartmentApi} from 'app/app-core/http/api/department.api'
import {Department} from 'app/app-core/models/department.model'
import {Observable, map} from 'rxjs'

@Injectable({providedIn: 'root'})
export class DepartmentService {
    constructor(
        private _departmentApi: DepartmentApi,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @Loader({
        state: 'DEPARTMENTS',
        loading: LoadingTypeEnum.GET,
    })
    get(): Observable<Department[]> {
        return this._departmentApi.get()
    }

    @Loader({
        state: 'DEPARTMENTS',
        loading: LoadingTypeEnum.GET,
    })
    filter(filter: any): Observable<Department[]> {
        return this._departmentApi.custom(`?${new URLSearchParams(filter)}`)
    }

    @Loader({
        state: 'DEPARTMENTS',
        loading: LoadingTypeEnum.FIND_ONE,
    })
    show(id: string): Observable<Department> {
        return this._departmentApi.findOne(id)
    }

    @Loader({
        state: 'DEPARTMENTS',
        loading: LoadingTypeEnum.CREATE,
    })
    add(department: Department): Observable<Department> {
        return this._departmentApi.post(department)
    }

    @Loader({
        state: 'DEPARTMENTS',
        loading: LoadingTypeEnum.UPDATE,
    })
    update(department: Department): Observable<Department> {
        return this._departmentApi.update(department.id, department)
    }

    @Loader({
        state: 'DEPARTMENTS',
        loading: LoadingTypeEnum.REMOVE,
    })
    remove(id: string): Observable<string> {
        return this._departmentApi.remove(id).pipe(map(() => id))
    }
}
