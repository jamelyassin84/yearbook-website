import {NgModule} from '@angular/core'
import {CommonModule, NgOptimizedImage} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {RouterModule} from '@angular/router'
import {fuseModules} from './fuse-modules/fuse-modules'
import {appStateModules} from './states/app.state.module'
import {angularMaterialModules} from './angular-material/angular-material-modules'
import {globalPipes} from './pipes/global-pipes'
import {sharedPipes} from './pipes/shared-pipes'
import {globalDirectives} from './directives/global-directives'
import {sharedDirectives} from './directives/shared-directives'
import {modalComponents} from './components/modal-components'
import {popUpComponents} from './components/pop-up-components'
import {sharedComponents} from './components/shared-components'
import {ErrorInterceptor} from './interceptors/error.interceptor'
import {
    DefaultMatCalendarRangeStrategy,
    MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker'
import {NgApexchartsModule} from 'ng-apexcharts'
import {previewComponents} from './components/preview-components'
import {AppEffects} from './states/app.effects'
import {globalForms} from './components/global-forms'

const pipes = [...globalPipes, ...sharedPipes]

const directives = [...globalDirectives, ...sharedDirectives]

const components = [
    ...modalComponents,
    ...popUpComponents,
    ...sharedComponents,
    ...previewComponents,
    ...globalForms,
]

const modules = [
    RouterModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    ...AppEffects,
    ...fuseModules,
    ...appStateModules,
    ...angularMaterialModules,
    NgOptimizedImage,
]

@NgModule({
    imports: [...modules],
    declarations: [...components, ...directives, ...pipes],
    exports: [...components, ...directives, ...pipes, ...modules],
    providers: [
        {
            provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
            useClass: DefaultMatCalendarRangeStrategy,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
    ],
})
export class SharedModule {}
