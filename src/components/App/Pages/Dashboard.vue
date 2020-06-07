<template>
  <v-container fluid class="pa-0">
    <!-- Toolbar -->
    <v-toolbar color="white" style="background-color: rgba(255,255,255,.45) !important;" dense>
      <v-toolbar-title style="width: 100%;" class="d-flex justify-center">
        <v-icon left>$dashboard</v-icon>Dashboard
      </v-toolbar-title>
    </v-toolbar>

    <!-- Content -->
    <v-container fluid class="d-flex scrolled" style="height: 85vh;">
      <Table
        open
        :idtable="task__open.id"
        :possition="task__open.possition"
        :tasks="task__open.tasks"
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
      />
      <Table
        class="mr-5"
        close
        :idtable="task__close.id"
        :possition="task__close.possition"
        :tasks="task__close.tasks"
      />
      <div style="opacity: 0;">.</div>
    </v-container>
  </v-container>
</template>

<script>
import Table from "../Organisms/Table";
import { mapState, mapActions, mapMutations } from "vuex";
import { addTable } from "../../../api";

export default {
  components: { Table },
  data: () => ({
    new__table: false,
    list__tables: [],
    table__open: {},
    table__close: {}
  }),
  // -------------------- Hoocks -------------------------------
  async mounted() {
    await this.loadDashboardProject();
    const res = await this.axios.get(`/table/${this.dashboard__project.id}`);
    const resOpnCls = await this.axios.get(
      `/table/openandclose/${this.dashboard__project.id}`
    );
    this.list__tables = res.data;
    this.table__open = resOpnCls.data[0];
    this.table__close = resOpnCls.data[1];
  },
  // -------------------- Computed -------------------------------

  computed: {
    ...mapState("app", ["dashboard__project"]),
    task__open() {
      return this.table__open ? this.table__open : { tasks: [] };
    },
    task__close() {
      return this.table__close ? this.table__close : { tasks: [] };
    },
    list__tablesPositioned() {
      return this.list__tables.sort((a, b) =>
        a.possition < b.possition ? true : false
      );
    }
  },
  // -------------------- Methods -------------------------------
  methods: {
    ...mapActions("app", ["loadDashboardProject"]),
    ...mapMutations(["showNotify"]),

    createNewTable(poss) {
      this.list__tables.push({
        id: -2,
        name: "Creando tabla...",
        possition: poss + 1
      });
    },

    async saveTable(table) {
      try {
        const res = await this.axios.post("/table", {
          ...table,
          projectId: this.dashboard__project.id
        });
        this.$set(this.list__tables, this.list__tables.length - 1, res.data);
        this.showNotify({ msg: "Tabla creada sarisfactoriamente!" });
      } catch (error) {
        this.showNotify({
          msg: "error Tabla creada: " + error,
          color: "error"
        });
      }
    },

    async editTable(table, id__table) {
      try {
        const res = await this.axios.put(`/table/${id__table}`, {
          ...table
        });
        this.list__tables.splice(
          this.list__tables.findIndex(el => el.id === id__table),
          1,
          { id: id__table, ...table }
        );
        this.showNotify({ msg: "Tabla editada sarisfactoriamente!" });
      } catch (error) {
        this.showNotify({
          msg: "error Tabla editada: " + error,
          color: "error"
        });
      }
    },

    is__last(index) {
      return this.list__tables.length - 1 === index;
    },

    async deleteTable(id) {
      try {
        const deleted = await this.axios.delete(`/table/${id}`);
        this.list__tables.splice(
          this.list__tables.findIndex(el => el.id === id),
          1
        );
         this.showNotify({ msg: "Tabla eliminada sarisfactoriamente!" });
      } catch (error) {
        this.showNotify({
          msg: "error Tabla eliminada: " + error,
          color: "error"
        });
      }
    }
  }
};
</script>

<style scoped>
.scrolled {
  overflow: auto;
}
</style>