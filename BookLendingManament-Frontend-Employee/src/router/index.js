import { createWebHistory, createRouter } from "vue-router";
import Publisher from "@/views/Publisher.vue";
import Employee from "@/views/Employee.vue";
import Client from "@/views/Client.vue";
import Login from "@/views/Login.vue";
import Book from "@/views/Book.vue";
import Category from "@/views/Category.vue";
import Receipt from "@/views/Receipt.vue";
const routes = [
    {
        path: "/",
        name: "receipt",
        component: Receipt,
        // meta: { requiresAuth: true }
    },
    {
        path: "/publishers",
        name: "publisher",
        component: Publisher,
        // meta: { requiredAuth: true }
    },
    {
        path: "/categories",
        name: "category",
        component: Category,
        // meta: { requiredAuth: true }
    },
    {
        path: "/employees",
        name: "employee",
        component: Employee,
        // meta: { requiredAuth: true }
    },
    {
        path: "/clients",
        name: "client",
        component: Client,
        // meta: { requiredAuth: true }
    },
    {
        path: "/books",
        name: "book",
        component: Book,
        // meta: { requiredAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
        // meta: { requiredAuth: true }
    },
    {
        path: "/publishers/add",
        name: "publisher.add",
        component: () => import('@/views/PublisherAdd.vue'),
        props: true,
        // meta: { requiredAuth: true }
    },
    {
        path: "/categories/add",
        name: "category.add",
        component: () => import('@/views/CategoryAdd.vue'),
        props: true,
        // meta: { requiredAuth: true }
    },
    {
        path: "/employees/add",
        name: "employee.add",
        component: () => import('@/views/EmployeeAdd.vue'),
        //props: true,
        // meta: { requiredAuth: true }
    },
    {
        path: "/account",
        name: "employee.info",
        component: () => import('@/views/EmployeeInfo.vue'),
        //props: true,
        // meta: { requiredAuth: true }
    },
    {
        path: "/updatePass",
        name: "employee.updatePass",
        component: () => import('@/views/EmployeeUpdatePassword.vue'),
        //props: true,
        // meta: { requiredAuth: true }
    },
    {
        path: "/forgetPass",
        name: "employee.forgetpass",
        component: () => import('@/views/EmployeeForgetPassword.vue'),
        //props: true,
        // meta: { requiredAuth: true }
    },
    {
        path: "/books/add",
        name: "book.add",
        component: () => import('@/views/BookAdd.vue'),
        props: true,
        // meta: { requiredAuth: true }
    },
    {
        path: "/clients/add",
        name: "client.add",
        component: () => import('@/views/ClientAdd.vue'),
        props: true,
        // meta: { requiredAuth: true }
    },
    {
        path: "/publishers/:id",
        name: "publisher.edit",
        component: () => import("@/views/PublisherEdit.vue"),
        props: true, 
        // meta: { requiredAuth: true }
    },
    {
        path: "/receipts/:id",
        name: "receipt.detail",
        component: () => import("@/views/ReceiptDetail.vue"),
        // meta: { requiredAuth: true }
    },
    {
        path: "/categories/:id",
        name: "category.edit",
        component: () => import("@/views/CategoryEdit.vue"),
        props: true, 
        // meta: { requiredAuth: true }
    },
    {
        path: "/books/:id",
        name: "book.edit",
        component: () => import("@/views/BookEdit.vue"),
        props: true,
        // meta: { requiredAuth: true }
    },
    
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
/*
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('token') == null) {
        next({
          path: '/login',
          query: { redirect: to.fullPath } 
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });
*/
export default router;