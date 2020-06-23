## Requirement

- [x] CRUD - gestión de usuarios (nombre, user, pass) 
- [x] vista inicial con las tareas cotidianas(Frequent tasks) y sus tableros, inicialmente debe crearse siempre los tableros (Open y Close)
- [x] crear tableros (Tables) CRUD
- [x] crear tareas en los tableros (tasks) - CRUD
- [x] permitir el flujo de las tareas por los tableros
- [ ] CRUD - subtask
- [ ] imagenes en las task

## TODO

- [ ] Revizar el Hooks update para cambiar por el watch
- [x] Drag & drop lib para vue
- [ ] icono de la app en el navegador
- [ ] load data in the store para evitar la carga inecesaria cuando se mueven las tablas a left y right
- [ ] clic en el fondo para hacer scroll
- [ ] parametros de la url de los proyectos, ver la seguridad al cambiar el # id parametro si puede modificar el de otro user y el valor `#` no para por parametros soluciones para ello

## Features
- [ ] gestion de tiempo en las tareas y los projectos
- [ ] labels con colores para agrupar como en trello
- [ ] Planificacion diaria o semanal que espesifique como se va a distribuir las tareas a lo largo de la semana
  - [ ] Las **tareas** pueden ser de cualquier **proyecto el ususario**
  - [ ] establecer un tiempo de cumplimiento
  - [ ] asignar **secciones** en el dia *nombre*(mañana, tarde y noche) y a estas secciones definirle un *tiempo* de 1h-6h (8:am - 12:pm) y un *description* (trabajo, estudio, horario de almuerzo, ejercicio, free)
  - [ ] crear **colas** para cada una de las **secciones** con el orden de las tareas a cumplir
  - [ ] **cola generica** para cuando se termine las colas propias de las secciones se pueda eleguir de esta cola generica sin importar que seccion sea


### optimizacion

- [ ] refactorizar el nombre (Tablero ,Board) por tabla
- [ ] cargar la vista del ususario de forma asincrona y guardarla en el store para los casos de una conexion lenta

----

### udate VST
