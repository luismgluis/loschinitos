<template>
  <v-container>
    <v-card-text>
      <div class="title">Bienvenido {{ denuevoMsj }}</div>
      <template>
        <div class="cartas">
          <carta-inicio />
        </div>
      </template>
      <div>De que va esta aplicacion :</div>
      <p class="display-1 text--primary">
        Los Chinitos App
      </p>
      <p>Por Luis Miguel</p>
      <div class="text--primary">
        Esta es una "muestra palpable" de mis habilidades como desarrollador
        <br />
        Y mucho mas <strong>importante</strong> un reto personal de aprendizaje
        de un nuevo Framework en este caso <br />
        <strong>Vue.js</strong> <br />
        <br />
        Visualmente esta apoyado sobre <strong>vuetifyjs</strong> el cual proporciona
        modulos/componentes esteticamente agradables,
        semejantes a una experiencia nativa-movil lo cual esta bien y en
        terminos practicos bastante afín al proposito de esta aplicacion.
  <br />
        El Backend de esta app esta en <div>
          <a href=" https://github.com/luismgluis/loschinitos_backend_go" target="_blank" rel="noopener noreferrer">github.com/luismgluis/loschinitos_backend_go</a>
        </div>
        <br />
        Recuerde leer el README.md
      </div>
    </v-card-text>
    <v-btn icon>
      <v-icon v-on:click="cli" color="grey lighten-1">
        mdi-information
      </v-icon>
    </v-btn>
  </v-container>
</template>
<script>
import inicio_class from "../../../components/pages/inicio/inicio.js";
import fecha from "../../../components/utils/fecha.js";

//prueba
import cliente_info from "../../../components/pages/cliente_info/cliente_info.vue";
import carta_inicio_ from "../../../components/ui/carta_inicio.vue";
const inicio = new inicio_class();
export default {
  name: "inicio",
  data: function() {
    return {
      inicio_class: inicio,
      text: `Hola \n Mi nombre es Luis Miguel \n Esta es una app de prueba`,
      rules: [],
      denuevoMsj: "",
    };
  },
  methods: {
    cli() {
      console.log("var");
      this.$emit("updatingPantalla", {
        name: "cliente_info",
        content: cliente_info,
      });
    },
    onScroll() {
      console.log(1);
    },
  },
  mounted() {
    //localStorage.removeItem("config/primer_inicio")
    let primer_inicio = localStorage.getItem("config/primer_inicio");

    if (primer_inicio !== null) {
      this.denuevoMsj = " de nuevo!";
    } else {
      localStorage.setItem(
        "config/primer_inicio",
        fecha.fecha_actual_numeric()
      );
    }
  },
  props: [
    /*"propertiename"*/
  ],
  computed: {
    /* auto_p3: function () {return `${this.p1} - ${this.p2}`}*/
  },
  components: {
    "carta-inicio": carta_inicio_,
  },
  watch: {
    /*p4:function(newval,oldval){__hacealgo__} */
  },
};
</script>

<style lang="scss" scoped>
.cartas {
  padding: 30px 0px;
}
</style>
