<template>
  <v-container fluid>
    <span class="position-fixed display-1 hidden-sm-and-down">Cargos</span>
    <v-row>
      <!-- FROM de cargoes -->
      <v-col cols="12" class="d-flex justify-center pa-0">
        <manageCargo
          v-on:manage-cargo="evtManageCargo"
          v-on:error-cargo="evtError"
          v-on:clear="cargo__item = null"
          :cargo__item="cargo__item"
        ></manageCargo>
      </v-col>
    </v-row>

    <!-- lista Cargos -->
    <v-row class="mx-2">
      <v-col
        cols="12"
        lg="6"
        class="pa-0 px-1"
        v-for="(item_cargo, index_cargo) in lista__cargos"
        :key="index_cargo"
      >
        <v-card outlined class="mt-1 d-flex pa-0 align-center">
          <v-icon size="25" class="mx-2" left>mdi-chevron-double-right</v-icon>
          <v-divider vertical></v-divider>
          <span class="body-1 pl-3 text-capitalize">{{item_cargo.nombre}}</span>
          <v-spacer></v-spacer>
          <v-btn
            :dark="!outline__edit(item_cargo.id)"
            :outlined="outline__edit(item_cargo.id)"
            fab
            x-small
            color="grey darken-3"
            class="mr-2 my-1"
            @click="editCargo(item_cargo)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn outlined fab x-small color="error" class="mr-2" @click="deleteCargo(item_cargo)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialogo de confirmacion de ELIMINAR -->
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="200px">
        <v-btn class="ma-3 mt-6" outlined @click="sheet = false">Cancelar</v-btn>
        <v-btn class="ma-3 mt-6" dark color="red" @click="removeItem()">Confirmar</v-btn>
        <div class="py-3">
          Seguro que desea eliminar la Cargo
          <span style="color: red; font-weight: 600;">{{nombre}}</span> ?
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <!-- Mensaje de notificacion -->
    <v-snackbar v-model="notification" top :color="notification_color">
      {{notification_msg}}
      <v-icon dark @click="notification = false">mdi-close</v-icon>
    </v-snackbar>

    <!-- CARGANDO... -->
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import * as easings from "vuetify/es5/services/goto/easing-patterns";
import manageCargo from "@/components/Admin/Molecules/ManageCargo";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    manageCargo
  },
  data: () => ({
    overlay: false,
    notification_msg: "",
    notification_color: "success",
    notification: false,
    sheet: false,
    options: {
      duration: 200,
      easing: "easeInOutCubic"
    },
    cargo__item: null,
    cargo__delete: null
  }),

  // ------------------------ Hoocks ------------------------

  // ------------------------ Computed ------------------------

  computed: {
    nombre() {
      return this.cargo__delete ? this.cargo__delete.nombre : "";
    },
    ...mapGetters("admin", {
      lista__cargos: "orderCargos"
    })
  },

  // ------------------------ Methods ------------------------

  methods: {
    ...mapActions("admin", ["actionDeleteCargos"]),
    outline__edit(id) {
      return !(this.cargo__item && this.cargo__item.id === id);
    },
    evtManageCargo(event) {
      if (event === "add") {
        this.notification_color = "success";
        this.notification = true;
        this.notification_msg = "Cargo creada satisfactoriamente";
      } else {
        this.notification_color = "success";
        this.notification = true;
        this.notification_msg = "Cargo Actualizada satisfactoriamente";
      }
    },
    evtError(event) {
      this.notification_color = "error";
      this.notification = true;
      this.notification_msg = event;
    },
    editCargo(item) {
      this.cargo__item = item;
    },
    deleteCargo(item) {
      this.cargo__item = null;
      this.sheet = true;
      this.cargo__delete = item;
    },
    removeItem() {
      this.sheet = false;
      this.overlay = true;
      this.actionDeleteCargos(this.cargo__delete)
        .then(res => {
          this.notification_color = "success";
          this.notification = true;
          this.notification_msg = `eliminado el cargo`;
          this.overlay = false;
        })
        .catch(err => {
          this.notification_color = "error";
          this.notification = true;
          this.notification_msg = err;
          this.overlay = false;
        });
    }
  }
};
</script>

<style scoped>
.position-fixed {
  position: fixed;
  top: 4.25rem;
  left: 4rem;
}
@media screen and (max-width: 550px) {
  .position-fixed {
    position: relative;
  }
}
</style>