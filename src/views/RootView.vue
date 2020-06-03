<template>
  <v-app>
    <v-app-bar class="elevation-0" color="primary" dense max-height="48">
      <v-icon left color="accent text--accent-2">mdi-clipboard-text</v-icon>
      <span class="title text--accent">{{app_name}}</span>
    </v-app-bar>
    <v-row class="mx-0" height="100%">
      <v-col cols="4" class="d-flex align-center justify-center">
        <!-- Loggin form -->
        <v-sheet width="328" v-if="isLoggin">
          <v-form ref="form" width="100%">
            <v-text-field
              prepend-inner-icon="mdi-account"
              :rules="[rules.user_string, rules.required]"
              name="user"
              outlined
              label="Usuario"
              id="user"
              v-model="user.user"
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-lock"
              :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_pass ? 'text' : 'password'"
              :rules="[rules.required]"
              name="pass"
              outlined
              label="Contraseña"
              id="pass"
              v-model="user.password"
              @click:append="show_pass = !show_pass"
              @keypress.enter="onLogin"
            ></v-text-field>
            <v-btn class="my-2" color="primary" block @click="onLogin()">INICIAR SESIÓN</v-btn>
            <v-btn color="info" block text @click="isLoggin = false">Reqistrate aqui</v-btn>
          </v-form>
        </v-sheet>

        <!-- register Form -->
        <v-sheet v-else width="350">
          <v-container class="py-1">
            <v-form ref="form_reg" width="100%">
              <v-text-field
                :rules="[rules.user_string, rules.required]"
                label="Usuario"
                outlined
                v-model="register__user.user"
              ></v-text-field>
              <v-text-field
                :rules="[rules.required]"
                name="nombre"
                outlined
                label="Nombre"
                id="nombre"
                v-model="register__user.full_name"
              ></v-text-field>
              <v-text-field
                :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_pass ? 'text' : 'password'"
                :rules="[rules.required, rules.min]"
                name="pass"
                outlined
                counter
                label="Contraseña"
                v-model="register__user.pass"
                @click:append="show_pass = !show_pass"
              ></v-text-field>
              <v-text-field
                :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_pass ? 'text' : 'password'"
                :rules="[rules.required,rules.min,repeart_rule]"
                name="repeat_pass"
                outlined
                counter
                label="Rep. Contraseña"
                v-model="register__user.repeat_pass"
                @click:append="show_pass = !show_pass"
              ></v-text-field>
              <v-btn class="my-2" color="primary" block @click="onRegister()">REGISTRAR USUARIO</v-btn>
              <v-btn color="error" block text @click="cancelRegister">Cancelar</v-btn>
            </v-form>
          </v-container>
        </v-sheet>

        <!-- Mensaje de notificacion -->
        <v-snackbar v-model="error" top color="error">
          {{err_msg || 'Acceso denegado. Credenciales incorrectas...'}}
          <v-btn text @click.native="error = false">Cerrar</v-btn>
        </v-snackbar>

        <!-- Mensaje de Correcta -->
        <v-snackbar v-model="user__register" top color="success">
          Usuario creado correctamente
          <v-btn text @click.native="user__register = false">X</v-btn>
        </v-snackbar>

        <!-- CARGANDO... -->
        <v-overlay :value="overlay">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-img class="pa-5 text--aside" src="@/assets/bg.jpg" height="92vh" position="left center">
          <v-sheet class="transparent d-flex align-center">
            <v-icon left size="78" color="white">mdi-clipboard-text</v-icon>
            <span class="display-3 text--aside">{{app_name}}</span>
          </v-sheet>
          <p class="headline mt-10 mb-0">App para el control de tareas, Inspirada en</p>
          <p class="headline">sistemas como trello y asana</p>
          <v-sheet class="transparent contacts-sheet">
            <p class="title mb-1 black--text">Creador</p>
            <p class="subtitle-1 black--text">Leandro José Capdesuñer García</p>
            <p class="title mb-1 black--text">Contactos</p>
            <contacts />
          </v-sheet>
        </v-img>
      </v-col>
    </v-row>
    <!-- </v-container> -->
    <!-- </v-content> -->
  </v-app>
</template>

<script>
/**
 * Para que **RootView** funcione correctamente:
 * 1- se debe utilizar el securityMixin para controlar el flujo de loggin de los usuarios
 * 2- el HTML del componente se puede modificar siempre que cumpla:
 *    >> de manera obligatoria -> un formulario que contenga el la propiedad (ref="form")
 *                             -> el formulario contenga 2 campos con `v-model="user.user"` y `v-model="user.password"`
 *                             -> y un submit con la propiedad `@click="onLogin()"`
 *
 *    >> de forma opcional     -> overlay = boolean, para mostrar algun tipo de loading...
 *                             -> error = boolean, para controlar los errores de autenticacion
 *                             -> app_name = String, para mostrar el nombe de Sistema , @/security/config--APP_NAME
 *
 */
import securityMixin from "@/security/mixins/logginMixin";
import Contacts from "@/components/App/Molecules/Contacts";

export default {
  components: {
    Contacts
  },
  name: "RootView",
  mixins: [securityMixin],
  data: () => ({
    err_msg: "",
    isLoggin: true,
    user__register: false,
    register__user: {
      user: "",
      full_name: "",
      pass: "",
      repeat_pass: ""
    },
    rules: {
      min: v => (v && v.length >= 8) || "Minimo 8 characters"
    }
  }),

  // ----------------- Hoocks ----------------
  computed: {
    repeart_rule() {
      return this.register__user.pass === this.register__user.repeat_pass
        ? true
        : "No cohinciden las contraseñas!";
    }
  },
  // ----------------- Methods ----------------
  methods: {
    onRegister() {
      if (this.$refs.form_reg.validate()) {
        // registrar usuario con rol system user
        this.axios
          .post("/user/register", this.register__user)
          .then(req => {
            this.user__register = true;
            this.cancelRegister();
          })
          .catch(err => {
            this.error = true;
            this.err_msg = err.response.data.msg;
          });
      }
    },
    cancelRegister() {
      this.$refs.form_reg.reset();
      this.isLoggin = true;
    }
  }
};
</script>
<style scoped>
.float-account {
  position: absolute;
  top: 4.5rem;
  border: 2rem !important;
}
.text--accent {
  color: #a7ffeb;
}
.text--aside {
  color: white;
}
.contacts-sheet {
  position: absolute;
  right: 20px;
  bottom: 4px;
}
</style>
