<template>
  <div class="landing_page">
    <div class="heading_wrapper">
      <h1 class="primary_heading">View Admin Details</h1>
      <h4>{{ message }}</h4>
      <h1 class="heading">Surveys Created By Admin : {{ survey.username.toUpperCase() }}</h1>
    </div>
    <v-row class="list_table">
      <div class="list_table_header" v-if="survey.surveys.length > 0">
        <v-col cols="9" sm="2">
          <h4>Title</h4>
        </v-col>
        <v-col cols="9" sm="2">
          <h4>Description</h4>
        </v-col>
        <v-col cols="9" sm="2">
          <h4>Status</h4>
        </v-col>
        <v-col cols="9" sm="1">
          <h4>View</h4>
        </v-col>
        <v-col cols="9" sm="1">
          <h4>Delete</h4>
        </v-col>
      </div>
      <div class="list_table_body" v-if="survey.surveys.length > 0">
        <SurveysListItem v-for="survey in survey.surveys" :key="survey.id" :survey="survey"
          @deleteSurvey="gotToDeleteSurvey(survey)" @viewSurvey="goToViewSurvey(survey)" />
      </div>
      <h3 class="list_table_body no_results" v-show="survey.surveys.length <= 0">
        SORRY NO SURVEYS TO DISPLAY FOR THE ADMIN
      </h3>
    </v-row>
  </div>
</template>
<script>
import AdminService from "../services/AdminService";
import SurveyService from "../services/SurveyService";
import SurveysListItem from "@/components/SurveysListItem.vue";
export default {
  name: "view-user",
  props: ["adminId"],
  data() {
    return {
      survey: {
        surveys: [],
        username: "",
      },
      message: "",
    };
  },
  components: {
    SurveysListItem,
  },
  methods: {
    goToViewSurvey(survey) {
      this.$router.push({ name: "viewSurvey", params: { id: survey.id } });
    },
    gotToDeleteSurvey(survey) {
      SurveyService.deleteSurvey(survey.id)
        .then(() => {
          this.fetchAdminDetails();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    fetchAdminDetails() {
      AdminService.getAdminSurveys(this.adminId)
        .then((response) => {
          this.survey.surveys = response.data.surveys;
          this.survey.username = response.data.userDetails.username;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.fetchAdminDetails();
  },
};
</script>
<style>
</style>
