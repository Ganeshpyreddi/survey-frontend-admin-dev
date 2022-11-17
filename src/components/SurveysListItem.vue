<template>
  <v-row class="list_table_item">
    <v-col cols="9" sm="2">
      <span>{{ survey.surveyTitle }}</span>
    </v-col>
    <v-col cols="9" sm="2">
      <span> {{ survey.surveyDescription }}</span>
    </v-col>
    <v-col cols="9" sm="2" class="published__switch">
      <v-switch v-model="survey.makeLive" v-if='showToggle === true'
        :label="survey.makeLive ? 'Published' : 'UnPublished'" @change="handleChange" color="indigo" inset></v-switch>
      <span v-else-if='showToggle === false'>{{ survey.makeLive ? 'Published' : 'UnPublished' }}</span>
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn size="x-small" icon="mdi-format-list-bulleted-type" @click="viewSurvey" />
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteSurvey" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    survey: Object,
    showToggle: Boolean
  },
  data() {
    return {};
  },
  methods: {
    deleteSurvey() {
      this.$emit("deleteSurvey");
    },
    handleChange() {
      this.$emit("onPublishSurvey");
    },
    viewSurvey() {
      this.$emit("viewSurvey");
    },
  },
};
</script>

<style>
</style>
