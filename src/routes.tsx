import { Icon } from "@chakra-ui/react";
import { MdHome, MdLogin } from "react-icons/md";

import { FaClipboardList, FaUser } from "react-icons/fa";
// import { IoMdSettings } from "react-icons/io";
import { BiMoneyWithdraw, BiSolidBarChartAlt2 } from "react-icons/bi";
// layout imports
import DashboardLayout from "./layouts/dashboard";

// auth imports
import AuthGuard from "./guards/auth.guard";

// Admin Imports

// Auth Imports
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// lazy imports
import HomeDashLazy from "./lazyexports/HomeDashboard";
import BalanceDashLazy from "./lazyexports/BalanceDashboard";
import ClientsDashLazy from "./lazyexports/ClientsDashboard";
// import ProfileDashLazy from "./lazyexports/ProfileDashboard";
import LoginDashLazy from "./lazyexports/LoginDashboard";
import PublicGuard from "./guards/public.guard";
import AuthLayout from "./layouts/auth";
import NewClient from "./views/admin/clients/components/newClient";
import SubscriptionsDashLazy from "./lazyexports/SubscriptionsDashboard";
import NewSubscriptionLazy from "./lazyexports/NewSubscriptionDashboard";

// import ConfigDashLazy from "./lazyexports/ConfigDashboard";
import EditClient from "./lazyexports/EditClient";
import SubscriptionEditionLazy from "./lazyexports/SubscriptionEditionDashboard";
import CheckinDashLazy from "./lazyexports/CheckinDashboard";
import ExpenseDashLazy from "./lazyexports/ExpenseDashboard";

export const routes: RoutesType[] = [
  {
    name: "Inicio",
    layout: "/dashboard",
    path: "home",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: lazy(() => import("./views/admin/home")),
    isIndex: true,
  },

  {
    name: "Clientes",
    layout: "/dashboard",
    icon: <Icon as={FaUser} width="20px" height="20px" color="inherit" />,
    path: "clients",
    component: lazy(() => import("./views/admin/clients")),
  },

  {
    name: "Suscripciones",
    layout: "/dashboard",
    icon: (
      <Icon as={FaClipboardList} width="20px" height="20px" color="inherit" />
    ),
    path: "subscriptions",
    component: lazy(() => import("./views/admin/subscriptions")),
  },
  {
    name: "Asistencia",
    layout: "/dashboard",
    icon: <Icon as={MdLogin} width="20px" height="20px" color="inherit" />,
    path: "checkin",
    component: lazy(() => import("./views/admin/checkin")),
  },
  {
    name: "Egresos/Gastos",
    layout: "/dashboard",
    icon: (
      <Icon as={BiMoneyWithdraw} width="20px" height="20px" color="inherit" />
    ),
    path: "expenses",
    component: lazy(() => import("./views/admin/expense")),
  },

  {
    name: "Balances",
    layout: "/dashboard",
    path: "balance",
    icon: (
      <Icon
        as={BiSolidBarChartAlt2}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: lazy(() => import("./views/admin/marketplace")),
    secondary: true,
  },
  // {
  //   name: "Perfil",
  //   layout: "/dashboard",
  //   path: "profile",
  //   icon: <Icon as={IoMdSettings} width="20px" height="20px" color="inherit" />,
  //   component: lazy(() => import("./views/admin/profile")),
  // },
  // {
  //   name: "Configuraciónes",
  //   layout: "/dashboard",
  //   path: "config",
  //   icon: <Icon as={IoMdSettings} width="20px" height="20px" color="inherit" />,
  //   component: lazy(() => import("./views/admin/configuraciones")),
  // },

  // {
  //   name: "Ingresar",
  //   layout: "/dashboard",
  //   path: "login",
  //   icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  //   component: SignInCentered,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: RTL,
  // },
];

export const renderRoutes = () => {
  return (
    <Suspense fallback={<div>...Cargando vista</div>}>
      <Routes>
        <Route path="/" element={<Navigate to={"/dashboard"} />} />
        <Route element={<AuthGuard />}>
          <Route
            key={"dashKey"}
            path="/dashboard"
            element={<DashboardLayout />}
          >
            <Route index element={<HomeDashLazy />} />
            <Route path="balance" element={<BalanceDashLazy />} />
            <Route path="clients" element={<ClientsDashLazy />} />
            <Route path="clients/new" element={<NewClient />} />
            <Route path="clients/:clientId" element={<EditClient />} />
            <Route path="subscriptions" element={<SubscriptionsDashLazy />} />
            <Route
              path="subscriptions/client/:clientId"
              element={<NewSubscriptionLazy />}
            />
            <Route
              path="subscriptions/edition/:subscriptionId"
              element={<SubscriptionEditionLazy />}
            />
            <Route path="expenses" element={<ExpenseDashLazy />} />
            <Route path="checkin" element={<CheckinDashLazy />} />
            {/* <Route path="profile" element={<ProfileDashLazy />} />
            <Route path="config" element={<ConfigDashLazy />} /> */}
            {/*
            <Route path="users" element={<UsersDashboard />} />
            {/*
            <Route path="listUsers" element={<ListUsersDashboard />} />
            <Route
              path="listJobPosition"
              element={<ListJobPositionDashboard />}
            />
            <Route path="profile" element={<ProfileDashboard />} />
            <Route path="request" element={<RequestDashboard />} />
            <Route path="jobPosition" element={<JobPositionDashboard />} />
            <Route path="request/new" element={<NewRequestDashboard />} />
            <Route path="listUsers/newUser" element={<NewUserDashboard />} />
            <Route
              path="listUsers/editUser/:userId"
              element={<EditUserDashboard />}
            />
            <Route
              path="listUsers/rolesJobPosition/:jobPositionId"
              element={<RolesJobPositionDashboard />}
            />
            <Route
              path="listUsers/inactivateUser/:userId"
              element={<InactivateUserDashboard />}
            />
            <Route
              path="request/detail/:requestId"
              element={<DetailRequestDashboard />}
            />
            <Route
              path="request/detailEditReq/:requestId"
              element={<DetailRequestEditDashboard />}
            />
            <Route
              path="request/detailView/:requestId"
              element={<DetailViewDashboard />}
            />
            <Route
              path="request/detailEditReqVaca/:requestId"
              element={<DetailRequestEditVacaDashboard />}
            />

            <Route
              path="asingvacation/:idUser"
              element={<AsingVacationDashboard />}
            />
            <Route path="assinmentLaw" element={<AssingmentLawDashboard />} />
          */}
          </Route>
        </Route>

        <Route element={<PublicGuard />}>
          <Route key={"authKey"} path="/login" element={<AuthLayout />}>
            <Route index element={<LoginDashLazy />} />
            {/*
            <Route path="register" element={<RegisterAuthDashboard />} />
            <Route path="forgotPassword" element={<ForgotAuthDashboard />} />
            <Route path="resetPassword" element={<ResetPasswordDashboard />} /> */}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
