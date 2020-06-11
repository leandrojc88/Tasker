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
        v-if="task__close"
        open
        :idtable="task__open.id"
        :possition="task__open.possition"
        :is__last="is__last(-1)"
        @createnewtable="createNewTable"
      />
      <Table
        v-for="(item,index) in list__tablesPositioned"
        :key="index"
        :idtable="item.id"
        :possition="item.possition"
        :name="item.name"
        :is__last="is__last(index)"
        @createnewtable="createNewTable"
        @sevetable="saveTable"
        @changetable="editTable"
        @deletetable="deleteTable"
        @moveto="moveTo"
      />
      <Table
        v-if="task__close"
        class="mr-5"
        close
        :idtable="task__close.id"
        :possition="task__close.possition"
      />
      <div style="opacity: 0;">.</div>
    </v-container>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import projects_mixin from "../mixin/projects_mixin";

export default {
  mixins: [projects_mixin],
  data: () => ({
    openclose: {}
  }),
  // -------------------- Hoocks -------------------------------
  async mounted() {
    await this.loadDashboardProject();
    const res = await this.axios.get(`/table/${this.dashboard__project.id}`);
    const resOpnCls = await this.axios.get(
      `/table/openandclose/${this.dashboard__project.id}`
    );
    this.list__tables = res.data;
    this.table__openclose = resOpnCls.data;
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
      this.saveTableToProject(table, this.dashboard__project.id);
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