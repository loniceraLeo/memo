import Vue from 'vue'
import "./style/scrollbar.css";
import "./style/selection.css";
import "./style/hambugerButton.css";
import "./style/markdown.css"
import "./assets/font-awesome-4.7.0/css/font-awesome.min.css";
import "./style/loading.css";
import "./style/shadow.css";
//import hljs from "@/assets/highlight.pack.js";
//import "./style/markdown.css";

import App from './App.vue'
import router from './router'
import jptb from "./components/special/jptb.vue"

Vue.config.productionTip = false;
Vue.config.ignoredElements = [
  /-web-component/gi
];
Vue.config.silent = true;

Vue.prototype.utils = {
  getPost: function(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send();
    xhr.onload = () => {
      return xhr.responseText;
    }
  }
}

Vue.component('jptb', jptb);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

