<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :class="style__edit"
      class="d-block mb-1 pt-1"
      style="padding-right: 0 !important;"
      @dblclick="editMode"
    >
      <v-img max-width="90%" class="mx-auto" max-height="20rem" contain v-if="src" :src="src" />
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
        <v-card-text width="100px" class="pa-2 pr-6 text--primary body-2">{{ dname }}</v-card-text>
        <v-btn
          v-show="hover && !is__edit"
          style="position: absolute; right: 2px;"
          small
          icon
          @click="openCardSubTask"
        >
          <v-icon size="16">$edit</v-icon>
        </v-btn>
      </v-sheet>

      <!-- Menu select Tables (show__menu || hover) &&   open-on-hover-->
      <v-sheet v-if="show_details" class="px-2 pb-1 caption">
        <v-icon size="18">$checks</v-icon>
        {{count_subtasks}}
        <v-icon size="18" class="ml-2">mdi-calendar-clock</v-icon>2 dias
        <span v-show="hover">(25/6/2020)</span>
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
import { mapMutations, mapState } from "vuex";
import CardSubTask from "../Organisms/CardSubTask";

export default {
  components: { ManageTask, CardSubTask },
  props: {
    idtask: Number,
    name: String,
    idtable: Number,
    count_subtask: Object
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
    dcount_subtask: null,
    rules: {
      require: val => !!val || "Campo obligatorio"
    }
  }),
  computed: {
    ...mapState("app", ["taskId__selected", "task_count_subtask", "images"]),
    style__edit() {
      return this.is__edit ? "" : "pr-2";
    },
    show_details() {
      return !!this.count_subtasks;
    },
    count_subtasks() {
      if (this.taskId__selected === this.idtask)
        this.dcount_subtask = this.task_count_subtask;
      return this.dcount_subtask;
    },
    src() {
      const sel = this.images.find(el => el.id === this.idtask);
      return sel ? sel.img : "";
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
    ...mapMutations("app", ["setDialogSubtask", "setTaskidSelected"]),
    ...mapMutations(["showNotify"]),
    loadData() {
      this.didtask = this.idtask;
      this.dname = this.name;
      this.didtable = this.idtable;
      this.dcount_subtask = this.count_subtask.subtasks
        ? `${this.count_subtask.done_subtask}/${this.count_subtask.subtasks}`
        : "";
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
    openCardSubTask() {
      this.setTaskidSelected(this.idtask);
      this.setDialogSubtask(true);
    }
  }
};
</script>