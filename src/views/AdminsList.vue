<template>
  <div class="landing_page">
      <div class="heading_wrapper">
    <h1 class="primary_heading">Admins List</h1>
    <h4>{{ message }}</h4>
      </div>
    <v-row class="list_table">
      <div class="list_table_header" v-if="admins.length > 0">
        <v-col cols="9" sm="2">
          <h4>UserName</h4>
        </v-col>
        <v-col cols="9" sm="2">
          <h4>Email</h4>
        </v-col>
        <!-- <v-col cols="9" sm="2">
          <h4>No of Surevys</h4>
        </v-col> -->
        <v-col cols="9" sm="1">
          <h4>View</h4>
        </v-col>
        <v-col cols="9" sm="1">
          <h4>Delete</h4>
        </v-col>
      </div>
      <div class="list_table_body" v-if="admins.length > 0">
        <AdminListItem v-for="admin in admins" :key="admin.id" :admin="admin" @deleteAdmin="goDelete(admin)"
          @viewAdmin="goView(admin)" />
      </div>
      <h3 class="list_table_body no_results" v-show="admins.length <= 0">
        SORRY NO ADMINS TO DISPLAY
      </h3>
    </v-row>
  </div>
</template>
<script>
import AdminService from "../services/AdminService";
import AdminListItem from "@/components/AdminListItem.vue";
export default {
  name: "surveys-list",
  data() {
    return {
      admins: [{
        username:"micheal",
        email:"micheal@gmail.com",
        id:1
      }],
      message: "Manage all admins and their surveys",
    };
  },
  components: {
    AdminListItem,
  },
  methods: {
    goView(admin) {
      this.$router.push({ name: "viewAdmin", params: { adminId: admin.id } });
    },
    goDelete(admin) {
      AdminService.delete(admin.id)
        .then(() => {
          this.retrieveAdmins();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveAdmins() {
      AdminService.getAllAdmins()
        .then((response) => {
          this.admins = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.retrieveAdmins();
  },
};
</script>
<style>

</style>