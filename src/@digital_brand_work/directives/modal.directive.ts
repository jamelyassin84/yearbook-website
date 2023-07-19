import {Directive, ElementRef, HostListener} from '@angular/core'

@Directive({
    selector: '[modal]',
})
export class ModalDirective {
    constructor(private elementRef: ElementRef) {}

    @HostListener('click', ['$event'])
    onClick(event: Event): void {
        event.stopPropagation()
    }

    ngOnInit(): void {
        this.applyStylesAndClasses()
    }

    private applyStylesAndClasses(): void {
        const element = this.elementRef.nativeElement as HTMLElement

        element.classList.add('fixed', 'flex', 'w-screen', 'h-screen')

        element.style.zIndex = '999'
        element.style.background = 'rgba(22, 30, 41, 0.9)'
    }
}
