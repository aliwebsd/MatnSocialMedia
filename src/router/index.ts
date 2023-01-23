import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUpView.vue";
import SignIn from "../views/SignInView.vue";
import ArticleForm from "../views/ArticleForm.vue";
import ArticleDetails from "../views/ArticleDetails.vue";
import ProfileView from "../views/ProfileView.vue";
import NotFound from "../views/NotFoundView.vue";
import UserDataService from "@/services/user";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
  {
    path: "/register",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/article/:slug/edit",
    name: "ArticleFormEdit",
    component: ArticleForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/article/create",
    name: "ArticleFormCreate",
    component: ArticleForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/article/:slug",
    name: "ArticleDetails",
    component: ArticleDetails,
  },
  {
    path: "/@:username",
    name: "Profile",
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !UserDataService.isAuthorized()) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/login",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
