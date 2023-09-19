import { useNavigate, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { Menu } from "antd";
import { menusRouters } from "@/router/index.jsx";

function getItem(list) {
  if (!list) return;
  return list.map((item) => ({
    ...item,
    key: item.path,
    icon: item.icon,
    label: item.name,
    children: getItem(item.children),
  }));
}
// 获取selectedKeys在menusRouters的父级
function getParentKey(key, menusRouters) {
  let parentKey;
  for (let i = 0; i < menusRouters.length; i++) {
    const item = menusRouters[i];
    if (item.children && item.children.length) {
      if (item.children.some((child) => child.path === key)) {
        parentKey = item.path;
      } else if (getParentKey(key, item.children)) {
        parentKey = getParentKey(key, item.children);
      }
    }
  }
  return parentKey;
}
const Menus = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = useMemo(() => getItem(menusRouters), []);
  const itemClick = (item) => {
    navigate(item.key);
  };

  return (
    <Menu
      selectedKeys={[location.pathname]}
      defaultOpenKeys={[getParentKey(location.pathname, menusRouters)]}
      onClick={itemClick}
      mode="inline"
      items={items}
    />
  );
};
export default Menus;
