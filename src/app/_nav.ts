export const navigation = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-home',
        permission: ['dashboard.view'],
    },
    {
        name: 'Users',
        url: '/users',
        icon: 'icon-people',
        permission: ['user.view'],
    },
    {
        name: 'Vessel',
        icon: 'icon-people',
        permission: ['vessel.view'],
        children: [
            {
                name: 'Vessel Details',
                url: '/vessel_details',
                // icon: 'icon-people',
                permission: ['vessel.view'],
            },
            {
                name: 'Vessel Deposit',
                url: '/vessel_deposits',
                // icon: 'icon-people',
                permission: ['vessel.view'],
            },
            {
                name: 'Vessel Bids',
                url: '/vessel_bids',
                // icon: 'icon-people',
                permission: ['vessel.view'],
            },
            {
                name: 'Vessel Comments',
                url: '/vessel_comments',
                // icon: 'icon-people',
                permission: ['vessel.view'],
            },
        ]
    },
    {
        name: 'Potential Auctions',
        url: '/potential_auctions',
        icon: 'icon-people',
        permission: ['vessel.view'],
    },
    {
        name: 'Home Slider',
        url: '/home_sliders',
        icon: 'icon-people',
        permission: ['vessel.view'],
    },
    {
        name: 'Home Testimonial',
        url: '/home_testimonial',
        icon: 'icon-people',
        permission: ['vessel.view'],
    },
    {
        name: 'Latest News',
        url: '/latest_news',
        icon: 'icon-people',
        permission: ['vessel.view'],
    },
    {
        name: 'Contact Form',
        url: '/contact_form',
        icon: 'icon-people',
        permission: ['vessel.view'],
    },
    {
        name: 'CMS Pages',
        url: '/cms_pages',
        icon: 'icon-people',
        permission: ['vessel.view'],
    },
    {
        name: 'About Members',
        url: '/about_members',
        icon: 'icon-people',
        permission: ['vessel.view'],
    },
    {
        name: 'Email Subscribers',
        url: '/email_subscribers',
        icon: 'icon-people',
        permission: ['vessel.view'],
    },
    {
        name: 'Settings',
        icon: 'icon-settings',
        permission: ['role.view'],
        children: [
            {
                name: 'Permission Category',
                //                icon: 'icon-user',
                url: '/setting/permission_categorys',
                permission: ['permission_category.view'],
            },
            {
                name: 'Permission',
                //                icon: 'icon-user',
                url: '/setting/permissions',
                permission: ['permission.view'],
            },
            {
                name: 'Role',
                //                icon: 'icon-user',
                url: '/setting/roles',
                permission: ['role.view'],
            },
        ]
    },

];
