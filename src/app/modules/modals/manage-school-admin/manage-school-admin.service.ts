import {BehaviorSubject} from 'rxjs'
import {Modal} from '@digital_brand_work/services/modal.service'
import {Injectable} from '@angular/core'
import {SchoolAdmin} from 'app/app-core/models/school-admin.model'

@Injectable({providedIn: 'root'})
export class ManageSchoolAdminModal extends Modal {
    schoolAdmin$ = new BehaviorSubject<SchoolAdmin>(null)
}
