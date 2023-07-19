import {BehaviorSubject} from 'rxjs'
import {Modal} from '@digital_brand_work/services/modal.service'
import {Injectable} from '@angular/core'
import {Department} from 'app/app-core/models/department.model'

@Injectable({providedIn: 'root'})
export class ManageDepartmentModal extends Modal {
    department$ = new BehaviorSubject<Department>(null)
}
