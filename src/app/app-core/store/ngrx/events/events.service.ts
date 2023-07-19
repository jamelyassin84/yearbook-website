import {Injectable} from '@angular/core'
import {Loader} from '@digital_brand_work/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/enums/loading-type.enum'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {EventApi} from 'app/app-core/http/api/event.api'
import {SchoolEvent} from 'app/app-core/models/event.model'
import dayjs from 'dayjs'
import {Observable, map} from 'rxjs'

@Injectable({providedIn: 'root'})
export class SchoolEventService {
    constructor(
        private _eventApi: EventApi,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @Loader({
        state: 'EVENTS',
        loading: LoadingTypeEnum.GET,
    })
    get(): Observable<SchoolEvent[]> {
        return this._eventApi.get()
    }

    @Loader({
        state: 'EVENTS',
        loading: LoadingTypeEnum.GET,
    })
    filter(filter: any): Observable<SchoolEvent[]> {
        return this._eventApi.custom(`?${new URLSearchParams(filter)}`)
    }

    @Loader({
        state: 'EVENTS',
        loading: LoadingTypeEnum.FIND_ONE,
    })
    show(id: string): Observable<SchoolEvent> {
        return this._eventApi.findOne(id)
    }

    @Loader({
        state: 'EVENTS',
        loading: LoadingTypeEnum.CREATE,
    })
    add(schoolEvent: SchoolEvent): Observable<SchoolEvent> {
        const payload = {...schoolEvent, date: dayjs(schoolEvent.date).toJSON()}
        return this._eventApi.post(payload)
    }

    @Loader({
        state: 'EVENTS',
        loading: LoadingTypeEnum.UPDATE,
    })
    update(schoolEvent: SchoolEvent): Observable<SchoolEvent> {
        return this._eventApi.update(schoolEvent.id, schoolEvent)
    }

    @Loader({
        state: 'EVENTS',
        loading: LoadingTypeEnum.REMOVE,
    })
    remove(id: string): Observable<string> {
        return this._eventApi.remove(id).pipe(map(() => id))
    }
}
