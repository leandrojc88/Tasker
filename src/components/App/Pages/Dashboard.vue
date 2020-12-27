<template>
  <v-container fluid class="pa-0">
    <!-- Toolbar -->
    <v-toolbar color="white" class="bgopacity" dense>
      <v-toolbar-title style="width: 100%;" class="d-flex justify-center">
        <v-icon left>$dashboard</v-icon>Dashboard
      </v-toolbar-title>
    </v-toolbar>

    <!-- Content -->
    <v-container fluid class="d-flex scrolled pt-2" style="height: 85vh;">
      <Table
        v-if="open_table"
        open
        :idtable="open_table.id"
        :position="open_table.position"
        :is__last="is__last(-1)"
        @createnewtable="createNewTable"
      />
      <draggable class="d-flex" :list="list__tablesPositioned" group="tables" @change="onChange">
        <Table
          v-for="(item,index) in list__tablesPositioned"
          :key="index"
          :idtable="item.id"
          :position="item.position"
          :name="item.name"
          :is__last="is__last(index)"
          @createnewtable="createNewTable"
          @sevetable="saveTable"
        />
      </draggable>
      <Table
        v-if="close_table"
        class="mr-5"
        close
        :idtable="close_table.id"
        :position="close_table.position"
      />
      <div style="opacity: 0;">.</div>
    </v-container>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import projects_mixin from "../mixin/projects_mixin";
import draggable from "vuedraggable";

export default {
  mixins: [projects_mixin],
  components: { draggable },
  data: () => ({
    openclose: {}
  }),
  // -------------------- Hoocks -------------------------------
  async mounted() {
    await this.loadDashboardProject();
    this.loadTables(this.dashboard__project.id);
  },
  // -------------------- Computed -------------------------------

  computed: {
    ...mapState("app", ["dashboard__project"])
  },
  // -------------------- Methods -------------------------------
  methods: {
    ...mapActions("app", ["loadDashboardProject"]),

    /**
     * Save table in the project, using the mixin saveTableToProject()
     */
    saveTable(table) {
      this.saveTableToProject({ table, projectId: this.dashboard__project.id });
    }
  }
};
</script>

<style scoped>
.scrolled {
  overflow-x: auto;
  overflow-y: hidden;
}
.bgopacity {
  background-color: rgba(255, 255, 255, 0.45) !important;
}
</style>