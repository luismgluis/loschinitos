<template>
  <v-app id="inspire">
    <component
      @updatingPantalla="updatingPantallaActual"
      :is="pantallaActual"
      :key="pantallaActual_name"
    ></component>
  </v-app>
</template>

<script>
//import Home from "./components/Home";
//import CustomIcon from "./components/ui/CustomIcon";
import { VTextField } from "vuetify/lib";
import Home from "./components/Home";

//import {VContainer} from 'vuetify/lib'
export default {
  name: "App",
  components: {
    //CustomIcon,
  },
  data: () => ({
    //
    pantallaActual: Home,
    pantallaActual_name: "Home",
    pantallaHomeOriginal: null,
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
      if (typeof nuevapantalla.name !== "undefined") {
        if (typeof nuevapantalla.content !== "undefined") {
          if (this.pantallaActual_name == "Home") {
            this.pantallaHomeOriginal = this.pantallaActual; //guardamos el home para volver atras
          } //guardamos Home original
          if (nuevapantalla.name == "Home") {
            //si vamos para el home
            this.pantallaActual_name = "Home";
            this.pantallaActual = this.pantallaHomeOriginal;
          } else {
            this.pantallaActual_name = nuevapantalla.name;
            this.pantallaActual = nuevapantalla.content;
          }
        }
      }
    },
    buscarEnabled: function(e) {
      console.log(e);
      this.buscando_enabled = !this.buscando_enabled;
    },
    cargar_opciones: function() {
      let nuevo = new VTextField();
      console.log(nuevo);
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
