// ---------------------------- INIT CONFIG --------------------------------
import kebabCase from 'lodash/kebabCase'

/**
 * ******************** declare only `vanilla-js` code for to start before first *********************
 */

// configuracion de la mayuscula inicial  ==> puede utilizarce import upperFirst from 'lodash/upperFirst'
String.prototype.firstUpperCase = function () {
    return this.charAt().toLocaleUpperCase() + this.substring(1).toLocaleLowerCase()
}

/**
 * ******************************** FIN `vanilla-js` ********************************
 */


/** 
* Registro de Componenetes **Base** en la instancia de Vue
* con el Formato: `vst-componen-name-kebakcase`
* */
export function initConfigs(vm) {
    /** 
     * Registro de Componenetes **Base** en la instancia de Vue
     * con el Formato: vst-componen-name-kebakcase
     * */
    const requireComponent = require.context(
        // path del directorio
        '@/components/Base',
        // buscar en subdirectorios
        true
    )

    requireComponent.keys().forEach(fileName => {
        // configuracion de los componenetes
        const componentConfig = requireComponent(fileName)

        // trabajar solo en las extenciones .vue o .js 
        if (fileName.endsWith('.vue') || fileName.endsWith('.js')) {

            //nombre del componente en KamelCase ej: `./Organisms/Banner.vue` --> obtiene (`Banner`)
            const cpnt = fileName.replace(/(.*)\.\w+$/, '$1').split('/').pop()
            // nombre del componente compuesto por el prefijo `vst-` y componente en KebabCase
            const componentName = `vst-${kebabCase(cpnt)}`

            // Registrar el commponente de forma Global en la instancia de Vue
            vm.component(
                componentName,
                componentConfig.default || componentConfig
            )
        }

    })
}

// ---------------------------- << APP CONFIG >> --------------------------------
export const VST_VERSION = 'VST v1.1.0'
// application name
export const APP_NAME = 'Tasker'

//  DB >> direccion pro defecto de Axios - API
export const API_URL = 'http://localhost:3000/api';
// export const API_URL = 'http://192.168.150.108:3030'

// ---------------------------- MODULES CONFIG --------------------------------

/** Centralizacion de las configuraciones de los modulos
 * se cargan todos los modulos definidos en `modules_config/ModuleName.js` en una sola constante 
 * tippo [Array] y se exporta
 * @returns {Array} 
 */
import AdminConfig from './modules_config/Admin'
import AppConfig from './modules_config/App'

export const modulesConfig = [
    AdminConfig, AppConfig
]