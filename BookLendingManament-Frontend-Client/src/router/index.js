import { createWebHistory, createRouter } from "vue-router";
import ProductsPage from "@/views/ProductsPage.vue";
import ProductDetailPage from "@/views/ProductDetailPage.vue";
import CartPage from "@/views/CartPage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import ReceiptAdd from "@/views/ReceiptAdd.vue";
import Login from "@/views/Login.vue";
import ClientInfo from "@/views/ClientInfo.vue";
import Receipt from "@/views/Receipt.vue";
import ClientUpdatePassword from "@/views/ClientUpdatePassword.vue";
import ClientForgetPassword from "@/views/ClientForgetPassword.vue";
const routes = [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/receipts',
      name: 'Receipt',
      component: Receipt,
    },
    {
      path: '/account',
      name: 'Account',
      component: ClientInfo,
    },
    {
      path: '/updatePass',
      name: 'updatepass',
      component: ClientUpdatePassword,
    },
    {
      path: '/forgetPass',
      name: 'forgetpass',
      component: ClientForgetPassword,
    },
    {
      path: '/products',
      name: 'Products',
      component: ProductsPage,
    }, {
      path: '/products/:id',
      name: 'ProductDetail',
      component: ProductDetailPage,
    }, {
      path: '/cart',
      name: 'Cart',
      component: CartPage,
    }, {
      path: '/',
      redirect: '/products',
    }, {
      path: '/:pathMatch(.*)*',
      component: NotFoundPage,
    }, {
      path: '/receipts/:idBook',
      name: 'receipt.add',
      component: ReceiptAdd,
    }
  ];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;