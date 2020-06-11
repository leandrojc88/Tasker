<template>
  <v-container fluid class="pa-0">
    <!-- Toolbar -->
    <v-toolbar color="white" class="bgopacity" dense>
      <v-toolbar-title style="width: 100%;" class="d-flex justify-center">
        <v-icon left>$project</v-icon>
        {{ project.name.firstUpperCase()}}
      </v-toolbar-title>
      <v-btn class="ml-auto" color="teal darken-4" icon @click="onEditProject">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn color="red darken-4" icon @click="confirm = true">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
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

    <!-- Edit project data -->
    <v-dialog
      v-model="dialog__project"
      transition="dialog-transition"
      width="fit-content"
      persistent
    >
      <manage-project @close="closeEdit" edit :project="edit__project" />
    </v-dialog>

    <!-- Dialogo de confirmacion de ELIMINAR -->
    <v-bottom-sheet v-model="confirm">
      <v-sheet class="text-center" height="200px">
        <v-btn class="ma-3 mt-6" outlined @click="confirm = false">Cancelar</v-btn>
        <v-btn class="ma-3 mt-6" dark color="error" @click="deleted">Confirmar</v-btn>
        <div class="py-3">Seguro que desea eliminar el projecto</div>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ManageProject from "../Molecules/ManageProject";
import project_mixin from "../mixin/projects_mixin";

export default {
  components: { ManageProject },
  mixins: [project_mixin],
  props: ["description"],
  data: () => ({
    dialog__project: false,
    confirm: false,
    project: {
      id: "",
      name: ""
    },
    edit__project: {}
  }),

  // -------------------- Hoocks -------------------------------
  mounted() {
    this.asignData();
  },

  // -------------------- Computed -------------------------------
  computed: {
    ...mapGetters("app", ["getProjectByPk"])
  },
  watch: {
    $route(to, from) {
      this.asignData();
    }
  },

  // -------------------- Methods -------------------------------
  methods: {
    ...mapActions("app", ["onDeleteProject"]),

    // Save Tables
    saveTable(table) {
      this.saveTableToProject(table, this.project.id);
    },

    // CRUD projects

    deleted() {
      this.onDeleteProject(this.project);
      this.$router.push({ path: "/app" });
    },

    onEditProject() {
      const proj = this.getProjectByPk(this.$route.params.id);
      this.edit__project = Object.assign(
        {},
        { ...this.project, description: proj.description }
      );
      this.dialog__project = true;
    },

    closeEdit() {
      this.edit__project = null;
      this.dialog__project = false;
    },

    async asignData() {
      this.project = Object.assign(
        {},
        {
          id: this.$route.params.id,
          name: this.$route.params.project_name,
          description: this.description
        }
      );

      const res = await this.axios.get(`/table/${this.project.id}`);
      const resOpnCls = await this.axios.get(
        `/table/openandclose/${this.project.id}`
      );
      this.list__tables = res.data;
      this.table__openclose = resOpnCls.data;
    }
  }
};
</script>
<style scoped>
.bgopacity {
  background-color: rgba(255, 255, 255, 0.45) !important;
}
.scrolled {
  overflow: auto;
}
</style>