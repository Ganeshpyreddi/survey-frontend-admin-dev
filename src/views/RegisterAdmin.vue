<template>
  <div class="landing_page">
    <h1 class="primary_heading">Register Admin</h1>
    <div class="register_form">
      <h4 class="login_error">{{ message }}</h4>
      <form class="form">
        <div class="form_input_wrapper">
          <label for="email">EMAIL *</label>
          <input
            id="email"
            type="email"
            v-model="registerForm.email"
            class="form_input"
          />
        </div>
        <div class="form_input_wrapper">
          <label for="username">User Name *</label>
          <input
            id="username"
            type="text"
            v-model="registerForm.userName"
            class="form_input"
          />
        </div>
        <div class="form_input_wrapper">
          <label for="password">PASSWORD *</label>
          <input
            id="password"
            type="password"
            v-model="registerForm.password"
            class="form_input"
          />
        </div>
        <div class="form_input_wrapper">
          <label for="password">RE-ENTER PASSWORD *</label>
          <input
            id="password"
            type="password"
            v-model="registerForm.confirmPassword"
            class="form_input"
          />
        </div>
        <button @click="handleLogin" class="login_button width-100">
          Register
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import AdminService from "../services/AdminService";
export default {
  data() {
    return {
      message: "Create account for admin",
      registerForm: {
        email: "",
        password: "",
        confirmPassword: "",
        userName: "",
      },
    };
  },
  methods: {
    handleLogin(e) {
      e.preventDefault();
      if (
        !this.registerForm.email ||
        !this.registerForm.password ||
        !this.registerForm.userName ||
        !this.registerForm.confirmPassword
      ) {
        this.message = "Fields Required !";
        return;
      }
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.message = "Password not match !";
        return;
      }
      const registerForm = {
        email: this.registerForm.email,
        username: this.registerForm.userName,
        password: this.registerForm.password,
      };
      AdminService.createAdmin(registerForm)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ name: "admins" });
          }
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>