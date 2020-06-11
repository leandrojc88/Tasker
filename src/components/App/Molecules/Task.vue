<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :class="style__edit" class="d-block mb-1" @dblclick="editMode">
      <!-- Edit Task -->
      <manage-task
        @edittask="editTask"
        @deletetask="deleteTask"
        v-if="is__edit"
        :idtask="didtask"
        :name="dname"
        :idtable="didtable"
        edit
        v-on:on-close="is__edit=false"
      ></manage-task>

      <!-- edit & Subtask  -->
      <v-sheet class="d-flex align-center" v-else>
        <v-card-text width="100px" class="pa-2 text--primary body-2">{{ dname }}</v-card-text>
        <v-btn small icon v-if="hover && !is__edit">
          <v-icon size="16">$edit</v-icon>
        </v-btn>
      </v-sheet>

      <!-- Menu select Tables (show__menu || hover) &&   open-on-hover-->
      <v-sheet v-if="false">
        <v-menu offset-y open-on-hover v-model="show__menu">
          <template v-slot:activator="{on}">
            <v-btn color="primary" small icon v-on="on">
              <v-icon>$task</v-icon>
            </v-btn>
          </template>
          <v-list class="pa-0">
            <v-card outlined >
              <!-- <v-card-title class="ma-0 pa-3 subtitle-2">Mover a otra Tabla:</v-card-title> -->
              <v-card-text class="d-flex flex-column">
                <!-- <v-divider class="mb-2"></v-divider> -->
                <v-sheet class="mb-2 d-flex justify-space-between">
                  <v-chip small class="mr-2" outlined color="blue darken-4" dark @click>Open</v-chip>
                  <v-chip small color="red darken-4" outlined @click>Close</v-chip>
                </v-sheet>
                <v-chip small class="mb-2" color="primary" label outlined @click> <v-icon x-small left>$task</v-icon>En proceso</v-chip>
                <v-chip small class="mb-2" color="primary" label outlined @click> <v-icon x-small left>$task</v-icon>Pendiente</v-chip>
              </v-card-text>
            </v-card>
          </v-list>
        </v-menu>
      </v-sheet>

      <!-- Dialogo de confirmacion de ELIMINAR -->
      <v-bottom-sheet v-model="confirm">
        <v-sheet class="text-center" height="200px">
          <v-btn class="ma-3 mt-6" outlined @click="confirm = false">Cancelar</v-btn>
          <v-btn class="ma-3 mt-6" dark color="error" @click="confirmDelete">Confirmar</v-btn>
          <div class="py-3">
            Seguro que desea eliminar la tarea:
            <strong>{{ name }}</strong>
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </v-card>
  </v-hover>
</template>
<script>
import ManageTask from "./ManageTask";
import { mapMutations } from "vuex";

export default {
  components: { ManageTask },
  props: {
    idtask: Number,
    name: String,
    idtable: Number
  },
  data: () => ({
    confirm: false,
    is__edit: false,
    show__menu: false,
    edit__item: {
      name: "",
      id: ""
    },
    dname: "",
    didtask: "",
    didtable: "",
    rules: {
      require: val => !!val || "Campo obligatorio"
    }
  }),
  computed: {
    style__edit() {
      return this.is__edit ? "" : "pr-2";
    }
  },
  watch: {
    name(v) {
      this.loadData();
    }
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    ...mapMutations(["showNotify"]),
    loadData() {
      this.didtask = this.idtask;
      this.dname = this.name;
      this.didtable = this.idtable;
    },
    editMode() {
      this.is__edit = true;
      this.edit__item = {
        id: this.didtask,
        name: this.dname
      };
    },
    editTask(data) {
      this.$emit("edittask", data);
      this.dname = data.name;
      this.is__edit = false;
    },
    async deleteTask() {
      this.confirm = true;
    },
    async confirmDelete() {
      try {
        const res = await this.axios.delete(`/task/${this.idtask}`);
        if (res.data) {
          this.$emit("deletetask", this.idtask);
          this.is__edit = false;
          this.confirm = false;
          this.showNotify({ msg: "Tarea eliminada satisfactoriamente" });
        } else throw new Error("Error al eliminar tarea");
      } catch (error) {
        this.showNotify({
          msg: `Error eleiminar tarea : ${error}`,
          color: "error"
        });
      }
    },

    defineDragDrop(ev) {
      // drag & drop
      return function dragstart_handler(ev) {
        // Add the target element's id to the data transfer object
        ev.dataTransfer.setData("text/plain", ev.target.innerText);
      };
    }
  }
};
</script>