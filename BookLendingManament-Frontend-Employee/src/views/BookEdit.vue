<template>
    <div v-if="book" class="page">
        <h4>Hiệu chỉnh sách</h4>
        <BookForm :publishers="this.publishers" :categories="this.categories" :book="book" @submit:book="updateBook" @delete:book="deleteBook"/>
        <p>{{ message }}</p>
    </div>
</template>
<script>
import BookForm from "@/components/BookForm.vue";
import BookService from "@/services/book.service";
import PublisherService from "@/services/publisher.service";
import CategoryService from "@/services/category.service";
export default {
    components: {
        BookForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            book: null,
            message: "",
            publishers: [],
            categories: []
        };
    },
    methods: {
        async getBook(id) {
            try {
                this.book = (await BookService.get(id)).object;
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
        async updateBook(data) {
            try {
                const resultUpdate = await BookService.update(this.book._id, data);
                if (resultUpdate.status){
                    this.message = "Nhà xuất bản được cập nhật thành công.";
                }
                else{
                    this.message = "Không thể cập nhật Nhà xuất bản.";
                }
            } catch (error) {
                console.log(error);
            }
        },
        async deleteBook() {
            if (confirm("Bạn muốn xóa nhà xuất bản này?")) {
                try {
                    await BookService.delete(this.book._id);
                    this.$router.push({ name: "book" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async initData(){
            this.publishers = (await PublisherService.getAll()).object;
            this.categories = (await CategoryService.getAll()).object;
        }
    },
    created() {
        this.getBook(this.id);
        this.message = "";
        this.initData();
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