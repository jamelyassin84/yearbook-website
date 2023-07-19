import {BehaviorSubject} from 'rxjs'
import {Modal} from '@digital_brand_work/services/modal.service'
import {Injectable} from '@angular/core'
import {Faculty} from 'app/app-core/models/faculty.model'

@Injectable({providedIn: 'root'})
export class ManageFacultyModal extends Modal {
    faculty$ = new BehaviorSubject<Faculty>(null)
}
