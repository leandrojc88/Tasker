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
import { mapState, mapMutations } from "vuex";

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
    ...mapMutations("app", ["addListProjects", "updateListProjects"]),
    ...mapMutations(["showNotify"]),

    async submit() {
      if (this.$refs.form.validate()) {
        try {
          if (!this.edit) {
            //add
            const res = await this.axios.post("/project", {
              name: this.name,
              description: this.description,
              UserId: this.currentUser.id
            });
            this.addListProjects(res.data);
            this.showNotify({ msg: "Proyecto creado !" });
          } else {
            //update
            const res = await this.axios.put(`/project/${this.id}`, {
              name: this.name,
              description: this.description
            });
            this.updateListProjects({
              id: this.id,
              data: {
                name: this.name,
                description: this.description,
                UserId: this.currentUser.id
              }
            });
            if (this.$route.params.project_name !== this.name)
              this.$router.push({
                path: `/app/project/${this.id}/${this.name}`
              });
            this.showNotify({ msg: "Proyecto editado !" });
          }
          this.onClose();
        } catch (error) {
          this.showNotify({
            msg: `Error en creación o edición de proyecto: ${error}`,
            color: "error"
          });
        }
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