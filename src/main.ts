import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import App from './App.vue';
import router from "./router";
import store from "./store";
import './assets/js/TweenMax/TweenMax.js';
import './assets/js/TweenMax/TweenLite.js';

import "./styles/index.scss";

import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";

const app = createApp(App);
app.use(ElementPlus, { locale });
app.use(router);
app.use(store);
app.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block: any) => {
        hljs.highlightBlock(block)
    })
})
app.mount('#app');