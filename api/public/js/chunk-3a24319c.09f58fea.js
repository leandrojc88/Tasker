(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3a24319c"],{"664f":function(t,i,n){"use strict";n.r(i);var a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-card",{staticClass:"mt-1 position-fixed",attrs:{outlined:"",width:"300"}},[n("v-card-title",{staticClass:"d-flex flex-row",attrs:{"primary-title":""}},[n("div",{staticClass:"title d-flex"},[n("v-img",{attrs:{contain:"",width:"34",height:"29",src:t.icon__bar}}),n("span",{staticClass:"ml-4"},[t._v(t._s(t.title__bar))])],1),n("v-spacer"),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(i){var a=i.on;return[n("v-icon",t._g({attrs:{color:"secondary"}},a),[t._v("mdi-help-circle")])]}}])},[n("span",[t._v(t._s(t.help__bar))])])],1),n("v-card-text",[n("v-form",{ref:"form"},[n("v-text-field",{attrs:{"error-messages":t.siglas__errors,counter:"20",name:"siglas",label:"Siglas",required:""},on:{input:function(i){return t.$v.siglas.$touch()},blur:function(i){return t.$v.siglas.$touch()}},model:{value:t.siglas,callback:function(i){t.siglas=i},expression:"siglas"}}),n("v-text-field",{attrs:{"error-messages":t.nombre__errors,name:"nombre",label:"Nombre"},on:{input:function(i){return t.$v.nombre.$touch()},blur:function(i){return t.$v.nombre.$touch()}},model:{value:t.nombre,callback:function(i){t.nombre=i},expression:"nombre"}})],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"error",outlined:""},on:{click:function(i){return t.onClear()}}},["Limpiar"===t.btn__action.clear?n("v-icon",[t._v("mdi-broom")]):t._e(),t._v(" "+t._s(t.btn__action.clear)+" ")],1),n("v-btn",{attrs:{width:"106",color:t.btn__action.btn__color},on:{click:function(i){return t.onSubmit()}}},[t._v(t._s(t.btn__action.btn__text))])],1)],1)},e=[],r=n("5530"),s=n("1dce"),o=n("b5ae"),c=(n("b354"),n("2f62")),d={mixins:[s["validationMixin"]],validations:{siglas:{required:o["required"],maxLength:Object(o["maxLength"])(20)},nombre:{required:o["required"]}},props:["icon__bar","title__bar","help__bar","unidad__item"],data:function(){return{action:"",id:"",siglas:"",nombre:"",rules:{}}},mounted:function(){this.checkActionAndData()},watch:{unidad__item:function(t){this.checkActionAndData()}},computed:{btn__action:function(){return"create"===this.action?{btn__text:"Crear",btn__color:"primary",clear:"Limpiar"}:{btn__text:"Modificar",btn__color:"warning",clear:"Cancelar"}},siglas__errors:function(){var t=[];return this.$v.siglas.$dirty?(!this.$v.siglas.required&&t.push("Campo Obligatorio"),!this.$v.siglas.maxLength&&t.push("Excede la cantidad maxima"),t):t},nombre__errors:function(){var t=[];return this.$v.nombre.$dirty?(!this.$v.nombre.required&&t.push("Campo Obligatorio"),t):t}},methods:Object(r["a"])({},Object(c["b"])("admin",["addUnidad","updateUnidad"]),{onSubmit:function(){var t=this;this.$v.$touch(),this.$v.$invalid||("create"===this.action?this.addUnidad({nombre:this.nombre,siglas:this.siglas}).then((function(i){t.$emit("manage-unidad","add")})).catch((function(i){t.$emit("error-unidad","no se pudo crear la unidad")})):this.updateUnidad({id:this.id,unidad:{nombre:this.nombre,siglas:this.siglas}}).then((function(i){t.$emit("manage-unidad","update")})).catch((function(i){t.$emit("error-unidad","no se pudo actualizar la unidad")})),this.onClear())},onClear:function(){this.$v.$reset(),this.siglas="",this.nombre="",this.id="",this.action="create",this.$emit("clear")},checkActionAndData:function(){this.unidad__item?(this.action="update",this.nombre=this.unidad__item.nombre,this.siglas=this.unidad__item.siglas,this.id=this.unidad__item.id):(this.action="create",this.nombre="",this.siglas="",this.id="")}})},u=d,l=(n("c2c6"),n("2877")),h=Object(l["a"])(u,a,e,!1,null,"56cf6ea5",null);i["default"]=h.exports},c2c6:function(t,i,n){"use strict";var a=n("c72e"),e=n.n(a);e.a},c72e:function(t,i,n){}}]);
//# sourceMappingURL=chunk-3a24319c.09f58fea.js.map