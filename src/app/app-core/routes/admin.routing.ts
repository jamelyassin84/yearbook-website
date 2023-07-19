export const ADMIN_ROUTING = [
    {
        path: 'yearbook',
        loadChildren: () =>
            import('app/modules/admin/yearbook/yearbook.module').then(
                (module) => module.YearbookModule,
            ),
    },

    {
        path: 'school-years',
        loadChildren: () =>
            import('app/modules/admin/school-years/school-years.module').then(
                (module) => module.SchoolYearsModule,
            ),
    },

    {
        path: 'departments',
        loadChildren: () =>
            import('app/modules/admin/departments/departments.module').then(
                (module) => module.DepartmentsModule,
            ),
    },

    {
        path: 'courses',
        loadChildren: () =>
            import('app/modules/admin/courses/courses.module').then(
                (module) => module.CoursesModule,
            ),
    },

    {
        path: 'sections',
        loadChildren: () =>
            import('app/modules/admin/sections/sections.module').then(
                (module) => module.SectionsModule,
            ),
    },

    {
        path: 'students',
        loadChildren: () =>
            import('app/modules/admin/students/students.module').then(
                (module) => module.StudentsModule,
            ),
    },

    {
        path: 'faculties',
        loadChildren: () =>
            import('app/modules/admin/faculties/faculties.module').then(
                (module) => module.FacultiesModule,
            ),
    },

    {
        path: 'staffs',
        loadChildren: () =>
            import('app/modules/admin/staffs/staffs.module').then(
                (module) => module.StaffsModule,
            ),
    },

    {
        path: 'school-admins',
        loadChildren: () =>
            import('app/modules/admin/school-admins/school-admins.module').then(
                (module) => module.SchoolAdminsModule,
            ),
    },

    {
        path: 'events',
        loadChildren: () =>
            import('app/modules/admin/events/events.module').then(
                (module) => module.EventsModule,
            ),
    },
]
