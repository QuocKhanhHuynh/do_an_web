<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" /> <!--truyềb xuống cho props component con-->
        </div>
        <div class="mt-3 col-md-6">
            <h4>Loại sách <i class="fa-sharp fa-solid fa-layer-group"></i></h4>
            <CategoryList v-if="filteredCategoriesCount > 0" :categories="filteredCategories" v-model:activeIndex="activeIndex"/>
            <p v-else>Không có loại sách nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success"  @click="goToAddCategory">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeCategory">
                <h4>Chi tiết Loại sách <i class="fa-sharp fa-solid fa-layer-group"></i></h4>
                <CategoryCard :category="activeCategory" />
                <router-link :to="{ name: 'category.edit', params: { id: activeCategory._id },}">
                    <span class="mt-2 badge badge-warning"><i class="fas fa-edit"></i> Hiệu chỉnh</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import CategoryCard from "@/components/CategoryCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import CategoryList from "@/components/CategoryList.vue";
import CategoryService from "@/services/category.service";
export default {
    components: {
        CategoryCard,
        InputSearch,
        CategoryList,
    },
    data() {
        return {
            categories: [],
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
        categoryStrings() {
            return this.categories.map((Category) => { 
                const { name } = Category;
                return [name].join("");
            });
        },
        filteredCategories() {
            if (!this.searchText) return this.categories;
            return this.categories.filter(category => category.name.toLowerCase().includes(this.searchText.toLowerCase()));
        },
        activeCategory() {
            if (this.activeIndex < 0) return null;
            return this.filteredCategories[this.activeIndex];
        },
        filteredCategoriesCount() {
            return this.filteredCategories.length;
        },
    },
    methods: {
        async retrieveCategories() {
            try {
                this.categories = (await CategoryService.getAll()).object;
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveCategories();
            this.activeIndex = -1;
        },
        goToAddCategory() {
            this.$router.push({ name: 'category.add' });
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