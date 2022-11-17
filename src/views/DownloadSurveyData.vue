<template>
  <download-csv :data="fileData" name="survey-report-data">
    <v-btn tile color="orange" style="margin-top: 10px"
      >DOWNLOAD SURVEY REPORT <v-icon right>mdi-download</v-icon>
    </v-btn>
  </download-csv>
</template>
<script>
import JsonCSV from "vue-json-csv";
export default {
  components: {
    downloadCsv: JsonCSV,
  },
  props: {
    fileData: Array,
  },
};
</script>