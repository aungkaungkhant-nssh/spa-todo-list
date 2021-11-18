<template>
  <div class="container my-5">
        <div class="row">
            <div class="col-4">
                <product-left @loadProduct="view" :isEdit="isEdit" :product="product" @clear="clear"></product-left>
            </div>
            <div class="col-8">
                <product-right :products="products" @changeEdit="changeEdit" @changeCreate="changeCreate" @loadProduct="view" @getResults="view"
                @searchItem="searchItem"
                />
            </div>
        </div>      
  </div>
</template>

<script>
import ProductLeft from './ProductLeft.vue'
import ProductRight from './ProductRight.vue'
export default {
  components: { ProductLeft, ProductRight },
  data(){
      return{
          search:"",
          isEdit:false,
          products:{},
          search:"",
          product:{
              id:"",
              name:"",
              price:""
          },
      }
  },
  methods:{
      view(page=1){
           this.$Progress.start()
           axios.get(`/api/product?page=${page}&search=${this.search}`)
            .then(response=>{
                if(response.status==200){
                    this.products=response.data
                    setTimeout(() => {
                            this.$Progress.finish()
                    },3000);
                
                }
            })
            .catch((error)=>{
                setTimeout(() => {
                        this.$Progress.fail()
                }, 3000);
            })
      },
      searchItem(search){
          this.search=search;
          this.view();
      },
      changeEdit(product){
          this.isEdit=true;
          this.product=product
      },
      changeCreate(){
          this.isEdit=false;
          this.product.name="",
          this.product.price="",
          this.product.id=""
          this.view();
      },
      clear(){
          this.changeCreate();
          this.view()
      }
  },
  created(){
      
     this.view()
  }
}
</script>

<style>

</style>