import { lazy, Suspense } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Loading from "./loading.jsx";
import MyIcon from "@/components/icon.jsx";

import Layout from "@/layout/index.jsx";
import ErrorPage from "./error-page.jsx";
import Login from "@/pages/Login/index.jsx";
// const Home = lazy(() => import("@/pages/Home/index.jsx"));
const MonacoEditor = lazy(() => import("@/components/editor.jsx"));
const ErGraph = lazy(() => import("@/components/graph.jsx"));
export const menusRouters = [
  {
    name: "工具",
    path: "until",
    icon: <MyIcon type="icon-gongju" />,
    children: [
      {
        path: "/monaco-editor",
        name: "editor",
        icon: <MyIcon type="icon-daimarenwuicon" />,
        element: <MonacoEditor />,
      },
      {
        path: "/er",
        name: "ER图",
        icon: <MyIcon type="icon-zuzhijiagou" />,
        element: <ErGraph />,
      },
    ],
  },
];
//获取menusRouters第二层所有的children
export const menusRoutersChildren = menusRouters
  .map((item) => item.children)
  .flat();
const suspense = (ele) => {
  return <Suspense fallback={<Loading />}>{ele}</Suspense>;
};

const routers = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {menusRoutersChildren.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={suspense(item.element)}
            />
          ))}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </HashRouter>
  );
};
export default routers;
