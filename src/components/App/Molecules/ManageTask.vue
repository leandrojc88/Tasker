<template>
  <v-card class="my-2 pr-1 align-center">
    <v-textarea
      ref="nametask"
      class="pa-1 pb-0"
      autofocus
      placeholder="Nueva tarea"
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
      <v-btn small v-if="edit" color="error" icon @click="deleteTask">
        <v-icon>$delete</v-icon>
      </v-btn>
      <v-btn x-small v-if="!edit" color="primary" @click="createTask">Crear</v-btn>
      <v-btn x-small v-else color="warning" @click="saveTask">Guardar</v-btn>
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
    idtable: Number
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

    async createTask() {
      if (this.$refs.nametask.validate()) {
        try {
          const res = await this.axios.post("/task", {
            name: this.dname,
            tableId: this.idtable
          });
          this.$emit("createtask", res.data);
          this.showNotify({ msg: "Nueva tarea creada satisfactoriamente" });
        } catch (error) {
          this.showNotify({
            msg: `Error Nueva tarea : ${error}`,
            color: "error"
          });
        }
      }
    },

    async saveTask() {
      if (this.$refs.nametask.validate()) {
        try {
          const data = {
            name: this.dname,
            tableId: this.idtable
          };
          const res = await this.axios.put(`/task/${this.idtask}`, data);
          if (res.data) {
            this.$emit("edittask", { id: this.idtask, ...data });
            this.showNotify({ msg: "Tarea editada satisfactoriamente" });
          } else throw new Error("Error al editar tarea");
        } catch (error) {
          this.showNotify({
            msg: `Error editar tarea : ${error}`,
            color: "error"
          });
        }
      }
    },

    async deleteTask() {
      this.$emit("deletetask");
    },

    eventClose() {
      this.$emit("on-close");
    }
  }
};
</script>