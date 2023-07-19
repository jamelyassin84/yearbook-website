import {BehaviorSubject} from 'rxjs'
import {Modal} from '@digital_brand_work/services/modal.service'
import {Injectable} from '@angular/core'
import {SchoolYear} from 'app/app-core/models/school-year.model'

@Injectable({providedIn: 'root'})
export class ManageYearbookModal extends Modal {
    schoolYear$ = new BehaviorSubject<SchoolYear>(null)
}
