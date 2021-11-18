<template>
  <div class="card">
        <div class="card-header">
            {{isEdit?"Edit":"Create"}}
        </div>
        <div class="card-body">
            <form @submit.prevent="isEdit?edit(product.id):store()">
                <div class="form-group  ">
                    <label for="">Name:</label>
                    <input type="text" class="form-control" v-model="product.name"
                    :class="{'is-invalid':error.hasOwnProperty('name')}"
                    >
                    <span v-if="error.hasOwnProperty('name')" class="text-danger">{{error.name[0]}}</span>
                </div>
                <div class="form-group">
                    <label for="">Price</label>
                    <input type="number" class="form-control" v-model="product.price"   :class="{'is-invalid':error.hasOwnProperty('price')}">
                    <span v-if="error.hasOwnProperty('price')" class="text-danger">{{error.price[0]}}</span>
                </div>
                <button class="btn btn-primary" type="submit"><i class="fas fa-save mr-2"></i>save</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props:["isEdit","product"],
    data(){
        return {
            error:{

            }
        }
    },
    mounted(){
        console.log(this.isEdit)
    },
    methods:{
        store(){
            axios.post('/api/product',this.product)
            .then((response)=>{
               if(response.status==201){
                   this.product.name=""
                   this.product.price=""
                   this.$emit("loadProduct")
                   Toast.fire({
                                icon: 'success',
                                title: 'Create  successfully'
                            })
               }
            })
            .catch((error)=>{
                this.error=error.response.data.errors;
            })
        },
        edit(id){
            axios.put(`/api/product/${id}`,this.product)
            .then((response)=>{
               this.$emit("clear")
                Toast.fire({
                                icon: 'success',
                                title: 'Update  successfully'
                            })
               this.error={};
            })
            .catch((error)=>{
                this.error=error.response.data.errors;
            })
        }
    }
}
</script>

<style>

</style>