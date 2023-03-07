import Vue from 'vue'
import { Button, Form, FormItem, Input, Breadcrumb, BreadcrumbItem, Dropdown, DropdownMenu, DropdownItem, Message, Dialog} from 'element-ui';

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

Vue.prototype.$message = Message;
