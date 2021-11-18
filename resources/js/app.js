
require('./bootstrap');

window.Vue = require('vue').default;
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
  color: '#3490dc',
  failedColor: 'red',
  thickness: '5px'
})


Vue.component('pagination', require('laravel-vue-pagination'));
Vue.component('product-component', require('./components/ProductComponent.vue').default);
Vue.component('product-left', require('./components/ProductLeft.vue').default);
Vue.component('product-right', require('./components/ProductRight.vue').default);

window.Swal=Swal;
window.Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  

const app = new Vue({
    el: '#app',
});
