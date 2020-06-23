<template>
  <v-card min-width="450" width="500" height="570">
    <v-toolbar dense max-height="48" fixed primary-title flat>
      <v-toolbar-title>
        <v-icon left>mdi-format-list-bulleted</v-icon>Administración del ProGraf
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon small class="mr-0" @click="$emit('close')">
        <v-icon>$close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text dense class="pt-3 px-3">
      <v-tabs background-color="transparent" grow v-model="tab">
        <v-tab dark slider-color="primary">
          <v-icon left>$checks</v-icon>
          <span>Sub Tareas</span>
        </v-tab>
        <v-tab dark slider-color="primary">
          <v-icon left>mdi-image</v-icon>
          <span>Imagen</span>
        </v-tab>
        <v-tab dark slider-color="primary">
          <v-icon left>mdi-calendar-clock</v-icon>
          <span>Tiempo</span>
        </v-tab>
      </v-tabs>
      <!-- ............. Tasks ................... -->
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <div class="mt-3 title d-flex" color="transparent" dense flat>
            <v-icon left>$checks</v-icon>
            <span>Sub Tareas</span>
            <v-spacer></v-spacer>
            <span>{{doneTo}}</span>
          </div>
          <v-progress-linear :value="percentage" class="my-1"></v-progress-linear>
          <p class="text-end subtitle-2">{{percentage}}%</p>

          <!-- subTask items -->

          <v-sheet class="mt-4">
            <sub-task
              @delete="deleteSubtask"
              @changedone="changeDone"
              :id="item.id"
              :name="item.name"
              :done="item.done"
              v-for="(item,index) in list_subtasks"
              :key="index"
            />
          </v-sheet>
          <!-- new SubTask -->
          <manage-sub-task
            :idtask="taskId__selected"
            @createsubtask="createSubTask"
            @on-close="create__subtask=false"
            v-if="create__subtask"
          />
          <!-- new SubTask -->
          <v-btn text small class="mt-2" @click="create__subtask = true">
            <v-icon size="16" left>$add_circle</v-icon>
            <span class="text-capitalize caption">Nueva Sub Tarea...</span>
          </v-btn>
        </v-tab-item>

        <!-- ............. Imagen ................... -->
        <v-tab-item>
          <v-hover v-slot:default="{ hover }">
            <v-img class="mx-auto my-3" content height="300" width="95%">
              <v-btn fab small color="error" class="ml-2 mt-2" v-show="hover">
                <v-icon>$delete</v-icon>
              </v-btn>
            </v-img>
          </v-hover>
          <v-form class="px-8">
            <v-file-input
              v-model="fileupload"
              dense
              show-size
              outlined
              hide-details
              filled
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Seleccione la Imagen"
              @change="changeLoad"
            ></v-file-input>
            <v-btn class="mt-2" block color="success" @click>
              <v-icon size="20" left>mdi-image-edit-outline</v-icon>Guardar
            </v-btn>
          </v-form>
        </v-tab-item>

        <!-- ............. Tiempo ................... -->
        <v-tab-item>
          <div class="d-flex align-center mt-3">
            <!-- <span class="body-1 pl-2">Fecha de finalizacion:</span> -->
            <v-spacer></v-spacer>
            <v-btn color="error" outlined small class="mb-1">
              <v-icon left>mdi-calendar-remove-outline</v-icon>Sin Tiempo
            </v-btn>
          </div>
          <v-sheet class="d-flex px-2 justify-space-between my-3">
            <span class="headline">{{date_show}}</span>
            <span class="headline">{{count_days}} días</span>
          </v-sheet>
          <div class="d-flex justify-center">
            <v-date-picker
              locale="es-es"
              no-title
              color="primary"
              class="mr-2"
              v-model="picker"
              full-width
              :min="new Date().toISOString().substr(0, 10)"
              first-day-of-week="1"
            >
              <v-spacer></v-spacer>
              <v-btn color="success" block :disabled="false">
                <v-icon left size="18">mdi-check</v-icon>Asignar fecha
              </v-btn>
            </v-date-picker>
          </div>
        </v-tab-item>

        <!-- Dialogo de confirmacion de ELIMINAR -->
        <v-bottom-sheet v-model="confirm">
          <v-sheet class="text-center" height="200px">
            <v-btn class="ma-3 mt-6" outlined @click="confirm = false">Cancelar</v-btn>
            <v-btn class="ma-3 mt-6" dark color="error" @click="confirmDelete">Confirmar</v-btn>
            <div class="py-3">Seguro que desea eliminar la sub tarea?</div>
          </v-sheet>
        </v-bottom-sheet>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>
