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
    <!-- v-for="(item, index) in clientes"  
          <v-list-item
              :key="item.id"
              v-on:click="openCliente(item.id)"
              class="bg1"
            >
            {{item.id}}
            </v-list-item>
            
           <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.age_text"
                ></v-list-item-subtitle>
              </v-list-item-content>
              -->

    <v-card class="overflow-y-auto elevation-0" :height="pantalla.size.y - 200">
      <v-virtual-scroll
        :items="clientes"
        :item-height="50"
        :height="pantalla.size.y - 200"
      >
        <template v-slot:default="{ item }">
          <v-list-item v-if="!item.header">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn depressed small v-on:click="openCliente(item.id)">
                Detalles
                <v-icon color="orange darken-1" right> mdi-open-in-new </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item v-else>
            {{ item.header }}
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-card>
    <v-btn
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
import my_genericos from "../../utils/my_genericos.js";
const clientesmodule = new clientes();
export default {
  name: "clientes-com",
  data: function () {
    return {
      globals: new Globals(this.$globals),
      clientesmodule: clientesmodule,
      items: [],
      clientesAll: [],
      clientes: [],
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
      const context = this;
      this.$router.replace({ name: "cliente_info", params: { uid: uid } });
      this.globals.setUpdateClientesPageFn(function () {
        context.start();
      });
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
    mostrarclientes(listado) {
      const context = this;
      if (my_genericos.object_count(listado) > 100) {
        context.clientesAll = listado;
        context.clientes = [];
        let counter = 0;
        for (const key in listado) {
          if (Object.hasOwnProperty.call(listado, key)) {
            const element = listado[key];
            counter++;
            if (counter >= 100) {
              break;
            } else {
              context.clientes.push(element);
            }
          }
        }
      } else {
        context.clientesAll = listado;
        context.clientes = listado;
      }
    },
    start() {
      const context = this;
      clientesmodule.get_listado().then(function (listado) {
        context.mostrarclientes(listado);
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
    async busqueda_value(n, o) {
      const context = this;
      if (n == null || n == "") {
        console.log("cancel");
        if (o == n) {
          return;
        }
      }
      this.busqueda_counter_check++;
      let ccc = this.busqueda_counter_check; //hacemos esto para controlar la asycronizacion
      setTimeout(async () => {
        //  3 doritos despues..
        let data = await clientesmodule.filtrar_listado(this.busqueda_value);
        if (ccc == context.busqueda_counter_check) {
          console.log("Render", data.length);
          context.mostrarclientes(data);
        }
      }, 300);
    },
  },
  mounted() {
    this.start();
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
.bg1 {
  border-radius: 20;
  border-style: solid;
  border-bottom-width: 2px;
}
</style>
