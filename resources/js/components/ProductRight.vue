<template>
  <div>
       <div class="row mb-3">
            <div class="col-6">
                <button class="btn btn-primary" @click="create"><i class="fas fa-circle-plus mr-2" ></i>Create</button>
            </div>
            <div class="col-6">
                <div class="input-group mb-2">
                        <input type="text" class="form-control"  placeholder="Search" v-model="search" @keyup.enter="searchItem">
                        <div class="input-group-prepend">
                            <button class="btn btn-primary" @click="searchItem"><i class="fas fa-search"></i></button>
                        </div>
                </div>
                
            </div>
            <div class="col-6"></div>
        </div>
        <table class="table table-striped">
            <thead>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
            </thead>
            <tbody>
                <tr v-for="product in products.data" :key="product.id">
                    <td>{{product.id}}</td>
                    <td>{{product.name}}</td>
                    <td>{{product.price}}</td>
                    <td>
                        <button class="btn btn-sm btn-warning mr-2" @click="edit(product)">
                            <span><i class="fas fa-edit"></i></span>
                            Edit
                        </button>
                        <button class="btn btn-sm btn-danger"  @click="destroyProduct(product.id)">
                            <span><i class="fas fa-trash"></i></span>
                            Delete
                        </button>
                    </td>
                </tr>
               
            </tbody>
        </table>
         <pagination :data="products"  @pagination-change-page="getResults"></pagination>
        
  </div>
</template>

<script>
export default {
    props:["products"],
    data(){
        return {
            search:"",
        }
    },
    methods:{
        edit(product){
            this.$emit("changeEdit",product)
        },
        searchItem(){
            this.$emit("searchItem",this.search)
        },
        create(){
            this.$emit("changeCreate")
        },
        destroyProduct(id){
            Swal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/product/${id}`)
                    .then((response)=>{
                        if(response.status==200){
                            this.$emit("loadProduct")
                            Toast.fire({
                                icon: 'success',
                                title: 'Delete  successfully'
                            })
                        }
                    
                    })
                }
            })
            
        },
        getResults(page){
          this.$emit("getResults",page)
        }
    }
}
</script>

<style>

</style>