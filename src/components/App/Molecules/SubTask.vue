<template>
  <v-hover v-slot:default="{ hover }">
    <manage-sub-task
      v-if="edit"
      @editsubtask="editSubTask"
      @on-close="edit=false"
      edit
      :idsubtask="id"
      :name="dname"
    ></manage-sub-task>
    <v-sheet v-else class="d-flex" min-height="30">
      <v-checkbox
        hide-details
        class="ma-0 mt-1 pa-0"
        height="10"
        @change="changeDone"
        v-model="ddone"
      ></v-checkbox>
      <span :class="{hover:hover}" @dblclick="edit=true">{{dname}}</span>
      <v-spacer></v-spacer>
      <v-btn v-show="hover" small color="error" icon @click="deleteSubtask()">
        <v-icon>$delete</v-icon>
      </v-btn>
    </v-sheet>
  </v-hover>
</template>

<script>
import ManageSubTask from "./ManageSubTask";
export default {
  components: { ManageSubTask },
  props: {
    id: Number,
    name: String,
    done: Boolean
  },
  data: () => ({
    edit: false,
    dname: "",
    ddone: false
  }),
  watch: {
    name(v) {
      this.loadData();
    }
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    editSubTask(subtask) {
      this.dname = subtask.name;
      this.edit = false;
    },
    deleteSubtask() {
      this.$emit("delete", this.id);
    },
    changeDone(value) {
      try {
        this.axios.put(`/subtask/changedone/${this.id}`, { done: value });
        this.$emit(`changedone`, { id: this.id, value });
      } catch (error) {
        alert(error);
      }
    },
    loadData() {
      this.dname = this.name;
      this.ddone = this.done;
    }
  }
};
</script>
<style scoped>
.hover {
  color: var(--v-secondary-base);
  font-weight: 500;
}
</style>