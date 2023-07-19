import {BehaviorSubject} from 'rxjs'
import {Modal} from '@digital_brand_work/services/modal.service'
import {Injectable} from '@angular/core'
import {SchoolEvent} from 'app/app-core/models/event.model'

@Injectable({providedIn: 'root'})
export class ManageSchoolEventModal extends Modal {
    schoolEvent$ = new BehaviorSubject<SchoolEvent>(null)
}
