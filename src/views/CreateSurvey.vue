<template>
  <div class="createSurvey">
    <div class="heading_wrapper">
      <h1 class="big_font">Create Survey</h1>
      <h4 class="heading">{{ message }}</h4>
    </div>
    <v-form class="form createSurvey__form" @submit="createSurvey">
      <v-text-field label="Title" v-model="survey.title" :rules="[rules.required]" />
      <v-text-field label="Description" v-model="survey.description" :rules="[rules.required]" />
      <v-switch :label="`${survey.isPublished ? 'UnPublish Survey' : 'Publish Survey'}`" v-model="survey.isPublished"
        color="indigo" inset></v-switch>
      <div class="survey__questions--wrapper">
        <div class="add__question">
          <v-select :items="survey.questionOptions" v-model="survey.questionType" :rules="[rules.required]"
            label="Select Question Type"></v-select>
          <v-icon large color="blue" @click="handleAddQuestion" class="survey__icon align__icon icon">mdi-plus</v-icon>
        </div>
        <div class="survey__question--wrapper">
          <div class="survey__question" v-for="(question, index) in survey.questions" :key="index">
            <div class="survey__question--heading">
              <h3>Question Type - {{ question.questionType.toUpperCase() }}</h3>
            </div>
            <v-text-field v-model="question.questionTitle" label="Enter your question" :rules="[rules.required]">
            </v-text-field>
            <div v-if="question.questionType === 'multiple-choice-question'">
              <h5>
                ADD OPTION (max 4*)
                <v-icon large color="blue" @click="handleAddOption(index)" class="icon survey__icon">mdi-plus</v-icon>
              </h5>
              <div class="survey__question--options" v-for="(item, optionIndex) in question.options" :key="optionIndex">
                <div class="survey__question--option">
                  <v-text-field v-model="item.option" :label="`Option ${optionIndex + 1}`" :rules="[rules.required]">
                  </v-text-field>
                  <v-icon large color="red" @click="handleDeleteOption(index, optionIndex)" v-show="optionIndex !== 0"
                    class="icon survey__icon del__icon">
                    mdi-minus</v-icon>
                </div>
              </div>
            </div>
            <div class="survey__question--bottom">
              <v-switch label="Required" v-model="question.required" color="orange" class="required__switch">
              </v-switch>
              <v-icon large color="red" class="icon actions__icon" @click="handleDeleteQuestion(index)">
                mdi-delete-outline
              </v-icon>
            </div>
          </div>
        </div>
      </div>
      <button class="login_button">CREATE SURVEY</button>
    </v-form>
  </div>
</template>
<script>
import SurveyService from "../services/SurveyService";
import { FormTextBoxObj } from "../utils/surveyUtil";
export default {
  name: "Create-Survey",
  data() {
    return {
      survey: {
        title: "",
        description: "",
        questions: [
          {
            questionTitle: "",
            questionType: "text-box",
            required: false,
          },
        ],
        isPublished: false,
        questionType: "",
        questionOptions: [
          "text-box",
          "multiple-choice-question",
          "rating-question",
        ],
      },
      message: "",
      rules: {
        required: (value) => !!value || "Field Required.",
      },
    };
  },
  methods: {
    handleAddQuestion() {
      let questions = [...this.survey.questions];
      switch (this.survey.questionType) {
        case "text-box":
          questions = [...questions, new FormTextBoxObj("text-box")];
          break;
        case "rating-question":
          questions = [...questions, new FormTextBoxObj("rating-question")];
          break;
        case "multiple-choice-question":
          questions = [
            ...questions,
            {
              ...new FormTextBoxObj("multiple-choice-question"),
              options: [
                {
                  option: "",
                },
              ],
            },
          ];
          break;
      }
      this.survey.questions = questions;
    },
    handleDeleteQuestion(id) {
      this.survey.questions = this.survey.questions.filter((_, i) => i !== id);
    },
    handleAddOption(id) {
      let questions = [...this.survey.questions];
      let currentQuestionOptions = questions[id].options;
      if (currentQuestionOptions.length >= 4) {
        return;
      }
      currentQuestionOptions = [
        ...currentQuestionOptions,
        {
          option: "",
        },
      ];
      this.survey.questions[id].options = currentQuestionOptions;
    },
    handleDeleteOption(questionId, optionId) {
      let questions = [...this.survey.questions];
      let currentQuestionOptions = questions[questionId].options;
      this.survey.questions[questionId].options = currentQuestionOptions.filter(
        (_, i) => i !== optionId
      );
    },
    createSurvey(e) {
      e.preventDefault();
      const surveyData = {
        title: this.survey.title,
        description: this.survey.description,
        makeLive: this.survey.isPublished,
        questions: this.survey.questions,
      };
      SurveyService.createSurvey(surveyData)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ name: "surveys" });
          }
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>