<template>
  <v-container fluid class="pa-0">
    <!-- Toolbar -->
    <v-toolbar color="white" style="background-color: rgba(255,255,255,.45) !important;" dense>
      <v-toolbar-title style="width: 100%;" class="d-flex justify-center">
        <v-icon left>$project</v-icon>
        {{ $route.params.project_name.firstUpperCase() }}
      </v-toolbar-title>
      <v-btn class="ml-auto" color="teal darken-4" icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn color="red darken-4" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Content -->
    <v-container fluid class="d-flex">
      <Table table-type="open" />
      <Table />
      <Table table-type="close" />
    </v-container>
  </v-container>
</template>
<script>
import Table from "../Organisms/Table";

export default {
  components: { Table }
};
</script>