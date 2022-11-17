import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    alias: "/admins",
    name: "admins",
    component: () => import("./views/AdminsList.vue")
  },
  {
    path: "/surveys",
    alias: "/surveys",
    name: "surveys",
    component: () => import("./views/SurveysList.vue")
  },
  {
    path: "/register-admin",
    alias: "/register-admin",
    name: "registerAdmin",
    component: () => import("./views/RegisterAdmin.vue")
  },
  {
    path: "/create-survey",
    name: "createSurvey",
    component: () => import("./views/CreateSurvey.vue")
  },
  {
    path: "/view-survey/:id",
    name: "viewSurvey",
    component: () => import("./views/ViewSurvey.vue"),
    props: true
  },
  {
    path: "/view-user/:adminId",
    name: "viewAdmin",
    component: () => import("./views/ViewAdmin.vue"),
    props: true
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/Login.vue")
  },
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;