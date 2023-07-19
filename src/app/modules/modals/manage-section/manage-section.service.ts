import {BehaviorSubject} from 'rxjs'
import {Modal} from '@digital_brand_work/services/modal.service'
import {Injectable} from '@angular/core'
import {Section} from 'app/app-core/models/section.model'

@Injectable({providedIn: 'root'})
export class ManageSectionModal extends Modal {
    section$ = new BehaviorSubject<Section>(null)
}
