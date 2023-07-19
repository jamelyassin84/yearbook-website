import {BehaviorSubject} from 'rxjs'
import {Modal} from '@digital_brand_work/services/modal.service'
import {Injectable} from '@angular/core'
import {Staff} from 'app/app-core/models/staff.model'

@Injectable({providedIn: 'root'})
export class ManageStaffModal extends Modal {
    staff$ = new BehaviorSubject<Staff>(null)
}
