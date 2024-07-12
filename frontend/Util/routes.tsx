import {
    createBrowserRouter,
    RouteObject
} from "react-router-dom";
import {protectRoutes} from "@hilla/react-auth";
import {MainLayout} from "Frontend/Layouts/MainLayout";
import {LoginView} from "Frontend/views/Login/LoginView";
import NotFoundView from "Frontend/views/NotFound/NotFoundView";

import {lazy} from "react";

const UserView = lazy(async ()=>import("Frontend/views/Users/UserView"));
const EditProfileView = lazy(async ()=>import("Frontend/views/EditProfile/EditProfileView"));

export const routes: readonly RouteObject[] = protectRoutes([
  {
      element: <MainLayout/>,
      handle:{title:"demo-hilla",requiresLogin:true},
      children:[
          {path:"/dashboard", element:<div></div>, handle:{title:"Dashboard", requiresLogin:true}},
          {path:"/reports",element:<div></div>, handle:{title:"Reports", requiresLogin: true}},
          {path:"/charts",element:<div></div>,handle:{title:"Charts", requiresLogin: true, rolesAllowed:["ADMINISTRADOR"]}},
          {path:"/edit-profile",element:<EditProfileView/>,handle:{title:"Edit Profile", requiresLogin: true}},
          {path:"/users",element:<UserView/>,handle:{title:"Create User", requiresLogin: true, rolesAllowed:["ADMINISTRADOR","ADMINISTRADOR PAIS"]}}
      ],
      errorElement:<NotFoundView/>
  },
    {
        path:"/login",
        element:<LoginView/>,
        handle:{title: "Login", requiresLogin: false},
        errorElement:<NotFoundView/>
    },
]);

export const router = createBrowserRouter([...routes], {basename: new URL(document.baseURI).pathname });
