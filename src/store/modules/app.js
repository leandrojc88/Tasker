import axios from 'axios'
import { make } from '../../security/utils';

const state = {
    list__projects: [],
    list__tables: [],
    open_table: {},
    close_table: {},

    dashboard__project: {},
    images: [],

    dialog__subtask: false,
    taskId__selected: -1,
    task_count_subtask: '',
},
    mutations = {
        ...make.mutations(state),
        setTaskCountSubtaskTo(state, obj) {
            state.task_count_subtask = obj.subtasks ? obj.done_subtask + '/' + obj.subtasks : ''
        },

        createTempTable(state, playload) {
            state.list__tables.push({
                id: -1,
                name: "Creando Tablero...",
                position: playload.poss
            });
        },

        createTable(state, newtable) {
            const find = state.list__tables.findIndex(e => e.id === -1)
            if (find != -1)
                state.list__tables.splice(find, 1, newtable)
        },

        deleteTempTable(state) {
            const find = state.list__tables.findIndex(e => e.id === -1)
            if (find != -1)
                state.list__tables.splice(find, 1)
        }
    },
    actions = {
        // ---------------------- Projects ---------------------------
        async loadProjects({ commit, rootState }) {
            const res = await axios.get(`/project/${rootState.currentUser.id}`)
            commit('setListProjects', res.data)
        },
        async loadDashboardProject({ commit, rootState }) {
            const res = await axios.get(`/dashboard_project/${rootState.currentUser.id}`)
            commit('setDashboardProject', res.data)
        },
        async finishProject({ commit }, projectId) {
            try {
                const res = await axios.put(`/project/finish/${projectId}`)
                commit('deleteListProjects', res.data)
                commit('showNotify', { msg: 'Proyecto finalizado' }, { root: true })

            } catch (error) {
                commit('showNotify',
                    { msg: `No se pudo finalizar el Proyecto: ${error.response.data.msg}`, color: 'error' },
                    { root: true })
            }
        },
        async onAddProject({ commit }, project) {
            try {
                const res = await axios.post("/project", project);
                if (res.data) {
                    commit('addListProjects', res.data)
                    commit('showNotify', { msg: 'Proyecto creado' }, { root: true })
                }
            } catch (error) {
                commit('showNotify',
                    { msg: `No se pudo crear el Proyecto: ${error.response.data.msg}`, color: 'error' },
                    { root: true })
            }
        },

        async onUpdateProject({ commit }, project) {
            try {
                const res = await axios.put(`/project/${project.id}`, project);
                if (res.data) {
                    commit('updateListProjects', { id: project.id, data: project })
                    commit('showNotify', { msg: 'Proyecto actualizado' }, { root: true })
                }
            } catch (error) {
                commit('showNotify',
                    { msg: `No se pudo actualizar el Proyecto: ${error.response.data.msg}`, color: 'error' },
                    { root: true })
            }
        },
        async onDeleteProject({ commit }, project) {
            try {
                const res = await axios.delete(`/project/${project.id}`)
                if (res.data) {
                    commit('deleteListProjects', project)
                    commit('showNotify', { msg: 'Proyecto eliminado' }, { root: true })
                }
            } catch (error) {
                commit('showNotify',
                    { msg: `No se pudo eliminar el Proyecto: ${error.response.data.msg}`, color: 'error' },
                    { root: true })
            }
        },

        // ---------------------- Tables ---------------------------

        async loadTables({ commit, rootState }, id_project) {
            const res = await axios.get(`/table/${id_project}`);
            const resOpnCls = await axios.get(`/table/openandclose/${id_project}`);
            commit('setListTables', res.data)
            commit('setOpenTable', resOpnCls.data.open)
            commit('setCloseTable', resOpnCls.data.close)
        },
        async saveTableToProject({ commit }, data) {
            try {
                console.log(table);
                const { table, projectId } = data
                const res = await axios.post("/table", {
                    ...table,
                    projectId
                });
                commit('createTable', res.data)
                commit('showNotify', { msg: 'Tablero creado sarisfactoriamente!' }, { root: true })
            } catch (error) {
                commit('showNotify',
                    { msg: `No se pudo crear el Tablero: ${error.response.data.msg}`, color: 'error' },
                    { root: true })
            }
        },

        async onEditTable({ commit }, data) {
            try {
                const { table, id_table } = data
                const res = await axios.put(`/table/${id_table}`, {
                    ...table
                });

                if (res.data) {
                    commit('updateListTables', { id: id_table, data: table })
                    commit('showNotify', { msg: 'tablero actualizado' }, { root: true })
                }
            } catch (error) {
                commit('showNotify',
                    { msg: `No se pudo actualizar el Tablero: ${error.response.data.msg}`, color: 'error' },
                    { root: true })
            }
        },
        async onDeleteTable({ commit }, id) {
            try {
                const res = await axios.delete(`/table/${id}`);
                if (res.data) {
                    commit('deleteListTables', id)
                    commit('showNotify', { msg: 'Tablero eliminado' }, { root: true })
                }
            } catch (error) {
                commit('showNotify',
                    { msg: `No se pudo eliminar el Tablero: ${error.response.data.msg}`, color: 'error' },
                    { root: true })
            }
        },
        saveImage({ commit }, img) {
            state.images.some(el => el.id === img.id)
                ? commit('updateImages', { id: img.id, data: img })
                : commit('addImages', img)
        },
    },



    /**
     *                  GETTERS
     */
    getters = {
        getProjectByPk: (state) => (id) => {
            if (typeof id === 'string')
                id = Number.parseInt(id)
            return state.list__projects.find(el => el.id === id)
        }
    }

// console.log(mutations);
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
