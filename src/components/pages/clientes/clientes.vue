<template>
  <v-container>
    <v-col class="busqueda" cols="12" sm="6" md="4">
      <v-text-field
        v-model="busqueda_value"
        label="Busqueda"
        placeholder="Fulanito"
        filled
        rounded
        dense
        clearable
      ></v-text-field>
    </v-col>
    <v-card class="overflow-y-auto elevation-0" :height="pantalla.size.y - 200">
      <v-list three-line>
        <template v-for="(item, index) in items">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item v-else :key="item.id" v-on:click="openCliente(item.id)">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.name"></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.age_text"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
    <v-btn
      v-show="!hidden"
      color="pink"
      class="botonplus"
      dark
      absolute
      right
      fab
      v-on:click="nuevoCliente"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>
<script>
import clientes from "../../../components/pages/clientes/clientes.js";
//import cliente_info from "../../../components/pages/cliente_info/cliente_info.vue";
import Globals from "../../utils/globals.js";
const clientesmodule = new clientes();
export default {
  name: "clientes-com",
  data: function () {
    return {
      globals: new Globals(this.$globals),
      clientes: clientesmodule,
      items: [],
      busqueda_value: "",
      busqueda_counter_check: 0,
      pantalla: {
        size: {
          x: window.innerWidth,
          y: window.innerHeight,
        },
      },
    };
  },
  methods: {
    openCliente(uid) {
      console.log(uid);

      this.$router.replace({ name: "cliente_info", params: { uid: uid } });
      /*this.$emit("updatingPantalla", {
        name: "cliente_info",
        content: cliente_info,
        data:uid
      }); */
    },
    nuevoCliente() {
      this.$router.replace({
        name: "cliente_info",
        params: { nuevo_cliente: true },
      });
    },
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
    busqueda_value(n, o) {
      const context = this;
      console.log(o);
      if (n == null || n == "") {
        return;
      }
      this.busqueda_counter_check++;
      let ccc = this.busqueda_counter_check; //hacemos esto para controlar la asycronizacion
      clientesmodule.filtrar_listado(n, function (res) {
        if (ccc == context.busqueda_counter_check) {
          context.items = res;
        }
      });
    },
    /*p4:function(newval,oldval){__hacealgo__} */
  },
  mounted() {
    const context = this;
    clientesmodule.get_listado().then(function (listado) {
      context.items = listado;
    });
  },
};
</script>
<style lang="scss" scoped>
.busqueda {
  margin-bottom: -20px;
  padding-bottom: 0px;
}
.botonplus {
  bottom: 20px;
  position: absolute;
}
</style>
