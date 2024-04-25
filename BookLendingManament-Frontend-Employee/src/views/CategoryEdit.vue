<template>
    <div v-if="category" class="page">
        <h4>Hiệu chỉnh Loại sách</h4>
        <CategoryForm :category="category" @submit:category="updateCategory" @delete:category="deleteCategory"/>
        <p>{{ message }}</p>
    </div>
</template>
<script>
import CategoryForm from "@/components/CategoryForm.vue";
import CategoryService from "@/services/category.service";
export default {
    components: {
        CategoryForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            category: null,
            message: "",
        };
    },
    methods: {
        async getCategory(id) {
            try {
                this.category = (await CategoryService.get(id)).object;
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateCategory(data) {
            try {
                const resultUpdate = await CategoryService.update(this.category._id, data);
                if (resultUpdate.status){
                    this.message = "Loại sách được cập nhật thành công.";
                }
                else{
                    this.message = "Loại sách cập nhật Nhà xuất bản.";
                }
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCategory() {
            if (confirm("Bạn muốn xóa nhà xuất bản này?")) {
                try {
                    await CategoryService.delete(this.category._id);
                    this.$router.push({ name: "category" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getCategory(this.id);
        this.message = "";
    },
    async mounted(){
      //localStorage.removeItem('token');
      const token = await localStorage.getItem("token")
     // confirm(token);
      if (token == null){
        this.$router.push({ path: `/login`});
      }
    }
};
</script>