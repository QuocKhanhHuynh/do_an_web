<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" /> <!--truyềb xuống cho props component con-->
        </div>
        <div class="mt-3 col-md-6">
            <h4>Sách <i class="fa-solid fa-book"></i></h4>
            <BookList v-if="filteredBooksCount > 0" :books="filteredBooks" v-model:activeIndex="activeIndex"/>
            <p v-else>Không có sách nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success"  @click="goToAddBook">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeBook">
                <h4>Chi tiết Sách <i class="fa-solid fa-book"></i></h4>
                <BookCard :book="activeBook" />
                <router-link :to="{ name: 'book.edit', params: { id: activeBook._id },}">
                    <span class="mt-2 badge badge-warning"><i class="fas fa-edit"></i> Hiệu chỉnh</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import BookCard from "@/components/BookCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/BookList.vue";
import BookService from "@/services/book.service";
export default {
    components: {
        BookCard,
        InputSearch,
        BookList,
    },
    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: { 
        bookStrings() {
            return this.books.map((Book) => { 
                const { name, price, quanlity, publicationYear, _idPublisher, publisherName, _idCategory, categoryName, description, stock, urlImage} = Book;
                return [name, price, quanlity, publicationYear, _idPublisher, publisherName, _idCategory, categoryName, description, stock, urlImage].join("");
            });
        },
        filteredBooks() {
            if (!this.searchText) return this.books;
            return this.books.filter(book => book.name.toLowerCase().includes(this.searchText.toLowerCase()));
        },
        activeBook() {
            if (this.activeIndex < 0) return null;
            return this.filteredBooks[this.activeIndex];
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },
    methods: {
        async retrieveBooks() {
            try {
                this.books = (await BookService.getAll()).object;
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },
        goToAddBook() {
            this.$router.push({ name: 'book.add' });
        },
    },
    async mounted() {
        //localStorage.removeItem('token');
        const token = await localStorage.getItem("token")
        // confirm(token);
        if (token == null){
            this.$router.push({ path: `/login`});
        }
        this.refreshList();
    },


    
};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>