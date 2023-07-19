import {BehaviorSubject} from 'rxjs'
import {Modal} from '@digital_brand_work/services/modal.service'
import {Admin} from 'app/app-core/models/admin.model'
import {Injectable} from '@angular/core'

@Injectable({providedIn: 'root'})
export class ManageAdminModal extends Modal {
    admin$ = new BehaviorSubject<Admin>(null)
}
