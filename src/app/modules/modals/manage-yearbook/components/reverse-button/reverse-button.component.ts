import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
    selector: 'reverse-button',
    templateUrl: './reverse-button.component.html',
})
export class ReverseButtonComponent {
    @Output()
    onReverse = new EventEmitter()

    @Input({required: true})
    reversed: boolean
}
