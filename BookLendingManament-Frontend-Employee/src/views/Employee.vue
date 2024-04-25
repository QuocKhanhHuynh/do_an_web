<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" /> <!--truyềb xuống cho props component con-->
        </div>
        <div class="mt-3 col-md-6">
            <h4>Nhân viên <i class="fa-solid fa-circle-user"></i></h4>
            <EmployeeList :employees="filteredEmployees" v-model:activeIndex="activeIndex"/>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success"  @click="goToAddEmployee">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeEmployee != null">
                <h4>Chi tiết Nhân viên <i class="fa-solid fa-circle-user"></i></h4>
                <EmployeeCard :employee="activeEmployee" />
            </div>
        </div>
    </div>
</template>
<script>
import EmployeeCard from "@/components/EmployeeCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import EmployeeList from "@/components/EmployeeList.vue";
import EmployeeService from "@/services/employee.service";
export default {
    components: {
        EmployeeCard,
        InputSearch,
        EmployeeList,
    },
    data() {
        return {
            employees: [],
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
        employeeStrings() {
            return this.employees.map((Employee) => { 
                const {fullname, phoneNumber, address, position } = Employee;
                return [fullname, phoneNumber, address, position].join("");
            });
        },
        filteredEmployees() {
            if (!this.searchText) return this.employees;
            return this.employees.filter(employee => employee.username.toString().includes(this.searchText));
        },
        activeEmployee() {
            if (this.activeIndex < 0) return null;
            console.log(this.filteredEmployees[this.activeIndex]);
            return this.filteredEmployees[this.activeIndex];
        },
    },
    methods: {
        async retrieveEmployees() {
            try {
                this.employees = (await EmployeeService.getAll()).object;
                console.log(this.employees);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveEmployees();
            this.activeIndex = -1;
        },
        goToAddEmployee() {
            this.$router.push({ name: 'employee.add' });
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