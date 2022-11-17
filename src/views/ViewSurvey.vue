<template>
  <div class="createSurvey">
    <div class="heading_wrapper">
      <h1 class="heading big_font">View Survey Details</h1>
      <h4>{{ message }}</h4>
      <div class="align_single_line survey__question--wrapper">
        <h3>
          SURVEY TITLE : <span>{{ survey.surveyTitle }}</span>
        </h3>
        <h3>
          SURVEY DESCRIPTION : <span>{{ survey.surveyDescription }}</span>
        </h3>
        <h3>
          SURVEY STATUS :
          <span>{{ survey.makeLive ? "PUBLISHED" : "UNPUBLISHED" }}</span>
        </h3>
        <h3>
          SURVEY CREATED AT :
          <span>{{ new Date(survey.createdAt).toLocaleString() }}</span>
        </h3>
      </div>

      <div class="share__btns">
        <v-btn
          tile
          color="success"
          @click="openShareLinkDiv"
          style="margin-top: 10px"
          >SHOW SURVEY LINK<v-icon right>mdi-share</v-icon>
        </v-btn>
        <DownloadSurveyData :fileData="fileData" />
      </div>

      <div class="share__link">
        <v-form
          class="survey__question"
          v-if="openShareLink === true"
        >
          <span class="survey__question--heading">{{`http://18.191.102.230/submit-survey/${id}/`}}</span>
        </v-form>
      </div>
    </div>
    <h3
      class="list_table_body no_results"
      v-show="survey.question && survey.question.length <= 0"
    >
      SORRY NO RESULTS TO DISPLAY
    </h3>
    <div
      class="form createSurvey__form"
      v-show="survey.question && survey.question.length > 0"
    >
      <vue-collapsible-panel-group
        base-color="#000"
        accordion
        v-for="(question, index) in survey.question"
        :key="index"
      >
        <vue-collapsible-panel :expanded="false">
          <template #title>{{ question.questionTitle }}</template>
          <template #content>
            <div>
              <div class="options" v-show="question.option.length > 0">
                <span v-for="(item, i) in question.option" :key="i">{{
                  item.option
                }}</span>
              </div>
              <section v-if="question.response && question.response.length > 0">
                <h3>Survey Question Responses</h3>
                <div v-for="item in question.response" :key="item.id">
                  <span class="viewSurvey__choice response">{{
                    `${item.participant.email} - SUBMITTED - ${item.response}`
                  }}</span>
                </div>
              </section>
              <span
                v-if="question.response && question.response.length <= 0"
                class="viewSurvey__choice response login_error"
                >NO RESPONSES FOUND FOR THIS QUESTION</span
              >
            </div>
          </template>
        </vue-collapsible-panel>
      </vue-collapsible-panel-group>
    </div>
  </div>
</template>
<script>
import SurveyService from "../services/SurveyService";
import DownloadSurveyData from "./DownloadSurveyData.vue";
export default {
  name: "view-survey",
  components: {
    DownloadSurveyData,
  },
  props: ["id"],
  data() {
    return {
      survey: {},
      userEmail: "",
      openShareLink: false,
      message: "",
      submitLinkMessage: "",
      fileData: [],
      rules: {
        required: (value) =>
          !!value || `Email ID Required To Share The Survey Link !`,
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    retrieveSurvey() {
      SurveyService.getSurvey(this.id)
        .then((response) => {
          this.survey = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    openShareLinkDiv() {
      this.openShareLink = !this.openShareLink;
    },
    // closeShareLinkDiv() {
    //   this.openShareLink = false;
    // },
    // shareSurveyLink(e) {
    //   e.preventDefault();
    //   const linkData = {
    //     surveylink: `http://3.22.168.254/survey-frontend-survey/submit-survey/${this.id}/`,
    //     useremail: this.userEmail,
    //   };
    //   SurveyService.shareSurveyLink(linkData)
    //     .then((response) => {
    //       if (response.status === 200) {
    //         this.submitLinkMessage = "SURVEY LINK HAS BEEN SUCCESSFULLY SENT";
    //         this.userEmail = "";
    //       }
    //     })
    //     .catch((e) => {
    //       this.submitLinkMessage = e.response.data.message;
    //     });
    // },
    retreiveSurveyReportDetails() {
      SurveyService.getSurveyReportDetails(this.id)
        .then((response) => {
          this.fileData = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.retrieveSurvey();
    this.retreiveSurveyReportDetails();
  },
};
</script>
<style>
</style>