import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {API} from '@digital_brand_work/api/base.api'

@Injectable({providedIn: 'root'})
export class StudentApi extends API {
    constructor(private _http: HttpClient) {
        super(_http, 'students')
    }
}

@Injectable({providedIn: 'root'})
export class StudentYearbookApi extends API {
    constructor(private _http: HttpClient) {
        super(_http, 'students-get-year-book')
    }
}
