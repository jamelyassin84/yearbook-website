import {Component, EventEmitter, Input, Output} from '@angular/core'
import {PaginationLink} from '@digital_brand_work/models/core.model'

@Component({
    selector: 'page-links',
    templateUrl: './page-links.component.html',
})
export class PageLinksComponent {
    @Output()
    onNext = new EventEmitter()

    @Output()
    onBack = new EventEmitter()

    @Input({required: true})
    links: PaginationLink[]

    print() {
        window.print()
    }
}
