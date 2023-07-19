import {BehaviorSubject} from 'rxjs'
import {Modal} from '@digital_brand_work/services/modal.service'
import {Injectable} from '@angular/core'
import {Student} from 'app/app-core/models/student.model'

@Injectable({providedIn: 'root'})
export class ManageStudentModal extends Modal {
    student$ = new BehaviorSubject<Student>(null)
}
