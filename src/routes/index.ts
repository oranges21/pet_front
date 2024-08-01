import Home from "./../pages/Home";
import Detail from "./../pages/Detail";

interface routeItem {
  title: string;
  path: string;
  component: React.FC;
  auth: boolean;
}

const routes: routeItem[] = [
  {
    title: "首页",
    path: "/",
    component: Home,
    auth: false,
  },
  {
    title: "文章详情",
    path: "/detail",
    component: Detail,
    auth: true,
  },
];

export default routes;
