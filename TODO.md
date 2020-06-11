## Requirement

- [x] CRUD - gestión de usuarios (nombre, user, pass) 
- [x] vista inicial con las tareas cotidianas(Frequent tasks) y sus tableros, inicialmente debe crearse siempre los tableros (Open y Close)
- [x] crear tableros (Tables) CRUD
- [ ] crear tareas en los tableros (tasks) - CRUD
- [ ] permitir el flujo de las tareas por los tableros
  - [ ] un botón close para q la tarea valla directo al tablero Close
- [ ] CRUD - Projects y un estado de terminado para ocultarlo

## TODO

- [ ] Drag & drop lib para vue
- [ ] icono de la app en el navegador
- [ ] load data in the store para evitar la carga inecesaria cuando se mueven las tablas a left y right
- [ ] clic en el fondo para hacer scroll
- [ ] parametros de la url de los proyectos, ver la seguridad al cambiar el # id parametro si puede modificar el de otro user y el valor `#` no para por parametros soluciones para ello

## Features
- [ ] gestion de tiempo en las tareas y los projectos


### optimizacion

- [ ] refactorizar el nombre (Tablero ,Board) por tabla
- [ ] cargar la vista del ususario de forma asincrona y guardarla en el store para los casos de una conexion lenta

----

### udate VST

- **store/index.js** y **App.vue** se creo el notify para las notificaciones genéricas
- **securty/utils.js** actualizo el comportamiento de la mutations para los `Objets`