<template>
  <v-card min-width="300" width="300" height="max-content" color="bggrey" class="mx-2">
    <v-card-title primary-title class="justify-center pa-2">
      <!-- Table Name -->
      <v-row no-gutters style="height: 36px;" class="align-center">
        <v-col class="d-flex justify-center" cols="1">
          <v-btn
            icon
            v-if="is_not__close__open && !is__edit"
            :disabled="is__edit"
            @click="confirm = true"
          >
            <v-icon>$delete</v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-center" cols="10">
          <v-sheet v-if="is__edit" class="d-flex" color="transparent">
            <v-text-field
              ref="send"
              dense
              class="pr-2 ma-0"
              autofocus
              name="name"
              placeholder="Nombre de tabla"
              v-model="edit__table__name"
              :rules="[rules.requiere, rules.notOpenClose]"
              @keypress.enter="saveTable"
              @keypress.esc="cancelEdit"
            ></v-text-field>
            <v-btn small icon @click="cancelEdit">
              <v-icon>$close</v-icon>
            </v-btn>
          </v-sheet>
          <div
            @dblclick="showEdit"
            v-else
            :class="{'blue--text text--darken-4': open, 'red--text text--darken-4':close}"
          >{{table__name}}</div>
        </v-col>
        <v-col class="d-flex justify-center" cols="1">
          <v-btn icon class="ml-auto" v-if="!close && is__last && !is__edit" @click="createTable">
            <v-icon>$add</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider></v-divider>

    <!-- list Tasks -->
    <v-card-text class="table-overflow pa-2">
      <draggable :list="list__tasks" group="task" @change="onChange">
        <task
          v-for="(itemT,indexT) in list__tasks"
          :key="indexT"
          :idtask="itemT.id"
          :name="itemT.name"
          :idtable="idtable"
          :img="itemT.img"
          :count_subtask="{subtasks: itemT.subtasks, done_subtask: itemT.done_subtask}"
          @createtask="createTask"
          @edittask="editTask"
          @deletetask="deleteTask"
        />
      </draggable>
      <manage-task
        :idtable="idtable"
        @createtask="createTask"
        @on-close="create__task=false"
        v-if="create__task"
      />

      <!-- new Task -->
      <v-btn text small class="mt-2" @click="create__task = true">
        <v-icon size="16" left>$add_circle</v-icon>
        <span class="text-capitalize caption">Nueva Tarea...</span>
      </v-btn>
    </v-card-text>

    <!-- Dialogo de confirmacion de ELIMINAR -->
    <v-bottom-sheet v-model="confirm">
      <v-sheet class="text-center" height="200px">
        <v-btn class="ma-3 mt-6" outlined @click="confirm = false">Cancelar</v-btn>
        <v-btn class="ma-3 mt-6" dark color="error" @click="deleteTable">Confirmar</v-btn>
        <div class="py-3">
          Seguro que desea eliminar la tabla:
          <strong>{{ name }}</strong>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </v-card>
</template>

<script>
import Task from "../Molecules/Task";
import ManageTask from "../Molecules/ManageTask";
import draggable from "vuedraggable";
import { mapActions, mapMutations } from "vuex";

export default {
  components: { Task, ManageTask, draggable },
  props: {
    close: { type: Boolean },
    open: { type: Boolean },
    is__last: { type: Boolean },
    idtable: { type: Number },
    position: { type: Number },
    name: { type: String, default: "..." }
  },
  data: () => ({
    edit__mode: false,
    is__edit: false,
    create__task: false,
    confirm: false,
    list__tasks: [],
    edit__table__name: "",
    rules: {
      requiere: v => !!v || "Campo obligatorio",
      notOpenClose: v =>
        (v.toLowerCase() !== "open" && v.toLowerCase() !== "close") ||
        "No puede utilizar Open o Close"
    }
  }),
  // -------------------- Hooks -------------------------------

  async created() {
    if (this.idtable === -1) this.is__edit = true;
  },
  // -------------------- Computed -------------------------------
  computed: {
    table__name() {
      if (this.open) return "Open";
      if (this.close) return "Close";
      else return this.name;
    },
    is_not__close__open() {
      return !this.close && !this.open;
    }
  },
  watch: {
    idtable(v) {
      this.list__tasks = [];
      this.loadDatas();
    }
  },
  // -------------------- Methods -------------------------------
  methods: {
    ...mapMutations("app", ["deleteTempTable"]),
    ...mapActions("app", ["saveImage", "onEditTable", "onDeleteTable"]),
    // .......... Tasks .........

    onChange(evt) {
      if (evt.hasOwnProperty("added")) {
        //add
        const data = evt.added;
        this.axios.put(`/task/movedtotable/${data.element.id}`, {
          poss: data.newIndex + 1,
          tableId: this.idtable
        });
      } else if (evt.hasOwnProperty("moved")) {
        // move
        const data = evt.moved;
        this.axios.put(`/task/moved/${data.element.id}`, {
          oldposs: data.oldIndex + 1,
          newposs: data.newIndex + 1
        });
      }
    },

    async loadDatas() {
      const res = await this.axios.get(`/task/${this.idtable}`);
      this.list__tasks = res.data;
      // save images
      this.list__tasks.forEach(el => {
        if (el.img) {
          this.saveImage({ id: el.id, img: el.img });
        }
      });
    },

    createTask(task) {
      this.list__tasks.push(task);
      this.create__task = false;
    },

    editTask(task) {
      const poss = this.list__tasks.findIndex(el => el.id === task.id);
      this.list__tasks.splice(poss, 1, {
        id: task.id,
        name: task.name,
        tableId: task.tableId
      });
    },

    deleteTask(idtask) {
      const poss = this.list__tasks.findIndex(el => el.id === idtask);
      this.list__tasks.splice(poss, 1);
    },

    //........... table ..............

    createTable() {
      this.$emit("createnewtable", this.position);
    },
    saveTable() {
      if (this.$refs.send.validate()) {
        if (!this.edit__mode) {
          // add
          this.$emit("sevetable", {
            name: this.edit__table__name,
            position: this.position
          });
        } else {
          this.onEditTable({
            table: { name: this.edit__table__name, position: this.position },
            id_table: this.idtable
          });
        }
        this.is__edit = false;
      }
    },
    showEdit() {
      if (!this.open && !this.close) {
        this.is__edit = true;
        this.edit__mode = true;
        this.edit__table__name = this.name;
      }
    },
    deleteTable() {
      this.onDeleteTable(this.idtable);
      this.confirm = false;
    },
    cancelEdit() {
      this.is__edit = false;
      this.deleteTempTable();
    }
  }
};
</script>

<style scoped>
.table-overflow {
  max-height: 74vh;
  overflow-y: auto;
}
</style>