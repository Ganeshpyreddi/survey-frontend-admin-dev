<template>
  <div class="header" v-if="currentPath !== '/login'">
    <div class="header_left">
      <img class="header_logo" :src="logo" />
      <router-link to="/" class="header_logo_text">Manage Surveys</router-link>
    </div>
    <div class="header_right">
      <v-toolbar-items v-if="userRole === 'superadmin'">
        <router-link to="/" v-if="currentPath !== '/'" class="header_link"
          >Home</router-link
        >
        <router-link to="/register-admin" class="header_link"
          >Register Admin</router-link
        >
        <router-link to="/surveys" class="header_link"
          >Surveys List</router-link
        >
        <router-link to="/create-survey" class="header_link"
          >Create Survey</router-link
        >
      </v-toolbar-items>
      <v-toolbar-items v-else-if="userRole === 'admin'">
        <router-link
          to="/surveys"
          v-if="currentPath !== '/surveys'"
          class="header_link"
          >Home</router-link
        >
        <router-link to="/create-survey" class="header_link"
          >Create Survey</router-link
        >
      </v-toolbar-items>
      <button @click="handleLogout" class="login_button logout_button">
        LOGOUT
      </button>
    </div>
  </div>
  <div>
    <router-view />
  </div>
</template>

<script>
import AuthService from "./services/AuthService";
import logo from "./assets/app_logo.svg";
import "@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css";

import "./App.css";
export default {
  name: "App",
  data: () => ({
    logo,
    currentPath: "",
    userRole: "",
  }),
  methods: {
    goToCreateSurvey() {
      this.$router.push({ name: "create-survey" });
    },
    goToSuperAdminSurveys() {
      this.$router.push({ name: "admins" });
    },
    handleLogout() {
      const id = sessionStorage.getItem("id");
      AuthService.logout(id).then((response) => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userRole");
        sessionStorage.removeItem("id");
        this.$router.push({ name: "login" });
      });
    },
  },
  created() {
    const isAuthenticated = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("userRole");
    if (isAuthenticated && userRole === "superadmin") {
      this.$router.push({ name: "admins" });
    } else if (isAuthenticated && userRole === "admin") {
      this.$router.push({ name: "surveys" });
    } else {
      this.$router.push({ name: "login" });
    }
    this.$watch(
      () => this.$route.params,
      () => {
        this.currentPath = this.$route.path;
        this.userRole = sessionStorage.getItem("userRole");
      }
    );
  },
};
</script>