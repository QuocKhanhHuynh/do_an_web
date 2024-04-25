<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" /> <!--truyềb xuống cho props component con-->
        </div>
        <div class="mt-3 col-md-6">
            <h4>Đọc giả<i class="fa-solid fa-book-open-reader"></i></h4>
            <ClientList :clients="filteredClients" v-model:activeIndex="activeIndex"/>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success"  @click="goToAddClient">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeClient != null">
                <h4>Chi tiết đọc giả<i class="fa-solid fa-book-open-reader"></i></h4>
                <ClientCard :client="activeClient" />
                <button v-if="this.activeClient.status == true" class="btn btn-sm btn-danger"  @click="goToLock(activeClient._id)">
                    <i class="fa-solid fa-lock"></i> Khóa
                </button>
                <button v-if="this.activeClient.status == false" class="btn btn-sm btn-success" @click="goToLock(activeClient._id)">
                    <i class="fa-solid fa-lock-open"></i> Mở khóa
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import ClientCard from "@/components/ClientCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ClientList from "@/components/ClientList.vue";
import ClientService from "@/services/client.service.js";
export default {
    components: {
        ClientCard,
        InputSearch,
        ClientList,
    },
    data() {
        return {
            clients: [],
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
        clientStrings() {
            return this.clients.map((Client) => { 
                const {_id, fullname, gender, dOB, phoneNumber, address, status } = Client;
                return [_id, fullname, gender, dOB, phoneNumber, address, status].join("");
            });
        },
        filteredClients() {
            if (!this.searchText) return this.clients;
            return this.clients.filter(client => client.username.toLowerCase().includes(this.searchText.toLowerCase()));
        },
        activeClient() {
            if (this.activeIndex < 0) return null;
            console.log(this.filteredClients[this.activeIndex]);
            return this.filteredClients[this.activeIndex];
        },
    },
    methods: {
        async retrieveClients() {
            try {
                this.clients = (await ClientService.getAll()).object;
                console.log(this.clients);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveClients();
            this.activeIndex = -1;
        },
        async goToLock(id) {
            console.log(id);
            const dataBody = {fullname: this.activeClient.fullname, gender: this.activeClient.gender, dOB: this.activeClient.dOB, phoneNumber: this.activeClient.phoneNumber, address: this.activeClient.address, status: !this.activeClient.status};
            console.log(dataBody);
            const result = (await ClientService.update(id, dataBody)).status;
            if (result && this.activeClient.status == true){
                confirm("Đã khóa đọc giả " + this.activeClient.fullname);
            }
            else if (result && this.activeClient.status == false){
                confirm("Đã mở khóa đọc giả " + this.activeClient.fullname);
            }
            this.refreshList();
        },
        goToAddClient() {
            this.$router.push({ name: 'client.add' });
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