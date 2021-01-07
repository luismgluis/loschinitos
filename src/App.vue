<template>
  <v-app id="inspire">
   <component v-if="!pantalla2enabled"
      @updatingPantalla="updatingPantallaActual"
      :is="pantallas.home"
      key="Home"
    ></component>
   
  </v-app>
</template>

<script>
/*  
<component  key="Secundaria"
     :is="pantallas.secudaria"></component>
<component key="Secundaria"
     :is="pantallas.secudaria"></component> */
//import Home from "./components/Home";
//import CustomIcon from "./components/ui/CustomIcon";
//import { VTextField } from "vuetify/lib";
import Home from "./components/Home";
import client_info from "./components/pages/cliente_info/cliente_info.vue";


//import {VContainer} from 'vuetify/lib'
export default {
  name: "App",
  components: {
    //CustomIcon,
  },
  data: () => ({
    //
    pantallas:{
      home:Home,
      secundaria:client_info
    },
    pantalla2enabled:false,
    images: {
      background: "./assets/mockup.jpg",
      //close: require("../assets/close.svg")
    },
    pantalla: {
      size: {
        x: window.innerWidth,
        y: window.innerHeight,
      },
    },
  }),
  methods: {
    updatingPantallaActual(nuevapantalla = {}) {
      console.log(nuevapantalla);
      if (nuevapantalla.name == "Home") {
        this.pantallas.secundaria = null;
        this.pantalla2enabled = false;
      }else{
        this.pantallas.secundaria = nuevapantalla.content;
        this.pantalla2enabled = true;
      }
    },
    buscarEnabled: function(e) {
      console.log(e);
      this.buscando_enabled = !this.buscando_enabled;
    },
    cargar_opciones: function() {
    },
    tabs_content: function(card_id) {
      card_id = card_id.toUpperCase();
      if (card_id == "CLIENTES") {
        //return new clientesVue();
      }
    },
    card_selected: function(card_id) {
      if (!card_id) {
        card_id = this.tab.split("-")[1];
      }
      console.log(card_id);
    },
  },
  mounted() {
    const context = this;
    console.log("start_app");
    window.addEventListener("resize", function() {
      console.log(window.innerHeight);
      context.pantalla.size.x = window.innerWidth;
      context.pantalla.size.y = window.innerHeight;
    });
  },
};
</script>
