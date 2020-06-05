<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :class="style__edit" class="d-block mb-1" @dblclick="is__edit = !is__edit">
      <manage-task 
      v-if="is__edit" 
      :name='dname'
      edit 
      v-on:on-close="is__edit=false">
      </manage-task>
      <v-sheet class="d-flex align-center" v-else>
        <v-card-text width="100px" class="pa-2 text--primary body-2">{{ dname }}</v-card-text>
        <v-btn small icon v-if="hover && !is__edit">
          <v-icon size="16">$edit</v-icon>
        </v-btn>
      </v-sheet>
    </v-card>
  </v-hover>
</template>
<script>
import ManageTask from "./ManageTask";
export default {
  components: { ManageTask },
  props: {
    name: String
  },
  data: () => ({
    is__edit: false,
    dname: "",
    rules: {
      require: val => !!val || "Campo obligatorio"
    }
  }),
  computed: {
    style__edit() {
      return this.is__edit ? "" : "pr-2";
    }
  },
  beforeMount() {
    this.dname = this.name;
  }
};
</script>