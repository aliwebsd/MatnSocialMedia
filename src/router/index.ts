import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUpView.vue";
import SignIn from "../views/SignInView.vue";
import ArticleForm from "../views/ArticleForm.vue";
import ArticleSingle from "../views/ArticleDetails.vue";
import ProfileView from "../views/ProfileView.vue";
import NotFound from "../views/NotFoundView.vue";

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
    path: "/article/create",
    name: "ArticleForm",
    component: ArticleForm,
  },
  {
    path: "/article/:slug/edit",
    name: "ArticleForm",
    component: ArticleForm,
  },
  {
    path: "/article/:slug",
    name: "ArticleSingle",
    component: ArticleSingle,
  },
  {
    path: "/@:username",
    name: "Profile",
    component: ProfileView,
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

export default router;
