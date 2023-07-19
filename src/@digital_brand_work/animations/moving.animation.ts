import {animate, style, transition, trigger} from '@angular/animations'

export const movingAnimation = trigger('movingAnimation', [
    transition('* <=> *', [
        style({opacity: 0, transform: 'translateY(50px)'}),
        animate('500ms', style({opacity: 1, transform: 'none'})),
    ]),
])
