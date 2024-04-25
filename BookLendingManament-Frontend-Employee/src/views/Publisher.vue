<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" /> <!--truyềb xuống cho props component con-->
        </div>
        <div class="mt-3 col-md-6">
            <h4>Nhà xuất bản <i class="fa-solid fa-house"></i></h4>
            <PublisherList v-if="filteredPublishersCount > 0" :publishers="filteredPublishers" v-model:activeIndex="activeIndex"/>
            <p v-else>Không có liên hệ nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success"  @click="goToAddPublisher">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activePublisher">
                <h4>Chi tiết Nhà xuất bản <i class="fa-solid fa-house"></i></h4>
                <PublisherCard :publisher="activePublisher" />
                <router-link :to="{ name: 'publisher.edit', params: { id: activePublisher._id },}">
                    <span class="mt-2 badge badge-warning"><i class="fas fa-edit"></i> Hiệu chỉnh</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import PublisherCard from "@/components/PublisherCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import PublisherList from "@/components/PublisherList.vue";
import PublisherService from "@/services/publisher.service";
export default {
    components: {
        PublisherCard,
        InputSearch,
        PublisherList,
    },
    data() {
        return {
            publishers: [],
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
        publisherStrings() {
            return this.publishers.map((Publisher) => { 
                const { name, address } = Publisher;
                return [name, address].join("");
            });
        },
        filteredPublishers() {
            if (!this.searchText) return this.publishers;
            return this.publishers.filter(publicser => publicser.name.toLowerCase().includes(this.searchText.toLowerCase()));
        },
        activePublisher() {
            if (this.activeIndex < 0) return null;
            return this.filteredPublishers[this.activeIndex];
        },
        filteredPublishersCount() {
            return this.filteredPublishers.length;
        },
    },
    methods: {
        async retrievePublishers() {
            try {
                this.publishers = (await PublisherService.getAll()).object;
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievePublishers();
            this.activeIndex = -1;
        },
        goToAddPublisher() {
            this.$router.push({ name: 'publisher.add' });
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