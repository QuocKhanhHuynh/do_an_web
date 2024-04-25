<template>
    <div class="page">
      <h4>Thêm Nhân viên</h4>
      <EmployeeForm @submit:employee="addEmployee" />
      <p>{{ message }}</p>
    </div>
  </template>
  <script>
  import EmployeeForm from "@/components/EmployeeForm.vue";
  import EmployeeService from "@/services/employee.service";
  export default {
      components: {
        EmployeeForm,
      },
      data() {
          return {
              message: "",
          };
      },
      methods: {
          async addEmployee(data) {
              try {
                  const addResult = await EmployeeService.create(data);
                  if (addResult.status){
                      this.message = "Nhân viên được thêm thành công.";
                  }
                  else{
                      this.message = "Nhân viên được thêm thất bại.";
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