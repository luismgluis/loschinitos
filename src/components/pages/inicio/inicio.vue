<template>
  <v-container>
    <v-card-text v-text="text"></v-card-text>
    <v-btn icon>
      <v-icon v-on:click="cli" color="grey lighten-1">
        mdi-information
      </v-icon>
    </v-btn>
     <v-text-field
      label="Main input"
      :rules="rules"
      hide-details="auto"
    ></v-text-field>
  </v-container>
</template>
<script>
import inicio_class from "../../../components/pages/inicio/inicio.js";

//prueba
import cliente_info from "../../../components/pages/cliente_info/cliente_info.vue";
const inicio = new inicio_class();
export default {
  name: "inicio",
  data: function() {
    return {
      inicio_class: inicio,
      text: "hola desde inicio",
      rules:[]
    };
  },
  methods: {
    cli(){
      console.log("var");
      this.$emit("updatingPantalla",{name:"cliente_info",content:cliente_info})
    }
  },
  props: [
    /*"propertiename"*/
  ],
  computed: {
    /* auto_p3: function () {return `${this.p1} - ${this.p2}`}*/
  },
  components: {
    /*"component_name":componentimport*/
  },
  watch: {
    /*p4:function(newval,oldval){__hacealgo__} */
  },
};
</script>
<style></style>
