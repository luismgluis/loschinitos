<template>
  <v-card elevation="0" class="cajagrande rounded-0" :height="pantalla.size.y">
    <!-- <component visible="false" :is="alerta"></component>-->
    <v-img height="200px" src="../../../assets/clienteconstelacion.svg">
      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-btn v-on:click="goHome" color="white" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title class="title white--text pl-0">
          Informacion del cliente
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="white" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in options" :key="index">
              <v-list-item-title v-on:click="optionClick(item.value)">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-card-title class="white--text mt-8">
        <v-avatar size="56">
          <img alt="user" :src="clienteData.avatar" />
        </v-avatar>
        <p class="ml-3">
          {{ clienteData.name }}
        </p>
      </v-card-title>
    </v-img>

    <v-card :height="pantalla.size.y - 200" class="overflow-y-auto">
      <v-card-text>
        <div class="font-weight-bold mb-2 subtitle-1">Actualmente Puedes</div>
        <div>Visualizar - Editar - Eliminar</div>
        <v-card-text>
          <div class="my-4 subtitle-1">
            • Esta es la informacion almacenada actualmente de
            {{ clienteData.name }}.
          </div>

          <v-row v-for="item in campos" :key="item.key" class="mt-3">
            <v-col class="campoedit" cols="12" sm="6">
              <v-text-field
                v-model="clienteData[item.key]"
                :value="item.value"
                :label="item.name"
                outlined
                :readonly="!editEnabled"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-card
            v-if="!editEnabled"
            class="mx-auto text-center"
            color="cyan"
            dark
          >
            <v-card class="mx-auto text-center stats_panel"  color="cyan">
              <v-card-text class="mx-0 px-0 stats_panel_grafic">
                <v-sheet color="transparent"
                  ><!--color="rgba(0, 0, 0, .12)" -->
                  <v-sparkline
                    :labels="clienteData_stats.keys"
                    :value="clienteData_stats.values"
                    color="rgba(255, 255, 255, .7)"
                    height="100"
                    padding="24"
                    stroke-linecap="round"
                    smooth
                  >
                  </v-sparkline>
                </v-sheet>
              </v-card-text>
            </v-card>

            <v-divider></v-divider>
            <v-card-text>
              <div class="subtitle-1 justify-center">Ultimas compras</div>
            </v-card-text>
          </v-card>
          <v-col v-if="!editEnabled" class="mx-0 px-0">
            <v-list>
              <!-- Historial-->
              <v-list-group :value="false" prepend-icon="mdi-wallet-giftcard">
                <template v-slot:activator>
                  <v-list-item-title>Historial de compras</v-list-item-title>
                </template>
                <v-row
                  v-for="item in clienteData_historial"
                  :key="item.uid"
                  class="mt-3"
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title
                        >Valor: <strong> ${{ item.pricetotal }}</strong> /
                        Codigo : {{ item.uid }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ item.fecha }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle
                        v-html="item.texto"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-row>
              </v-list-group>
              <!-- Historial -->
              <!-- Productos -->
              <v-list-group prepend-icon="mdi-target-account">
                <template v-slot:activator>
                  <v-list-item-title>Clientes cercanos</v-list-item-title>
                </template>
                <v-row
                  v-for="item in clienteData_similares"
                  :key="item.uid"
                  class="mt-3"
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title
                        >{{ item.buyer.name }} - {{ item.buyer.uid }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ item.texto }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-row>
              </v-list-group>
              <!-- Productos-->

              <!-- Otros-->
              <v-list-group prepend-icon="mdi-arrow-bottom-right-bold-outline">
                <template v-slot:activator>
                  <v-list-item-title>Recomendaciones</v-list-item-title>
                </template>
                <v-row
                  v-for="item in clienteData_recomendados"
                  :key="item.uid"
                  class="mt-3"
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title
                        >{{ item.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                          Costo = ${{item.price}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-row>
              </v-list-group>
              <!-- Otros-->
            </v-list>
          </v-col>

          <v-col cols="12" sm="6" v-if="editEnabled">
            <v-btn color="primary" @click="updateCliente"> Guardar </v-btn>
            <v-btn color="error" class="ml-5" @click="cancelEdit">
              Cancelar
            </v-btn>
          </v-col>
        </v-card-text>
      </v-card-text>
    </v-card>
  </v-card>
</template>
<script>
import cliente_info_module from "../../../components/pages/cliente_info/cliente_info.js";

//import alerta from "../../../components/ui/alerta.vue";
import my_genericos from "../../utils/my_genericos.js";
import Globals from "../../utils/globals.js";
const cinfo = new cliente_info_module();
let basec = my_genericos.tipos.cliente({});
export default {
  name: "cliente-info",
  data: function () {
    return {
      globals: new Globals(this.$globals),
      //alerta: new alerta(),
      client_info_class: cinfo,
      clienteData: basec,
      clienteData_last_original: {},
      clienteData_historial: [],
      clienteData_similares: [],
      clienteData_stats: { keys: [], values: [] },
      clienteData_recomendados: [],
      editEnabled: false,
      options: [
        { title: "Editar", value: "edit" },
        { title: "Eliminar", value: "remove" },
      ],
      campos: [
        { key: "1", name: "Nombre", value: "Jhon Do" },
        { key: "2", name: "Apellido", value: "Federico" },
      ],
      stats: {
        labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
        values: [200, 675, 410, 390, 310, 460, 250, 240],
      },
      pantalla: {
        size: {
          x: window.innerWidth,
          y: window.innerHeight,
        },
      },
    };
  },
  methods: {
    goHome(withupdate = false) {
      this.$router.replace({
        name: "home",
        params: { fromview: "cliente_info" },
      });
      if (withupdate) {
        this.globals.UpdateClientesPage();
      }
    },
    cancelEdit() {
      this.restoreInformacion();
      if (this.nuevo_cliente_enabled) {
        this.goHome(); //volvemos al home porque seria como lo ideal cuando cancelamos la creacion de un nuevo usuario;
      }
    },
    updateCliente() {
      const context = this;
      console.log(this.campos);
      console.log(this.clienteData);
      if (
        typeof this.nuevo_cliente_enabled !== "undefined" &&
        this.nuevo_cliente_enabled
      ) {
        this.client_info_class
          .subirCliente(this.clienteData)
          .then(function (res) {
            console.log(res);
            context.goHome(true);
          });
      } else {
        this.client_info_class
          .actualizarCliente(this.clienteData)
          .then(function (res) {
            console.log(res);
            context.goHome(true);
          });
      }
    },
    restoreInformacion() {
      const context = this;
      context.clienteData = my_genericos.tipos.cliente(
        context.clienteData_last_original
      );
      context.editEnabled = false;
    },
    insertarInformacion(res) {
      const context = this;
      const eLock = ["id", "avatar"];
      context.campos = [];
      context.clienteData = my_genericos.tipos.cliente(res);
      context.clienteData_last_original = my_genericos.tipos.cliente(res);
      for (const key in context.clienteData) {
        if (Object.hasOwnProperty.call(context.clienteData, key)) {
          const element = context.clienteData[key];
          if (eLock.includes(key)) {
            continue;
          }
          context.campos.push({
            key: key,
            name: my_genericos.nombrePropio(key),
            value: element,
          });
        }
      }
    },
    insertarDetalles(data) {
      console.log(data);
      this.clienteData_historial = data.transacciones;
      this.clienteData_similares = data.transaccionesporip;
      this.clienteData_recomendados = data.productosrecomendados;
      let k = my_genericos.object_get_array_of_child(data.stats, "name");
      this.clienteData_stats = {
        keys: k,
        values: my_genericos.object_get_array_of_child(data.stats, "valor"),
      };

      this.clienteData_otros = data.otros;
    },
    loadClienteInfo(uid) {
      const context = this;
      console.log("ID cliente:", uid);
      localStorage.setItem("cliente_info/ultimabusqueda", uid); //guardamos la busqueda para cierres inesperados
      cinfo.getClienteInfo(uid, function (res) {
        context.insertarInformacion(res);
        cinfo.getClienteInfoDetails(uid, function (res) {
          context.insertarDetalles(res);
        });
      });
    },
    loadNuevocliente() {
      let data = my_genericos.tipos.cliente(
        { id: "new", name: "Nombre Cliente" },
        true
      );
      this.insertarInformacion(data);
    },
    optionClick(option = "edit") {
      if (option == "edit") {
        console.log("editando");
        this.editEnabled = !this.editEnabled;
      } else if (option == "remove") {
        console.log("removiendodo");
      }
    },
  },
  props: ["uid", "nuevo_cliente"],
  computed: {
    nombreCambia: function () {
      return this.clienteData.name;
    },
    nuevo_cliente_enabled: function () {
      if (typeof this.nuevo_cliente !== "undefined") {
        return this.nuevo_cliente;
      } else {
        return false;
      } // nuevo_cliente_enabled:false,
    },
    /* auto_p3: function () {return `${this.p1} - ${this.p2}`}*/
  },
  components: {
    /*"component_name":componentimport*/
  },
  watch: {
    uid() {
      console.log(this.uid);
      this.editEnabled = false;
      this.loadClienteInfo(this.uid);
    },
    nuevo_cliente_enabled() {
      if (this.nuevo_cliente_enabled) {
        this.loadNuevocliente();
        this.editEnabled = true;
      }
    },
    nombreCambia(val) {
      const context = this;
      let name_stadby = `${val}`;
      setTimeout(() => {
        if (context.clienteData.name == name_stadby) {
          context.clienteData = my_genericos.tipos.cliente(
            context.clienteData,
            true
          );
        }
      }, 2000);
    },
  },
  mounted() {
    console.log("cliente_info");
    this.$emit("OnLoadPage", { name: "cliente_info", data: {} });
    if (this.nuevo_cliente_enabled == true) {
      this.loadNuevocliente();
      this.editEnabled = true;
      this.nuevo_cliente_enabled = true;
    } else if (typeof this.uid !== "undefined") {
      this.loadClienteInfo(this.uid);
      this.nuevo_clienuevo_cliente_enablednte = false;
      this.editEnabled = false;
    } else {
      let id = localStorage.getItem("cliente_info/ultimabusqueda");
      if (id) {
        this.loadClienteInfo(id);
        this.nuevo_cliente_enabled = false;
        this.editEnabled = false;
      } else {
        this.loadNuevocliente();
        this.editEnabled = true;
        this.nuevo_cliente_enabled = true;
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.campoedit {
  margin-bottom: -20px;
}
.stats_panel {
  overflow-y: auto;
}
.stats_panel_grafic {
  width: 100%;
  min-width: 500px;
}
</style>
