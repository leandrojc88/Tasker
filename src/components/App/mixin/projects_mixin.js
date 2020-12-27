import Table from "../Organisms/Table";
import { mapMutations, mapActions, mapState } from "vuex";

export default {
    components: { Table },
    data: () => ({
        new__table: false,
    }),

    // -------------------- Computed -------------------------------
    computed: {
        ...mapState('app', ["list__tables", "open_table", "close_table"]),

        list__tablesPositioned() {
            return this.list__tables.sort((a, b) =>
                a.position < b.position ? true : false
            );
        }
    },

    // -------------------- Methods -------------------------------
    methods: {
        ...mapMutations('app', ["createTempTable"]),
        ...mapActions('app', ["loadTables", "saveTableToProject"]),

        /**
         * return true for the last items of the **list__tables**
         * @param {*} index index of table
         * @return {boolean} the last item of list__tables
         */
        is__last(index) {
            return this.list__tables.length - 1 === index;
        },

        /**
         * save the move of table
         * @param {*} evt 
         */
        onChange(evt) {
            if (evt.hasOwnProperty("moved")) {
                // move
                const data = evt.moved;
                this.axios.put(`/table/moveto/${data.element.id}`, {
                    oldposs: data.oldIndex + 1,
                    newposs: data.newIndex + 1
                });
            }
        },

        /**
         * Create a temporary board, and he saves it
         * @param {*} poss position the table in the list
         */
        createNewTable(poss) {
            this.createTempTable(poss + 1)
        },
    }
}