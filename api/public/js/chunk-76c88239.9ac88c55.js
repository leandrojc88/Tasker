(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76c88239","chunk-3a24319c"],{"48f4":function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAA9CAYAAAD/CXS4AAAABHNCSVQICAgIfAhkiAAABJxJREFUeF7tm71v5EQUwN9z5EVICK6DCo6Kjo+SigsdFRuJihw6r/CMoghxWYmaywn6ywmkJGOvdlGKKygu4Q/gAg0NSJxEjUJNcbkCrbTWzkPv5M0Z73i8vt2NLXam2cJvPG9+fp/eMUKNQwjxNgD0EZF/GzOI6Hci6mKdGkkpBwBwo04ditYmopNa4QghThHxvYbC+cnBKXgyRNQsOFrr9TiOT+uwpDAMr3me92CytoOTeQoOjsUkLx2OlPKG1vo8juMTk175gLwSbrW1tXV1PB7fn9QvRHSaJMnGYDA4z0JaOThCiAAA7iDilSwIIjonoo1swF0ZOEEQXPF9n6EwHNvYU0p1WWAl4FRtA7g8B4AOADDIbOuwE0URX7v0sZSAXORGAPAYAHYBgN3rVn637GYA0I2iiFuI2sdC4bAbtVqtPgC0DTt7SETBxApSyzpGxNcMssej0aiTD9YmWtvb2y8Mh8PnbST7/f7fk+ubm5svtlqt52aRXxgc3iwi3geAq4aFvxuNRjv5zaYxaYCIHxrmnGmtO2XVsRDiG0T8zLZZrfXHcRzfS2Pa94j4UYlZvq+UerAQOEKIm4i4Z1jwMRFxzLC6CbthOv8lwz12lVK3izbTWDhV3KgsgHAdpLU+BoC3DLHodG1trXNwcHCWv9ZIODY3IqK7URTtlAExXRdC7CHiTVOwRsSOUooBXozGwZFScqbhrJMfnI2C/AaqQkp9nSFMuRkRDZIk6U7iV2PgpAGUW4BrpmzkeV7bZPpV4bB8WbDmypozn5SSH9IntjX49WYURT+wjJTyWwD4wCaPiNcPDw9/mTkgsyBno3wLwIvM40Zl4KSU7J53THJpsL9bdo9nvT4THJsbaa3bZen2WZWbzEvjG2c8Y7A2NbDzrsnzrXDSTpr/CZhyI34rliRJe5ZCbRGKpm62WyVYz7tuIRwpZZuIGMx/Oul0wdtKKVNAnlef0vmsFwCwFZlqoosGtvRGMwgY4aRFGbcBU9noMtyoTO/UormynvqXghvYJEnWF2HRRXAeGd69XKoblQFKMw9b71QDCwAbReWElPLVAqu7WHI4HP55dHT0jxGOlJJyynWVUqb2YJY9LFWmoIEtdHshxHy9VR6OUqrW/7LK6Ka1TtaCHJwJNAfHYj4OjoNTFl3M16tYThiGXyPium0lIvo8juPfZspW/6eAXAW/g2OhtRQ4QRC84vv+G1We0kRWa33W6/X+qjK3iltVue9S4IRh+KnneXEVRTKyXyqlvqoy18FZULaqAn3lLCcMwzcB4GUbJN/3f93f33+0cnBq762aHHMcHIDmNp7OcuzFU2NTuXMru1t9gYjv2rLVeDy+1ev1/li5bOXqHIvlODgOzlMbcL2V662eEHBducUQHBwHp0refCrrLMdZjrOcaQJN7MoX8WHtk88YDacsKh1UIqJ3Ck6ll9oSIv5IRD+XCmYEiIjPK2ZPn029z1kmnCq68gFKQKz1YMay4JyYLKcSnAYIT50nWoDlPNRa76AQgr9mMX2s0YB9l6vged7rizoPnV8N05ObbUQ0fQFTrl2NEkR0vMyP1/4FaTEWeHkX3mkAAAAASUVORK5CYII="},"4dd7":function(t,i,n){},"664f":function(t,i,n){"use strict";n.r(i);var a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-card",{staticClass:"mt-1 position-fixed",attrs:{outlined:"",width:"300"}},[n("v-card-title",{staticClass:"d-flex flex-row",attrs:{"primary-title":""}},[n("div",{staticClass:"title d-flex"},[n("v-img",{attrs:{contain:"",width:"34",height:"29",src:t.icon__bar}}),n("span",{staticClass:"ml-4"},[t._v(t._s(t.title__bar))])],1),n("v-spacer"),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(i){var a=i.on;return[n("v-icon",t._g({attrs:{color:"secondary"}},a),[t._v("mdi-help-circle")])]}}])},[n("span",[t._v(t._s(t.help__bar))])])],1),n("v-card-text",[n("v-form",{ref:"form"},[n("v-text-field",{attrs:{"error-messages":t.siglas__errors,counter:"20",name:"siglas",label:"Siglas",required:""},on:{input:function(i){return t.$v.siglas.$touch()},blur:function(i){return t.$v.siglas.$touch()}},model:{value:t.siglas,callback:function(i){t.siglas=i},expression:"siglas"}}),n("v-text-field",{attrs:{"error-messages":t.nombre__errors,name:"nombre",label:"Nombre"},on:{input:function(i){return t.$v.nombre.$touch()},blur:function(i){return t.$v.nombre.$touch()}},model:{value:t.nombre,callback:function(i){t.nombre=i},expression:"nombre"}})],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"error",outlined:""},on:{click:function(i){return t.onClear()}}},["Limpiar"===t.btn__action.clear?n("v-icon",[t._v("mdi-broom")]):t._e(),t._v(" "+t._s(t.btn__action.clear)+" ")],1),n("v-btn",{attrs:{width:"106",color:t.btn__action.btn__color},on:{click:function(i){return t.onSubmit()}}},[t._v(t._s(t.btn__action.btn__text))])],1)],1)},e=[],o=n("5530"),s=n("1dce"),r=n("b5ae"),c=(n("b354"),n("2f62")),d={mixins:[s["validationMixin"]],validations:{siglas:{required:r["required"],maxLength:Object(r["maxLength"])(20)},nombre:{required:r["required"]}},props:["icon__bar","title__bar","help__bar","unidad__item"],data:function(){return{action:"",id:"",siglas:"",nombre:"",rules:{}}},mounted:function(){this.checkActionAndData()},watch:{unidad__item:function(t){this.checkActionAndData()}},computed:{btn__action:function(){return"create"===this.action?{btn__text:"Crear",btn__color:"primary",clear:"Limpiar"}:{btn__text:"Modificar",btn__color:"warning",clear:"Cancelar"}},siglas__errors:function(){var t=[];return this.$v.siglas.$dirty?(!this.$v.siglas.required&&t.push("Campo Obligatorio"),!this.$v.siglas.maxLength&&t.push("Excede la cantidad maxima"),t):t},nombre__errors:function(){var t=[];return this.$v.nombre.$dirty?(!this.$v.nombre.required&&t.push("Campo Obligatorio"),t):t}},methods:Object(o["a"])({},Object(c["b"])("admin",["addUnidad","updateUnidad"]),{onSubmit:function(){var t=this;this.$v.$touch(),this.$v.$invalid||("create"===this.action?this.addUnidad({nombre:this.nombre,siglas:this.siglas}).then((function(i){t.$emit("manage-unidad","add")})).catch((function(i){t.$emit("error-unidad","no se pudo crear la unidad")})):this.updateUnidad({id:this.id,unidad:{nombre:this.nombre,siglas:this.siglas}}).then((function(i){t.$emit("manage-unidad","update")})).catch((function(i){t.$emit("error-unidad","no se pudo actualizar la unidad")})),this.onClear())},onClear:function(){this.$v.$reset(),this.siglas="",this.nombre="",this.id="",this.action="create",this.$emit("clear")},checkActionAndData:function(){this.unidad__item?(this.action="update",this.nombre=this.unidad__item.nombre,this.siglas=this.unidad__item.siglas,this.id=this.unidad__item.id):(this.action="create",this.nombre="",this.siglas="",this.id="")}})},l=d,u=(n("c2c6"),n("2877")),m=Object(u["a"])(l,a,e,!1,null,"56cf6ea5",null);i["default"]=m.exports},c1a3:function(t,i,n){"use strict";n.r(i);var a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-container",{attrs:{fluid:""}},[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{staticClass:"d-flex justify-center",attrs:{sm:"auto",xs:"12"}},[n("v-sheet",{attrs:{"min-width":"300",width:"300"}},[n("manageUnidades",{attrs:{icon__bar:t.icons.iconUnidad,title__bar:"Unidades",unidad__item:t.unidad__item},on:{"manage-unidad":t.evtManageUnidad,"error-unidad":t.evtError,clear:function(i){t.unidad__item=null}}}),n("v-btn",{staticClass:"mt-1 hidden-sm-and-up",attrs:{small:"",fab:"",bottom:"",right:"",fixed:"",color:"info"},on:{click:function(i){return t.$vuetify.goTo(0,t.options)}}},[n("v-icon",[t._v("mdi-chevron-up")])],1)],1)],1),n("v-col",{staticClass:"pa-0"},[n("v-container",{staticClass:"pa-0"},[n("v-row",{staticClass:"pa-0 justify-center",attrs:{"no-gutters":""}},t._l(t.lista__unidades,(function(i,a){return n("v-col",{key:a,attrs:{cols:"auto"}},[n("v-card",{staticClass:"ma-1 d-flex flex-column elevation-3",attrs:{width:"219",height:"235"}},[n("v-sheet",{staticClass:"grey lighten-2 d-flex flex-column justify-end unborde-down",attrs:{height:"112","min-height":"112"}},[n("div",{staticClass:"d-flex"},[n("v-img",{staticClass:"withe--text",attrs:{width:"66",height:"56",contain:"",src:t.icons.iconUnidad}})],1),n("v-card-title",{staticClass:"text-uppercase py-1 pl-2"},[t._v(t._s(i.siglas))])],1),n("v-card-text",{staticClass:"pa-1 text-capitalize"},[t._v(t._s(i.nombre))]),n("v-spacer"),n("v-card-actions",{staticClass:"pa-0 mb-2 mr-2"},[n("v-spacer"),n("v-btn",{attrs:{outlined:t.outline__edit(i.id),dark:!t.outline__edit(i.id),fab:"",small:"",color:"grey darken-3"},on:{click:function(n){return t.editUnidad(i)}}},[n("v-icon",[t._v("mdi-pencil")])],1),n("v-btn",{attrs:{outlined:"",fab:"",small:"",color:"error"},on:{click:function(n){return t.deleteUnidad(i)}}},[n("v-icon",[t._v("mdi-delete")])],1)],1)],1)],1)})),1)],1)],1)],1),n("v-bottom-sheet",{model:{value:t.sheet,callback:function(i){t.sheet=i},expression:"sheet"}},[n("v-sheet",{staticClass:"text-center",attrs:{height:"200px"}},[n("v-btn",{staticClass:"ma-3 mt-6",attrs:{outlined:""},on:{click:function(i){t.sheet=!1}}},[t._v("Cancelar")]),n("v-btn",{staticClass:"ma-3 mt-6",attrs:{dark:"",color:"red"},on:{click:function(i){return t.removeItem()}}},[t._v("Confirmar")]),n("div",{staticClass:"py-3"},[t._v(" Seguro que desea eliminar la Unidad "),n("span",{staticStyle:{color:"red","font-weight":"600"}},[t._v(t._s(t.siglas))]),t._v(" ? ")])],1)],1),n("v-snackbar",{attrs:{top:"",color:t.notification_color},model:{value:t.notification,callback:function(i){t.notification=i},expression:"notification"}},[t._v(" "+t._s(t.notification_msg)+" "),n("v-icon",{attrs:{dark:""},on:{click:function(i){t.notification=!1}}},[t._v("mdi-close")])],1),n("v-overlay",{attrs:{value:t.overlay}},[n("v-progress-circular",{attrs:{indeterminate:"",size:"64"}})],1)],1)},e=[],o=n("5530"),s=n("48f4"),r=n.n(s),c=n("664f"),d=n("2f62"),l={components:{manageUnidades:c["default"]},data:function(){return{overlay:!1,notification_msg:"",notification_color:"success",notification:!1,sheet:!1,icons:{iconUnidad:r.a},options:{duration:200,easing:"easeInOutCubic"},unidad__item:null,unidad__delete:null}},computed:Object(o["a"])({siglas:function(){return this.unidad__delete?this.unidad__delete.siglas:""}},Object(d["c"])("admin",{lista__unidades:"orderUnidades"})),methods:Object(o["a"])({},Object(d["b"])("admin",["actionDeleteUnidad"]),{outline__edit:function(t){return!(this.unidad__item&&this.unidad__item.id===t)},evtManageUnidad:function(t){"add"===t?(this.notification_color="success",this.notification=!0,this.notification_msg="Unidad creada satisfactoriamente"):(this.notification_color="success",this.notification=!0,this.notification_msg="Unidad Actualizada satisfactoriamente")},evtError:function(t){this.notification_color="error",this.notification=!0,this.notification_msg=t},editUnidad:function(t){this.unidad__item=t},deleteUnidad:function(t){this.unidad__item=null,this.sheet=!0,this.unidad__delete=t},removeItem:function(){var t=this;this.overlay=!0,this.sheet=!1,this.actionDeleteUnidad(this.unidad__delete).then((function(i){t.notification_color="success",t.notification=!0,t.notification_msg="Eliminada la unidad ".concat(t.unidad__delete.siglas),t.overlay=!1})).catch((function(i){t.overlay=!1,t.notification_color="error",t.notification=!0,t.notification_msg="".concat(i)}))}})},u=l,m=(n("d93e"),n("2877")),v=Object(m["a"])(u,a,e,!1,null,"7445925e",null);i["default"]=v.exports},c2c6:function(t,i,n){"use strict";var a=n("c72e"),e=n.n(a);e.a},c72e:function(t,i,n){},d93e:function(t,i,n){"use strict";var a=n("4dd7"),e=n.n(a);e.a}}]);
//# sourceMappingURL=chunk-76c88239.9ac88c55.js.map