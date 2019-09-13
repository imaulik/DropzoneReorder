import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { FullLayoutComponent, SimpleLayoutComponent } from './containers';

export const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                canActivate: [AuthGuard],
                loadChildren: './views/dashboard/dashboard.module#DashboardModule',
            },
            {
                path: 'users',
                canActivate: [AuthGuard],
                loadChildren: './views/users/users.module#UsersModule'
            },
            {
                path: 'vessel_details',
                canActivate: [AuthGuard],
                loadChildren: './views/vessel/vessel.module#VesselModule'
            },
            {
                path: 'email_subscribers',
                canActivate: [AuthGuard],
                loadChildren: './views/email_subscriber/email_subscribers.module#Email_subscribersModule'
            },
            {
                path: 'vessel_comments',
                canActivate: [AuthGuard],
                loadChildren: './views/vessel_comments/vessel_comments.module#Vessel_commentsModule'
            },
            {
                path: 'vessel_deposits',
                canActivate: [AuthGuard],
                loadChildren: './views/vessel_deposits/vessel_deposits.module#Vessel_depositsModule'
            },
            {
                path: 'vessel_bids',
                canActivate: [AuthGuard],
                loadChildren: './views/vessel_bids/vessel_bids.module#Vessel_bidsModule'
            },
            {
                path: 'potential_auctions',
                canActivate: [AuthGuard],
                loadChildren: './views/potntial_auction/potntial_auctions.module#Potntial_auctionsModule'
            },
            {
                path: 'home_sliders',
                canActivate: [AuthGuard],
                loadChildren: './views/home_slider/home_sliders.module#Home_slidersModule'
            },
            {
                path: 'home_testimonial',
                canActivate: [AuthGuard],
                loadChildren: './views/home_testimonial/home_testimonial.module#Home_testimonialModule'
            },
            {
                path: 'about_members',
                canActivate: [AuthGuard],
                loadChildren: './views/about_member/about_members.module#About_membersModule'
            },
            {
                path: 'latest_news',
                canActivate: [AuthGuard],
                loadChildren: './views/latest_news/latest_news.module#Latest_newsModule'
            },
            {
                path: 'contact_form',
                canActivate: [AuthGuard],
                loadChildren: './views/contact_form/contact_form.module#Contact_formModule'
            },
            {
                path: 'cms_pages',
                canActivate: [AuthGuard],
                loadChildren: './views/cms_page/cms_pages.module#CMS_pagesModule'
            },
            {
                path: 'setting',
                data: {
                    title: 'Setting'
                },
                children: [
                    {
                        path: 'permission_categorys',
                        canActivate: [AuthGuard],
                        loadChildren: './views/setting/permission_category/permission_category.module#Permission_categoryModule'
                    },
                    {
                        path: 'permissions',
                        canActivate: [AuthGuard],
                        loadChildren: './views/setting/permission/permission.module#PermissionModule'
                    },
                    {
                        path: 'roles',
                        canActivate: [AuthGuard],
                        loadChildren: './views/setting/role/role.module#RoleModule'
                    },
                ]
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: 'login',
        component: SimpleLayoutComponent,
        data: {
            title: 'Login'
        },
        children: [
            {
                path: '',
                loadChildren: './views/authentication/login/login.module#LoginModule',
            }
        ]
    },
    {
        path: 'register',
        component: SimpleLayoutComponent,
        data: {
            title: 'Register'
        },
        children: [
            {
                path: '',
                loadChildren: './views/authentication/register/register.module#RegisterModule',
            }
        ]
    },
    {
        path: 'forget_password',
        component: SimpleLayoutComponent,
        data: {
            title: 'Forget Password'
        },
        children: [
            {
                path: '',
                loadChildren: './views/authentication/forget/forget.module#ForgetModule',
            }
        ]
    },
    {
        path: 'password/reset/:token',
        component: SimpleLayoutComponent,
        data: {
            title: 'Password Reset'
        },
        children: [
            {
                path: '',
                loadChildren: './views/authentication/reset/reset.module#ResetModule',
            }
        ]
    },
    {
        path: '404',
        component: SimpleLayoutComponent,
        data: {
            title: '404'
        },
        children: [
            {
                path: '',
                loadChildren: './views/error/404.module#P404Module',
            }
        ]
    },
    {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
