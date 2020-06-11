<template>
  <v-app>
    <vst-banner title="App" root_url="App" app>
      <template slot="title">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title class="pl-0 mr-2 d-flex">
          <v-icon left color="accent text--accent-2">mdi-clipboard-text</v-icon>
          <span class="title accent--text">Tasker</span>
        </v-toolbar-title>
      </template>
    </vst-banner>

    <v-content app>
      <v-img src="@/assets/bg.jpg" height="92vh" aspect-ratio="1.5" position="center center">
        <v-navigation-drawer v-model="drawer" width="350" height="92vh" absolute class="px-2">
          <div class="d-flex flex-row-reverse">
            <v-btn icon @click.stop="drawer = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>

          <!-- Dashboard -->
          <div class="d-flex justify-center pa-6">
            <v-icon color="primary">mdi-view-dashboard</v-icon>
            <router-link class="hover-under" to="/app">
              <span class="headline primary--text">Dashboard</span>
            </router-link>
          </div>

          <!-- Projects -->
          <v-sheet min-height="415">
            <div class="d-flex align-center pb-2 pl-2">
              <v-icon left color="primary">mdi-briefcase</v-icon>
              <span class="primary--text">Projects</span>
              <v-spacer></v-spacer>

              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" class="mr-2" icon v-on="on">
                    <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span>Projectos terminados</span>
              </v-tooltip>

              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" icon v-on="on" @click="dialog__project = true">
                    <v-icon>mdi-plus-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span class="primary">Nuevo Projecto</span>
              </v-tooltip>
            </div>

            <!-- Manage Project -->
            <v-dialog
              v-model="dialog__project"
              transition="dialog-transition"
              width="fit-content"
              persistent
            >
              <manage-project @close="dialog__project = false" />
            </v-dialog>

            <!-- list projects -->
            <v-hover v-for="(item, key) in list__projects" :key="key" v-slot:default="{ hover }">
              <div class="my-1 d-flex">
                <v-icon size="18">mdi-chevron-right</v-icon>
                <router-link
                  class="hover-under grey--text text--darken-2"
                  :to="`/app/project/${item.id}/${item.name}`"
                >
                  <span class="body-2">{{item.name}}</span>
                </router-link>

                <v-btn x-small class="ml-4" color="primary" icon v-if="hover">
                  <v-tooltip bottom color="primary">
                    <template v-slot:activator="{ on }">
                      <v-btn x-small color="primary" v-on="on" icon @click="finishedProject(item)">
                        <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Finalizar proyecto</span>
                  </v-tooltip>
                </v-btn>
              </div>
            </v-hover>
          </v-sheet>

          <contacts class="contats-button py-2" />

          <!-- Dialogo de confirmacion de ELIMINAR -->
          <v-bottom-sheet v-model="confirm">
            <v-sheet class="text-center" height="200px">
              <v-btn class="ma-3 mt-6" outlined @click="confirm = false">Cancelar</v-btn>
              <v-btn class="ma-3 mt-6" dark color="error" @click="confirmFinihsed()">Confirmar</v-btn>
              <div class="py-3">
                Seguro que desea finalizar el proyecto:
                <strong>{{ project.name}}</strong>
              </div>
            </v-sheet>
          </v-bottom-sheet>
        </v-navigation-drawer>
        <router-view></router-view>
      </v-img>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Contacts from "@/components/App/Molecules/Contacts";
import ManageProject from "../components/App/Molecules/ManageProject";

export default {
  components: {
    Contacts,
    ManageProject
  },
  data: () => ({
    project: {
      name: ""
    },
    confirm: false,
    drawer: false,
    dialog__project: false
  }),
  async beforeMount() {
    this.loadProjects();
  },
  computed: {
    ...mapState("app", ["list__projects"])
  },
  methods: {
    ...mapActions("app", ["loadProjects", "finishProject"]),

    finishedProject(project) {
      this.confirm = true;
      this.project = Object.assign({}, project);
    },
    confirmFinihsed() {
      this.finishProject(this.project.id);
      this.confirm = false;
      const go__path = "/app";
      if (this.$route.path !== go__path) this.$router.push({ path: "/app" });
    }
  }
};
</script>
<style scoped>
.contats-button {
  text-align: center;
}
.hover-under {
  text-decoration: none;
}
.hover-under:hover {
  text-decoration: underline;
}
</style>