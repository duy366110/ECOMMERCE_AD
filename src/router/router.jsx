import { lazy, Suspense } from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// MAIN
const DashboardComponent = lazy(() => import("../components/pages/dashboard/Dashboard-Component"));
const DashboardMainComponent = lazy(() => import("../components/pages/dashboard/dashboard-main/Dashboard-Main-Component"));

// USER
const DashboardUserComponent = lazy(() => import("../components/pages/dashboard/dashboard-user/Dashboard-User-Component"));
const DashboardUserAddComponent = lazy(() => import("../components/pages/dashboard/dashboard-user/Dashboard-User-Add-Component/Dashboard-User-Add-Component"));
const DashboardUserEditComponent = lazy(() => import("../components/pages/dashboard/dashboard-user/Dashboard-User-Edit-Component/Dashboard-User-Edit-Component"));

// ROLE
const DashboardRolesComponent = lazy(() => import("../components/pages/dashboard/dashboard-roles/Dashboard-Roles-Component"));
const DashboardAddRoleComponent = lazy(() => import("../components/pages/dashboard/dashboard-roles/Dashboard-Add-Role-Component/Dashboard-Add-Role-Component"));
const DashboardEditRoleComponent = lazy(() => import("../components/pages/dashboard/dashboard-roles/Dashboard-Edit-Role-Component/Dashboard-Edit-Role-Component"));


// CATEGORY
const DashboardCategoryComponent = lazy(() => import("../components/pages/dashboard/dashboard-category/Dashboard-Category-Component"));
const DashboardAddCategoryComponent = lazy(() => import("../components/pages/dashboard/dashboard-category/Dashboard-Add-Category-Component/Dashboard-Add-Category-Component"));
const DashboardEditCategoryComponent = lazy(() => import("../components/pages/dashboard/dashboard-category/Dashboard-Edit-Category-Component/Dashboard-Edit-Category-Component"));

// FEATURED
const DashboardFeaturedComponent = lazy(() => import("../components/pages/dashboard/dashboard-featured/Dashboard-Featured-Component"));
const DashboardAddFeaturedComponent = lazy(() => import("../components/pages/dashboard/dashboard-featured/Dashboard-Add-Featured-Component/Dashboard-Add-Featured-Component"));

// PRODUCT
const DashboardProductComponent = lazy(() => import("../components/pages/dashboard/dashboard-product/Dashboard-Product-Component"));
const DashboardAddProductComponent = lazy(() => import("../components/pages/dashboard/dashboard-product/Dashboard-Add-Product-Component/Dashboard-Add-Product-Component"));
const DashboardEditProductComponent = lazy(() => import("../components/pages/dashboard/dashboard-product/Dashboard-Edit-Product-Component/Dashboard-Edit-Product-Component"));

// CUSTOMER CARE
const DashboardCustomerCareComponent = lazy(() => import("../components/pages/dashboard/dashboard-customer-care/Dashboard-Customer-Care-Component"));

// AUTHORIZATION
const AuthComponent = lazy(() => import("../components/pages/auth/Auth-Component"));
const AuthSignInComponent = lazy(() => import("../components/pages/auth/Auth-Sign-In-Component/Auth-Sign-In-Component"));


const router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        children: [
            {
                path: '',
                element: <Suspense fallback={<p>Loading...</p>}><DashboardComponent /></Suspense>,
                children: [
                    {
                        index: true,
                        loader: () => import("../components/pages/dashboard/dashboard-main/Dashboard-Main-Component").then((m) => m.loader()),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardMainComponent /></Suspense>
                    },
                    // USER
                    {
                        path: 'users',
                        loader: () => import("../components/pages/dashboard/dashboard-user/Dashboard-User-Component").then((m) => m.loader()),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardUserComponent /></Suspense>
                    },
                    {
                        path: 'new-user',
                        loader: () => import("../components/pages/dashboard/dashboard-user/Dashboard-User-Add-Component/Dashboard-User-Add-Component").then((m) => m.loader()),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardUserAddComponent /></Suspense>
                    },
                    {
                        path: 'edit-user/:user',
                        loader: ({request, params}) => import("../components/pages/dashboard/dashboard-user/Dashboard-User-Edit-Component/Dashboard-User-Edit-Component").then((m) => m.loader(request, params)),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardUserEditComponent /></Suspense>
                    },

                    // CATEGORY
                    {
                        path: "categorys",
                        loader: () => import("../components/pages/dashboard/dashboard-category/Dashboard-Category-Component").then((m) => m.loader()),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardCategoryComponent /></Suspense>
                    },
                    {
                        path: "new-category",
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardAddCategoryComponent /></Suspense>
                    },
                    {
                        path: "edit-category/:category",
                        loader: ({request, params}) => import("../components/pages/dashboard/dashboard-category/Dashboard-Edit-Category-Component/Dashboard-Edit-Category-Component").then((m) => m.loader(request, params)),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardEditCategoryComponent /></Suspense>
                    },

                    // FEATURED
                    {
                        path: "featured",
                        loader: () => import("../components/pages/dashboard/dashboard-featured/Dashboard-Featured-Component").then((m) => m.loader()),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardFeaturedComponent /></Suspense>
                    },
                    {
                        path: "new-featured",
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardAddFeaturedComponent /></Suspense>
                    },

                    // PRODUCT
                    {
                        path: 'products',
                        loader: (() => import("../components/pages/dashboard/dashboard-product/Dashboard-Product-Component").then((m) => m.loader())),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardProductComponent /></Suspense>
                    },
                    {
                        path: 'new-product',
                        loader: (() => import("../components/pages/dashboard/dashboard-product/Dashboard-Add-Product-Component/Dashboard-Add-Product-Component").then((m) => m.loader())),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardAddProductComponent /></Suspense>
                    },
                    {
                        path: 'edit-product/:product',
                        loader: (({request, params}) => import("../components/pages/dashboard/dashboard-product/Dashboard-Edit-Product-Component/Dashboard-Edit-Product-Component").then((m) => m.loader(request, params))),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardEditProductComponent /></Suspense>
                    },
                    
                    // ROLE
                    {
                        path: 'roles',
                        loader: ({request, params}) => import("../components/pages/dashboard/dashboard-roles/Dashboard-Roles-Component").then((m) => m.loader(request, params)),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardRolesComponent /></Suspense>
                    },
                    {
                        path: 'new-role',
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardAddRoleComponent /></Suspense>
                    },
                    {
                        path: 'edit-role/:role',
                        loader: ({request, params}) => import("../components/pages/dashboard/dashboard-roles/Dashboard-Edit-Role-Component/Dashboard-Edit-Role-Component").then((m) => m.loader(request, params)),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardEditRoleComponent /></Suspense>
                    },
                    // CUSTOMER CASRE
                    {
                        path: 'customer-care',
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardCustomerCareComponent /></Suspense>
                    }
                ]
            }
        ]
    },
    {
        path: "auth",
        element: <Suspense fallback={<p>Loading...</p>}><AuthComponent /></Suspense>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<p>Loading...</p>}><AuthSignInComponent /></Suspense>
            }
        ]
    }
])

export default router;