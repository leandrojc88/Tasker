# TASKER

https://tasker-app-node.herokuapp.com

**usuario de prueba:** user_test               **pass:** usertest

### tecnologías

Vuejs, axios, Nodejs(express), postgres, Heroku

App para el control de tareas, Inspirada en sistemas como trello y asana

la plataforma se divide en dos Módulos **Admin** y **App**, a los cuales se puede acceder según el rol del usuario

## Modulo Admin

este modulo solo tendrá acceso los *administradores*, modulo con las funcionalidades para la parte administrativa del sistema:

- gestión de **Usuarios** del sistema 
- **Roles y Permisos** - visualización de las configuraciones de los Roles y los Permisos, estos se configuran de forma estática con ficheros de configuración 
- **Historial** -  Historial de los logs del sistema, con un sistema de filtros
- nomencladores **Unidad y Cargo** estas funcionalidades son parte de la estructura creada, como Framework base de esta plataforma 
- el panel de usuarios muestra los datos del usuario autenticado y los módulos que tiene permiso a acceder

![image-20210927163404909](/md-img/admin-dashboard.png)

## Modulo App

este es el modulo principal de la App, donde se crean y planifican los proyectos con sus tableros, tareas y subtareas, 

![image-20210927164304107](/md-img/nuevo-proyecto.png)

![image-20210927164720669](/md-img/dashboard.png)

![image-20210927164844853](/md-img/edit-task.png)

## Estructura

### Dashboard

es la vista inicial del modulo **APP** donde se pueden crear tableros y tareas genéricas o de uso cotidiano 

### Proyectos

se pueden crear `Proyectos` independientes para una mejor agrupación y estructura de las tareas, estos permiten ser finalizados

### Table (Tableros)
los `Tableros` agrupan las tareas y describen el estado en el que se encuentran las mismas, siempre están los tableros `Open` y `Close` estas son las definiciones iniciales de todo proyecto, pueden crearse múltiples tableros e intercambiar su posición arrastrándolas, modificar el nombre (dobleclick en el nombre)

### Task (tareas)
Las tareas que se van creando para ir moviendo por los diferentes estados y describen las tablas hasta llegar a la tabla `Close` que describe cuando una tarea fue resuelta, puede editar el nombre (dobleclick en el nombre) y editar la tarea con el botón del icono de edición (lápiz)

- **subtasks** lista de subtareas de la tarea, deben ser marcadas como resueltas a medida que se les de solución
- **imagen** visualización de una imagen que describe la tarea
- **tiempo** planificación de los tiempos de resolución de la tarea (pendiente...)

### SubTask (subtareas)
subtareas que componen una tarea específica, estas pueden ser resueltas y marcadas como tal mediante un checkbox, hasta ser cumplidas todas y así resuelto la tarea que componen estas subtareas