<script>
import SubTask from "../Molecules/SubTask";
import ManageSubTask from "../Molecules/ManageSubTask";
import { mapState, mapMutations } from "vuex";
export default {
  components: { SubTask, ManageSubTask },
  data: () => ({
    is_done: false,
    confirm: false,
    show_selector_img: false,
    create__subtask: false,
    src: "",
    tab: null,
    fileupload: [],
    list_subtasks: [],
    delete_subtask: null,
    picker: "2020-07-08"
  }),
  mounted() {
    this.loadDatas();
  },
  // --------------------- Compouted ----------------------
  watch: {
    taskId__selected(v) {
      this.loadDatas();
    }
  },
  computed: {
    ...mapState("app", ["taskId__selected"]),
    percentage() {
      const done = this.list_subtasks.filter(el => el.done === true);
      const porcentage = (done.length * 100) / this.list_subtasks.length;
      return porcentage ? Math.round(porcentage) : 0;
    },
    doneTo() {
      const done = this.list_subtasks.filter(el => el.done === true);
      this.setTaskCountSubtaskTo({
        done_subtask: done.length,
        subtasks: this.list_subtasks.length
      });
      return `${done.length}/${this.list_subtasks.length}`; //##.##
    },
    count_days() {
      const count = new Date(this.picker);
    },
    date_show() {
      console.log(this.picker);
      return new Date(this.picker+' 10:00:00').toLocaleDateString("es-es", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
  },
  // --------------------- Methods ----------------------
  methods: {
    ...mapMutations(["showNotify"]),
    ...mapMutations("app", ["setTaskCountSubtaskTo"]),
    changeLoad(file) {
      /* console.log("dentro", file);
      console.log("fileupload", this.fileupload); */
      const fd = new FormData();
      fd.append("file", file);
      this.axios.post(`/task/upload_img/${1}`, fd);
    },
    async loadDatas() {
      if (this.taskId__selected != -1) {
        const res = await this.axios.get(`/subtask/${this.taskId__selected}`);
        this.list_subtasks = res.data;

        const res2 = await this.axios.get(
          "/task/load_img/" + this.taskId__selected
        );
        //console.log(res2);
        return res2.data;
      }
    },
    async url() {
      const res2 = await this.axios.get(
        "/task/load_img/" + this.taskId__selected
      );
      console.log(res2);
      return res2.data;
    },
    createSubTask(data) {
      this.list_subtasks.push(data);
      this.create__subtask = false;
    },
    deleteSubtask(id) {
      this.delete_subtask = id;
      this.confirm = true;
    },
    changeDone(data) {
      const poss = this.list_subtasks.findIndex(el => el.id === data.id);
      this.list_subtasks[poss].done = data.value;
    },
    confirmDelete() {
      try {
        const res = this.axios.delete(`/subtask/${this.delete_subtask}`);
        const poss = this.list_subtasks.findIndex(
          el => el.id === this.delete_subtask
        );
        this.list_subtasks.splice(poss, 1);
        this.showNotify({ msg: "Eliminada correctamente" });
      } catch (error) {
        this.showNotify({
          msg: "no se pudo eliminar correctamente" + error,
          color: "error"
        });
      }
      this.confirm = false;
    }
  }
};
</script>