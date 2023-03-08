import Vue from 'vue'
import { Button, Form, FormItem, Input, Breadcrumb, BreadcrumbItem, Dropdown, DropdownMenu, DropdownItem, Message, Dialog
, Menu,  MenuItem, Submenu, MenuItemGroup, Scrollbar , Tooltip} from 'element-ui';

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dialog)

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Scrollbar)
Vue.use(Tooltip)





Vue.prototype.$message = Message;
