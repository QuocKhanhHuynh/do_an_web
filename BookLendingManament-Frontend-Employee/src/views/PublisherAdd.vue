<template>
  <div class="page">
    <h4>Thêm Nhà xuất bản</h4>
    <PublisherForm @submit:publisher="addPublisher" />
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
    data() {
        return {
            message: "",
        };
    },
    methods: {
        async addPublisher(data) {
            try {
                const addResult = await PublisherService.create(data);
                if (addResult.status){
                    this.message = "Nhà xuất bản được thêm thành công.";
                }
                else{
                    this.message = "Nhà xuất bản được thêm thất bại.";
                }
            } catch (error) {
                console.log(error);
            }
        },
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