import {BehaviorSubject} from 'rxjs'
import {Modal} from '@digital_brand_work/services/modal.service'
import {Injectable} from '@angular/core'
import {Course} from 'app/app-core/models/course.model'

@Injectable({providedIn: 'root'})
export class ManageCourseModal extends Modal {
    course$ = new BehaviorSubject<Course>(null)
}
