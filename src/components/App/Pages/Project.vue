<template>
  <v-container fluid class="pa-0">
    <!-- Toolbar -->
    <v-toolbar color="white" style="background-color: rgba(255,255,255,.45) !important;" dense>
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
    <v-container fluid class="d-flex">
      <Table table-type="open" />
      <Table />
      <Table table-type="close" />
    </v-container>Manage Project
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
import Table from "../Organisms/Table";
import ManageProject from "../Molecules/ManageProject";

import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  components: { Table, ManageProject },
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
  computed: {
    ...mapGetters("app", ["getProjectByPk"])
  },
  watch: {
    $route(to, from) {
      this.asignData();
    }
  },
  mounted() {
    this.asignData();
  },
  methods: {
    ...mapActions("app", ["onDeleteProject"]),
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
    asignData() {
      Object.assign(this.project, {
        id: this.$route.params.id,
        name: this.$route.params.project_name,
        description: this.description
      });
    }
  }
};
</script>