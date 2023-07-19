import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {API} from '@digital_brand_work/api/base.api'

@Injectable({providedIn: 'root'})
export class SchoolAdminApi extends API {
    constructor(private _http: HttpClient) {
        super(_http, 'school-admins')
    }
}

@Injectable({providedIn: 'root'})
export class SchoolAdminYearbookApi extends API {
    constructor(private _http: HttpClient) {
        super(_http, 'school-admins-get-year-book')
    }
}
