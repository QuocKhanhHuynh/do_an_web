<template>
    <div v-if="publisher" class="page">
        <h4>Hiệu chỉnh Nhà xuất bản</h4>
        <PublisherForm :publisher="publisher" @submit:publisher="updatePublisher" @delete:publisher="deletePublisher"/>
        <p>{{ message }}</p>
    </div>
</template>
<script>
import PublisherForm from "@/components/PublisherForm.vue";
import PublisherService from "@/services/publisher.service";
export default {
    components: {
        PublisherForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            publisher: null,
            message: "",
        };
    },
    methods: {
        async getPublisher(id) {
            try {
                this.publisher = (await PublisherService.get(id)).object;
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
        async updatePublisher(data) {
            try {
                const resultUpdate = await PublisherService.update(this.publisher._id, data);
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
        async deletePublisher() {
            if (confirm("Bạn muốn xóa nhà xuất bản này?")) {
                try {
                    await PublisherService.delete(this.publisher._id);
                    this.$router.push({ name: "publisher" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getPublisher(this.id);
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