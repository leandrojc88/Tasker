<template>
  <v-card width="375">
    <v-card-title primary-title class="align-center">
      <v-icon color="grey darken-4" left>$project</v-icon>
      {{ project__title }}
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          :rules="[rules.require]"
          autofocus
          dense
          outlined
          label="Nombre"
          v-model="name"
        ></v-text-field>
        <v-textarea
          label="Descripción"
          auto-grow
          outlined
          v-model="description"
          rows="1"
          row-height="100"
          :rules="[rules.require]"
          dense
        ></v-textarea>
        <v-btn block :color="!edit ? 'primary' : 'warning'" @click="submit">{{ project__action }}</v-btn>
        <v-btn block text class="mt-2" color="error" @click="onClose">Cancelar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  props: {
    edit: Boolean,
    project: Object
  },
  data: () => ({
    id: 0,
    name: "",
    description: "",
    rules: {
      require: v => !!v || "Campo obligatorio"
    }
  }),
  beforeMount() {
    this.assingProject();
  },
  watch: {
    project(v) {
      this.assingProject();
    }
  },
  computed: {
    ...mapState(["currentUser"]),
    project__title() {
      return this.edit ? "Editar Proyecto" : "Nuevo Proyecto";
    },
    project__action() {
      return this.edit ? "Guardar" : "Crear";
    }
  },
  methods: {
    ...mapActions("app", ["onAddProject", "onUpdateProject"]),

    async submit() {
      if (this.$refs.form.validate()) {
        if (!this.edit) {
          //add
          await this.onAddProject({
            name: this.name,
            description: this.description,
            UserId: this.currentUser.id
          });
        } else {
          //update
          await this.onUpdateProject({
            id: this.id,
            name: this.name,
            description: this.description,
            UserId: this.currentUser.id
          });
          if (this.$route.params.project_name !== this.name)
            this.$router.push({
              path: `/app/project/${this.id}/${this.name}`
            });
        }
        this.onClose();
      }
    },
    onClose() {
      this.$refs.form.reset();
      this.id = 0;
      this.name = "";
      this.description = "";
      this.$emit("close");
    },
    assingProject() {
      if (this.project) {
        this.id = this.project.id;
        this.name = this.project.name;
        this.description = this.project.description;
      }
    }
  }
};
</script>