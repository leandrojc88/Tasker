<template>
  <v-card width="300" height="100%" color="bggrey" class="mx-2">
    <v-card-title primary-title class="justify-center pa-2">
      <!-- Table Name -->
      <v-row no-gutters>
        <v-col class="d-flex justify-center" cols="1">
          <v-btn icon v-if="!close && !open">
            <v-icon>$delete</v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-center" cols="10">
          <div
            :class="{'blue--text text--darken-4': open, 'red--text text--darken-4':close}"
          >{{table__name}}</div>
        </v-col>
        <v-col class="d-flex justify-center" cols="1">
          <v-btn icon class="ml-auto" v-if="!close">
            <v-icon>$add</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider></v-divider>

    <!-- Tasks -->
    <v-card-text>
      <task name="Tarea #1" />
      <task name="Tarea #2" />
      <task name="Tarea #3 Proceso Comercial de la Grafica - ProGraf" />
      <task name="Tarea #3 ProcesoComercialdelaGrafica - ProGraf" />
      <manage-task v-on:on-close="create__task=false" v-if="create__task" />

      <!-- new Task -->
      <v-btn text small class="mt-2" @click="create__task = true">
        <v-icon size="16" left>$add_circle</v-icon>
        <span class="text-capitalize caption">Nueva Tarea...</span>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import Task from "../Molecules/Task";
import ManageTask from "../Molecules/ManageTask";

export default {
  components: { Task, ManageTask },
  props: {
    close: {
      type: Boolean
    },
    open: {
      type: Boolean
    },
    name: {
      type: String,
      default: "..."
    }
  },
  data: () => ({
    create__task: false
  }),
  computed: {
    table__name() {
      if (this.open) return "Open";
      if (this.close) return "Close";
      else return this.name;
    }
  },
  methods: {
    createTask() {
      this.components;
    }
  }
};
</script>