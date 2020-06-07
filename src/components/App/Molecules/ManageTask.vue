<template>
  <v-card class="my-2 pr-1 align-center">
    <v-textarea
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
      <v-btn color="error" small icon @click="eventClose">
        <v-icon>$close</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn x-small v-if="!edit" color="primary" @click="createTask">Crear</v-btn>
      <v-btn x-small v-else color="info" @click="saveTask">Guardar</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {

  props: {
    edit: Boolean,
    name: String
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
  methods: {
    createTask(){
      if(this.$refs.form.valid()){
       
      }
    },
    eventClose() {
      this.$emit("on-close");
    }
  }
};
</script>