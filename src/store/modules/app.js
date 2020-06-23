import axios from 'axios'
import { make } from '../../security/utils';

const state = {
    dialog__subtask: false,
    taskId__selected: -1,
    list__projects: [],
    dashboard__project: {},
    task_count_subtask: ''
},
    mutations = {
        ...make.mutations(state),
        setTaskCountSubtaskTo(state, obj) {
            state.task_count_subtask = obj.subtasks ? obj.done_subtask + '/' + obj.subtasks : ''
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

        async loadProjects({ commit, rootState }) {
            const res = await axios.get(`/project/${rootState.currentUser.id}`)
            commit('setListProjects', res.data)
        },
    },


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
