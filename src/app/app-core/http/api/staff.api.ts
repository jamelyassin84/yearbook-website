import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {API} from '@digital_brand_work/api/base.api'

@Injectable({providedIn: 'root'})
export class StaffApi extends API {
    constructor(private _http: HttpClient) {
        super(_http, 'staffs')
    }
}

@Injectable({providedIn: 'root'})
export class StaffYearbookApi extends API {
    constructor(private _http: HttpClient) {
        super(_http, 'staffs-get-year-book')
    }
}
