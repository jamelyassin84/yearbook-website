import {FuseNavigationItem} from '@fuse/components/navigation'

export const adminNavigation: FuseNavigationItem[] = [
    {
        id: '1',
        title: 'Yearbook',
        type: 'basic',
        icon: 'mat_outline:dashboard',
        link: '/yearbook',
    },

    {
        id: '2',
        title: 'Academic Years',
        type: 'basic',
        icon: 'feather:calendar',
        link: '/school-years',
    },

    {
        id: '3',
        title: 'Departments',
        type: 'basic',
        icon: 'account_balance',
        link: '/departments',
    },

    {
        id: '4',
        title: 'Courses',
        type: 'basic',
        icon: 'account_tree',
        link: '/courses',
    },

    {
        id: '5',
        title: 'Sections',
        type: 'basic',
        icon: 'alt_route',
        link: '/sections',
    },

    {
        id: '6',
        title: 'Students',
        type: 'basic',
        icon: 'feather:user',
        link: '/students',
    },

    {
        id: '7',
        title: 'Faculties',
        type: 'basic',
        icon: 'supervised_user_circle',
        link: '/faculties',
    },

    {
        id: '8',
        title: 'Staffs',
        type: 'basic',
        icon: 'feather:users',
        link: '/staffs',
    },

    {
        id: '9',
        title: 'School Administrators',
        type: 'basic',
        icon: 'heroicons_outline:user-group',
        link: '/school-admins',
    },

    {
        id: '10',
        title: 'School Events',
        type: 'basic',
        icon: 'feather:book',
        link: '/events',
    },
]
