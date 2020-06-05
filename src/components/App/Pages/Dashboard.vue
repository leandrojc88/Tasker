<template>
  <v-container fluid class="pa-0">
    <!-- Toolbar -->
    <v-toolbar color="white" style="background-color: rgba(255,255,255,.45) !important;" dense>
      <v-toolbar-title style="width: 100%;" class="d-flex justify-center">
        <v-icon left>$dashboard</v-icon>Dashboard
      </v-toolbar-title>      
    </v-toolbar>

    <!-- Content -->
    <v-container fluid class="d-flex">
      <!-- <Table table-type="open" /> -->
      <Table open />
      <Table name="hola" />
      <Table close />
      <!-- <Table table-type="close" /> -->
    </v-container>
  </v-container>
</template>

<script>
import Table from "../Organisms/Table";
import { mapState, mapActions } from "vuex";

export default {
  components: { Table },
  data: () => ({}),
  beforeMount() {
    this.loadDashboardProject();
  },
  computed: {
    ...mapState("app", ["dashboard__project"])
  },
  methods: {
    ...mapActions("app", ["loadDashboardProject"]),    
  }
};
</script>