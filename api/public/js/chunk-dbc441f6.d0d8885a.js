(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dbc441f6"],{"1b3b":function(t,e,a){},"27de":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"overflow-hidden",staticStyle:{position:"relative","min-height":"80vh"},attrs:{fluid:""}},[a("v-row",[a("v-col",[a("v-sheet",{staticClass:"d-flex"},[a("v-btn",{attrs:{small:"",color:"primary",outlined:""},on:{click:t.changeOrder}},[a("v-icon",{attrs:{left:""}},[t._v(t._s(t.icon_order))]),t._v("Ordenar ")],1),a("v-btn",{staticClass:"ml-1",attrs:{small:"",color:"primary",outlined:""},on:{click:function(e){return t.expandAll()}}},[a("v-icon",{attrs:{left:""}},[t._v("mdi-arrow-expand-all")]),t._v("Expandir ")],1),a("v-btn",{staticClass:"ml-1",attrs:{small:"",color:"primary",outlined:""},on:{click:function(e){t.expands=[]}}},[a("v-icon",{attrs:{left:""}},[t._v("mdi-arrow-collapse-all")]),t._v("Contraer ")],1),a("v-spacer"),a("v-badge",{attrs:{value:t.has_filters,color:"red","offset-x":"11","offset-y":"11",overlap:"",dot:""}},[a("v-btn",{attrs:{small:"",color:"primary",outlined:""},on:{click:function(e){return t.showFilters()}}},[a("v-icon",{attrs:{left:""}},[t._v("mdi-filter-outline")]),t._v("Filtros ")],1)],1),a("v-btn",{staticClass:"ml-1",attrs:{small:"",color:"primary"},on:{click:function(e){return t.init()}}},[a("v-icon",{attrs:{left:""}},[t._v("mdi-find-replace")]),t._v("Actualizar ")],1)],1),a("v-divider",{staticClass:"my-2"})],1)],1),a("v-row",[a("v-col",[t.count_histry?t._e():a("v-alert",{attrs:{type:"warning",dense:"",border:"left"}},[t._v("No hay datos para mostrar ... !")]),a("v-timeline",{attrs:{dense:""}},t._l(t.list_history,(function(e,r){return a("v-timeline-item",{key:r,staticClass:"pb-1",attrs:{color:t.getColorByAction(e.action),"fill-dot":"",icon:t.getIconByAction(e.action),"icon-color":"black",small:""}},[a("v-card",[a("v-card-title",{staticClass:"py-2 pl-1 pr-2 d-flex body-2 justify-space-between mouse-hove",on:{click:function(e){return t.expandAndContract(r)}}},[a("div",[a("v-icon",[t._v("mdi-music-accidental-sharp")]),t._v(" "+t._s(e["id"])+" "),a("v-icon",{staticClass:"pl-5",attrs:{title:"Tabla"}},[t._v("mdi-table")]),t._v(" "+t._s(e.table)+" ")],1),a("div",[a("v-icon",{attrs:{title:"Usuario"}},[t._v("mdi-account-outline")]),t._v(" "+t._s(e.user.user)+" ")],1),a("div",[a("v-icon",{attrs:{title:"Fecha"}},[t._v("mdi-clock-outline")]),t._v(" "+t._s(new Date(e.moment).toLocaleString("en-gb",{timeZone:"UTC",hour12:!0}))+" ")],1)]),a("v-expand-transition",[t.expands.some((function(t){return t===r}))?a("div",[a("v-divider"),"Update"!=e.action?a("v-card-text",[[a("v-data-table",{staticClass:"elevation-1",attrs:{"elevation-5":"",dense:"",headers:t.headers,items:t.action_doby(e.data),"item-key":"name","hide-default-footer":""}})]],2):a("v-card-text",[[a("v-data-table",{staticClass:"elevation-1",attrs:{"elevation-5":"",dense:"",headers:t.headersUpdate,items:t.action_dobyUpdate(e.data),"item-key":"name","hide-default-footer":""}})]],2)],1):t._e()])],1)],1)})),1)],1)],1),a("v-row",[a("v-pagination",{attrs:{page:"current_page","total-visible":"10",length:t.length,circle:""},model:{value:t.current_page,callback:function(e){t.current_page=e},expression:"current_page"}})],1),a("v-navigation-drawer",{attrs:{height:"85vh",width:"370",absolute:"",temporary:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-card",{staticClass:"d-flex flex-column",attrs:{height:"100%"}},[a("v-card-title",{staticClass:"pa-0",attrs:{"primary-title":""}},[a("v-app-bar",{attrs:{color:"grey lighten-3",dense:""}},[a("v-icon",{attrs:{left:""}},[t._v("mdi-filter-outline")]),a("v-card-title",{staticClass:"px-2",attrs:{"primary-title":""}},[t._v("Filtros")]),a("v-spacer"),a("v-btn",{attrs:{text:"",small:"",color:"error",outlined:""},on:{click:function(e){return t.clearAllFilters()}}},[a("v-icon",[t._v("mdi-broom")]),t._v("Limpiar ")],1)],1)],1),a("v-card-text",{staticClass:"px-1",attrs:{"primary-title":""}},[a("v-form",{ref:"form"},[a("v-combobox",{attrs:{items:t.list_actions,"item-text":"es",label:"Acciones",multiple:""},scopedSlots:t._u([{key:"selection",fn:function(e){return[a("v-chip",t._b({key:JSON.stringify(e.item),staticClass:"px-2",attrs:{outlined:"","input-value":e.selected,disabled:e.disabled},on:{"click:close":function(t){return e.parent.selectItem(e.item)}}},"v-chip",e.attrs,!1),[a("v-avatar",{attrs:{color:e.item.color,left:""}},[a("v-icon",{attrs:{size:"16",color:"black"}},[t._v(t._s(e.item.icon))])],1),t._v(" "+t._s(e.item.es)+" ")],1)]}}]),model:{value:t.filter_action,callback:function(e){t.filter_action=e},expression:"filter_action"}}),a("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":t.date_piker,transition:"scale-transition","offset-y":"","min-width":"290px"},on:{"update:returnValue":function(e){t.date_piker=e},"update:return-value":function(e){t.date_piker=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[a("v-text-field",t._g({attrs:{value:t.seeDates,label:"Rango de Fecha",readonly:""}},r))]}}]),model:{value:t.date_piker,callback:function(e){t.date_piker=e},expression:"date_piker"}},[a("v-date-picker",{attrs:{range:"",locale:"es-es"},model:{value:t.filter_dates,callback:function(e){t.filter_dates=e},expression:"filter_dates"}},[a("v-btn",{attrs:{small:"",text:"",color:"error",outlined:""},on:{click:function(e){return t.clearDate()}}},[a("v-icon",[t._v("mdi-broom")]),t._v("Limpiar ")],1),a("v-btn",{attrs:{small:"",text:""},on:{click:function(e){t.date_piker=!1}}},[t._v("Cancelar")]),a("v-btn",{attrs:{small:"",text:"",color:"primary"},on:{click:function(e){return t.$refs.menu.save(t.date_piker)}}},[t._v("OK")])],1)],1),a("v-select",{attrs:{items:t.list__users,"item-text":"user","item-value":"id",label:"Usuario","menu-props":{overflowY:!0,"offset-y":!0},clearable:""},model:{value:t.filter_user,callback:function(e){t.filter_user=e},expression:"filter_user"}}),a("v-select",{attrs:{clearable:"","menu-props":{overflowY:!0,"offset-y":!0},label:"Tablas",items:t.list_tables,"item-text":"table"},model:{value:t.filter_table,callback:function(e){t.filter_table=e},expression:"filter_table"}})],1)],1),a("v-spacer")],1)],1)],1)},i=[],n=(a("99af"),a("7db0"),a("c975"),a("a15b"),a("d81d"),a("45fc"),a("a434"),a("b0c0"),a("4fad"),a("96cf"),a("1da1")),s=a("53ca"),o=a("5530"),l=(a("b354"),a("2f62")),c={name:"Logs",data:function(){return{order:"desc",list_history:[],list_tables:[],expands:[],filter_dates:[],drawer:!1,cant_to_show:30,current_page:1,count_histry:0,date_piker:!1,filter_action:[],filter_user:"",filter_table:"",dont_show:["createdAt","deletedAt","updatedAt"],headers:[{text:"Campo",value:"campo",sortable:!1,class:"blue"},{text:"Valor",value:"valor",sortable:!1,class:"blue"}],headersUpdate:[{text:"Campo",value:"campo",sortable:!1,class:"blue"},{text:"Valor",value:"valor",sortable:!1,class:"blue"},{text:"Nuevo Valor",value:"valor_updated",sortable:!1,class:"blue"}],list_actions:[{name:"Insert",es:"Adicionar",color:"success",icon:"mdi-plus-thick"},{name:"Update",es:"Actualizar",color:"warning",icon:"mdi-pencil"},{name:"Delete",es:"Eliminar",color:"error",icon:"mdi-delete"}]}},watch:{current_page:function(t){this.getDataPaginated()}},computed:Object(o["a"])({},Object(l["e"])("admin",["list__users"]),{icon_order:function(){return"desc"===this.order?"mdi-sort-descending":"mdi-sort-ascending"},length:function(){return Math.ceil(this.count_histry/this.cant_to_show)},seeDates:function(){return this.filter_dates.join(" al ")},has_filters:function(){return!!this.filter_action.length||(!!this.filter_dates.length||(!!this.filter_user||!!this.filter_table))},filters:function(){var t={};return t.actions=this.filter_action.length?this.filter_action.map((function(t){return t.name})):[],1===this.filter_dates.length&&this.filter_dates.push(this.filter_dates[0]),t.dates=this.filter_dates.length?this.filter_dates:[],t.user=this.filter_user,t.table=this.filter_table,t}}),mounted:function(){this.init()},methods:{changeOrder:function(){this.order="desc"===this.order?"asc":"desc",this.init()},getColorByAction:function(t){return this.list_actions.find((function(e){return e.name===t})).color},getIconByAction:function(t){return this.list_actions.find((function(e){return e.name===t})).icon},action_doby:function(t){var e=this,a=[];return Object.entries(t).map((function(t){e.dont_show.some((function(e){return e===t[0]}))||a.push({campo:t[0],valor:"object"===Object(s["a"])(t[1])?JSON.stringify(t[1]):t[1]})})),a},action_dobyUpdate:function(t){var e=this,a=[];return Object.entries(t.toChangeData).map((function(t){e.dont_show.some((function(e){return e===t[0]}))||a.push({campo:t[0],valor:"object"===Object(s["a"])(t[1])?JSON.stringify(t[1]):t[1]})})),a.map((function(e){e.valor_updated=t.changeData.hasOwnProperty(e.campo)?t.changeData[e.campo]:""})),a},expandAndContract:function(t){if(this.expands.some((function(e){return e===t}))){var e=this.expands.indexOf(t);this.expands.splice(e,1)}else this.expands.push(t)},getDataPaginated:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.cant_to_show*(t.current_page-1),e.next=3,t.axios.get("/historySystem/".concat(a,"/").concat(t.cant_to_show,"/").concat(t.order,"/").concat(JSON.stringify(t.filters)));case 3:r=e.sent,t.list_history=r.data;case 5:case"end":return e.stop()}}),e)})))()},init:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.current_page=1,t.getDataPaginated(),e.next=4,t.axios.get("/historySystem/count/".concat(JSON.stringify(t.filters)));case 4:a=e.sent,t.count_histry=a.data;case 6:case"end":return e.stop()}}),e)})))()},expandAll:function(){for(var t=0;t<this.cant_to_show;t++)this.expands.push(t)},clearDate:function(){this.filter_dates=[],this.date_piker=!1},clearAllFilters:function(){this.$refs.form.reset(),this.filter_dates=[]},showFilters:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.drawer=!t.drawer,e.next=3,t.axios.get("/historySystemTables");case 3:a=e.sent,t.list_tables=a.data;case 5:case"end":return e.stop()}}),e)})))()}}},d=c,u=(a("a98c"),a("2877")),f=Object(u["a"])(d,r,i,!1,null,null,null);e["default"]=f.exports},a98c:function(t,e,a){"use strict";var r=a("1b3b"),i=a.n(r);i.a},c975:function(t,e,a){"use strict";var r=a("23e7"),i=a("4d64").indexOf,n=a("a640"),s=a("ae40"),o=[].indexOf,l=!!o&&1/[1].indexOf(1,-0)<0,c=n("indexOf"),d=s("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:l||!c||!d},{indexOf:function(t){return l?o.apply(this,arguments)||0:i(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-dbc441f6.d0d8885a.js.map