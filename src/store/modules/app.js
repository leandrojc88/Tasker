import axios from 'axios'
import { make } from '../../security/utils';

const state = {
    list__projects: [],
    dashboard__project: {}
},
    mutations = {
        ...make.mutations(state),
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
        }
    },
    getters = {
        getProjectByPk: (statet) => (id) => {
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
