import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'
import {AppModule} from 'app/app.module'

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err))

function toggleScrollbars(hide) {
    const elements = [document.body]

    elements.forEach((element) => {
        if (hide) {
            element.classList.add('no-scroll')
        } else {
            element.classList.remove('no-scroll')
        }
    })
}

window.addEventListener('beforeprint', () => {
    toggleScrollbars(true)
})

window.addEventListener('afterprint', () => {
    toggleScrollbars(false)
})
