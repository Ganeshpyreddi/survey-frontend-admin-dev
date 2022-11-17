<template>
  <v-row class="list_table_item">
    <v-col cols="9" sm="2">
      <span>{{ admin.username }}</span>
    </v-col>
    <v-col cols="9" sm="2">
      <span> {{ admin.email }}</span>
    </v-col>
      <!-- <v-col cols="9" sm="2">
      <span> {{ 5 }}</span>
    </v-col> -->
    <v-col cols="9" sm="1">
      <v-btn size="x-small" icon="mdi-format-list-bulleted-type" @click="viewAdmin" />
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteAdmin" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    admin: Object,
  },
  data() {
    return {};
  },
  methods: {
    deleteAdmin() {
      this.$emit("deleteAdmin");
    },
    viewAdmin() {
      this.$emit("viewAdmin");
    },
  },
};
</script>
