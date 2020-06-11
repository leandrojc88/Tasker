import Table from "../Organisms/Table";
import { mapMutations } from "vuex";

export default {
    components: { Table },
    data: () => ({
        new__table: false,
        list__tables: [],
        table__openclose: []
    }),

    // -------------------- Computed -------------------------------
    computed: {
        task__open() {
            return this.table__openclose[0]
        },
        task__close() {
            return this.table__openclose[1]
        },
        list__tablesPositioned() {
            return this.list__tables.sort((a, b) =>
                a.possition < b.possition ? true : false
            );
        }
    },

    // -------------------- Methods -------------------------------
    methods: {
        ...mapMutations(["showNotify"]),

        /**
         * return true for the last items of the **list__tables**
         * @param {*} index index of table
         * @return {boolean} the last item of list__tables
         */
        is__last(index) {
            return this.list__tables.length - 1 === index;
        },

        /**
         * move table in the espesific direction
         * Castling of two tables
         * @param {*} direction (left | right) directions to can move
         */
        moveTo(data) {
            const current_index = this.list__tables.findIndex(el => el.id === data.idtable)
            const table = this.list__tables.splice(current_index, 1)
            if (data.direction === 'left') {
                //move to left
                table[0].possition -= 1
                this.list__tables[current_index - 1].possition += 1
                this.list__tables.splice(current_index - 1, 0, ...table)
            } else {
                table[0].possition += 1
                this.list__tables[current_index].possition -= 1
                this.list__tables.splice(current_index + 1, 0, ...table)
            }
        },
        /**
         * Create a temporary board, and he saves it
         * @param {*} poss possition the table in the list
         */
        createNewTable(poss) {
            this.list__tables.push({
                id: -1,
                name: "Creando Tablero...",
                possition: poss + 1
            });
        },

        /**
         * Save the table in the project
         * @param {*} table to seve in project 
         * @param {*} id_project id the project
         */
        async saveTableToProject(table, id_project) {
            try {
                const res = await this.axios.post("/table", {
                    ...table,
                    projectId: id_project
                });
                this.$set(this.list__tables, this.list__tables.length - 1, res.data);
                this.showNotify({ msg: "Tablero creado sarisfactoriamente!" });
            } catch (error) {
                this.showNotify({
                    msg: "Error Tablero creado: " + error,
                    color: "error"
                });
            }
        },

        /**
         * Edit the selected table
         * @param {*} table new datas of table
         * @param {*} id__table id the table to edit
         */
        async editTable(table, id__table) {
            try {
                const res = await this.axios.put(`/table/${id__table}`, {
                    ...table
                });
                if (res.data) {
                    this.list__tables.splice(
                        this.list__tables.findIndex(el => el.id === id__table),
                        1,
                        { id: id__table, ...table }
                    );
                    this.showNotify({ msg: "Tablero editado sarisfactoriamente!" });
                } else
                    throw new Error('no se pudo editar correctamente')
            } catch (error) {
                this.showNotify({
                    msg: "Error Tablero editado: " + error,
                    color: "error"
                });
            }
        },

        /**
         * delete the selected table
         * @param {*} id id of table
         */
        async deleteTable(id) {
            try {
                const deleted = await this.axios.delete(`/table/${id}`);
                const index = this.list__tables.findIndex(el => el.id === id)
                if (deleted.data) {
                    this.list__tables.splice(
                        index,
                        1
                    );

                    // reposisioned after deleted table
                    this.list__tables = this.list__tables.map((el, idx) => {
                        if (idx >= index) el.possition -= 1
                        else el.possition
                        return el
                    })

                    this.showNotify({ msg: "Tablero eliminado sarisfactoriamente!" });
                } else
                    throw new Error('no se pudo eliminar correctamente')
            } catch (error) {
                this.showNotify({
                    msg: "Error Tablero eliminado: " + error,
                    color: "error"
                });
            }
        }
    }
}