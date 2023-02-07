import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {
    User,
    ShoppingCart,
} from "@element-plus/icons-vue";

const app = createApp(App)
app.component('User', User);
app.component('ShoppingCart', ShoppingCart);
app.use(router).use(ElementPlus).mount('#app')
