<template>
  <v-card class="my-2 pr-1 align-center">
    <v-textarea
      ref="namesubtask"
      class="pa-1 pb-0"
      autofocus
      placeholder="Nueva sub tarea"
      auto-grow
      outlined
      v-model="dname"
      rows="1"
      row-height="15"
      :rules="[rules.require]"
      dense
    ></v-textarea>
    <v-card-actions class="pt-0">
      <v-btn small icon @click="eventClose">
        <v-icon>$close</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn x-small v-if="!edit" color="primary" @click="createSubTask">Crear</v-btn>
      <v-btn x-small v-else color="warning" @click="saveSubTask">Guardar</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  props: {
    idtask: Number,
    edit: Boolean,
    name: String,
    idsubtask: Number
  },
  data: () => ({
    dname: "",
    rules: {
      require: val => !!val || "Campo obligatorio"
    }
  }),
  beforeMount() {
    this.dname = this.name;
  },
  // ----------------------- Methods ---------------------
  methods: {
    ...mapMutations(["showNotify"]),

    async createSubTask() {
      if (this.$refs.namesubtask.validate()) {
        try {
          const res = await this.axios.post("/subtask", {
            name: this.dname,
            taskId: this.idtask
          });
          this.$emit("createsubtask", res.data);
          this.showNotify({ msg: "sub tarea creada satisfactoriamente" });
        } catch (error) {
          this.showNotify({
            msg: `Error Nueva sub tarea : ${error}`,
            color: "error"
          });
        }
      }
    },

    async saveSubTask() {
      if (this.$refs.namesubtask.validate()) {
        try {
          const data = {
            name: this.dname,
            taskId: this.idtask
          };
          const res = await this.axios.put(`/subtask/${this.idsubtask}`, data);
          if (res.data) {
            this.$emit("editsubtask", { id: this.idsubtask, ...data });
            this.showNotify({ msg: "sub tarea editada satisfactoriamente" });
          } else throw new Error("Error al editar sub tarea");
        } catch (error) {
          this.showNotify({
            msg: `Error editar tarea : ${error}`,
            color: "error"
          });
        }
      }
    },

    eventClose() {
      this.$emit("on-close");
    }
  }
};
</script>