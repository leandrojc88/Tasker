import axios from 'axios';

/**
 *                  Request From the API
 */

// -------------------------- Table -------------------------

/**
 * crea una Table en la base de datos 
 * @param {{id:Number,name:string,projectId:number}} table -**Object** representa una tabla
 * @returns {{Object}} - **Object** creado en la bd
 */
export async function addTable(table) {
    try {
        const res = axios.post('/table', table)
        return res.data
    } catch (error) {
        throw new Error(`No se pudo crear la tabla: ${error.response.data.msg}`)
    }

}