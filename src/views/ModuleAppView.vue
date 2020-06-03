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
            <v-btn icon @click.stop="drawer = !drawer">
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
                  <v-btn color="primary" icon v-on="on">
                    <v-icon>mdi-plus-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span class="primary">Nuevo Projecto</span>
              </v-tooltip>
            </div>

            <!-- list projects -->
            <v-hover v-for="(item, key) in projects" :key="key" v-slot:default="{ hover }">
              <div class="my-1 d-flex">
                <v-icon size="18">mdi-chevron-right</v-icon>
                <router-link class="hover-under grey--text text--darken-2" :to="`/app/project/${item}/${key}`">
                  <span class="body-2">{{item}}</span>
                </router-link>

                <v-btn x-small class="ml-4" color="primary" icon v-if="hover">
                  <v-tooltip bottom color="primary">
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">mdi-checkbox-marked-circle-outline</v-icon>
                    </template>
                    <span>Finalizar proyecto</span>
                  </v-tooltip>
                </v-btn>
              </div>
            </v-hover>
          </v-sheet>

          <contacts class="contats-button py-2" />
        </v-navigation-drawer>
        <router-view></router-view>
      </v-img>
    </v-content>
  </v-app>
</template>

<script>
import Vue from "vue";
import Contacts from "@/components/App/Molecules/Contacts";

export default {
  components: {
    Contacts
  },
  data: () => ({
    drawer: true,    
    projects: [
      "Proceso Comercial de la Grafica - ProGraf",
      "VST - Vue Security Tool",
      "Estudio de Idioma Ingles",
      "Leer libro YDNJS",
      "Ejercicios y Nutricion",
      "Projectos Profesionales 3D",
      "Proceso Comercial de la Grafica - ProGraf",
      "VST - Vue Security Tool",
      "Estudio de Idioma Ingles"
      /* "Leer libro YDNJS",
      "Ejercicios y Nutricion",
      "Projectos Profesionales 3D",
      "Proceso Comercial de la Grafica - ProGraf",
      "VST - Vue Security Tool",
      "Estudio de Idioma Ingles",
      "Leer libro YDNJS",
      "Ejercicios y Nutricion",
      "Projectos Profesionales 3D",
      "Proceso Comercial de la Grafica - ProGraf",
      "VST - Vue Security Tool",
      "Estudio de Idioma Ingles",
      "Leer libro YDNJS",
      "Ejercicios y Nutricion",
      "Projectos Profesionales 3D",
      "Terminar Tasker" */
    ]
  })
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