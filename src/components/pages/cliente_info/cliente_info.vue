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

          <v-col v-if="!editEnabled" class="mx-0 px-0">
            <v-list>
              <v-list-group :value="true" prepend-icon="mdi-wallet-giftcard">
                <template v-slot:activator>
                  <v-list-item-title>Historial de compras</v-list-item-title>
                </template>

                <v-list-group no-action sub-group>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title>Actions</v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-list-item
                    v-for="([title, icon], i) in cruds"
                    :key="i"
                    link
                  >
                    <v-list-item-title v-text="title"></v-list-item-title>

                    <v-list-item-icon>
                      <v-icon v-text="icon"></v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-group>
              </v-list-group>

              <v-list-group prepend-icon="mdi-target-account">
                <template v-slot:activator>
                  <v-list-item-title>Productos Similares</v-list-item-title>
                </template>

                <v-list-group no-action sub-group>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title>Actions</v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-list-item
                    v-for="([title, icon], i) in cruds"
                    :key="i"
                    link
                  >
                    <v-list-item-title v-text="title"></v-list-item-title>

                    <v-list-item-icon>
                      <v-icon v-text="icon"></v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-group>
              </v-list-group>

              <v-list-group prepend-icon="mdi-arrow-bottom-right-bold-outline">
                <template v-slot:activator>
                  <v-list-item-title>Otros</v-list-item-title>
                </template>

                <v-list-group no-action sub-group>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title>Actions</v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-list-item
                    v-for="([title, icon], i) in cruds"
                    :key="i"
                    link
                  >
                    <v-list-item-title v-text="title"></v-list-item-title>

                    <v-list-item-icon>
                      <v-icon v-text="icon"></v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-group>
              </v-list-group>
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
      clienteData_historial: {},
      clienteData_similares: {},
      clienteData_otros: {},
      editEnabled: false,
      options: [
        { title: "Editar", value: "edit" },
        { title: "Eliminar", value: "remove" },
      ],
      campos: [
        { key: "1", name: "Nombre", value: "Jhon Do" },
        { key: "2", name: "Apellido", value: "Federico" },
      ],
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
      if (typeof this.nuevo_cliente !== "undefined" || this.nuevo_cliente) {
        this.goHome(); //volvemos al home porque seria como lo ideal cuando cancelamos la creacion de un nuevo usuario;
      }
    },
    updateCliente() {
      const context = this;
      console.log(this.campos);
      console.log(this.clienteData);
      if (typeof this.nuevo_cliente !== "undefined" && this.nuevo_cliente) {
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
      this.clienteData_similares = data.productos;
      this.clienteData_otros = data.otros;
    },
    loadClienteInfo(uid) {
      const context = this;
      console.log("ID cliente:", uid);
      localStorage.setItem("cliente_info/ultimabusqueda",uid)//guardamos la busqueda para cierres inesperados
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
    nuevo_cliente() {
      if (this.nuevo_cliente) {
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
    if (typeof this.nuevo_cliente !== "undefined") {
      this.loadNuevocliente();
      this.editEnabled = true;
      this.nuevo_cliente = true;
    } else if (typeof this.uid !== "undefined") {
      this.loadClienteInfo(this.uid);
      this.nuevo_cliente = false;
      this.editEnabled = false;
    } else {
      let id = localStorage.getItem("cliente_info/ultimabusqueda");
      if (id) {
        this.loadClienteInfo(id);
        this.nuevo_cliente = false;
        this.editEnabled = false;
      } else {
        this.loadNuevocliente();
        this.editEnabled = true;
        this.nuevo_cliente = true;
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.campoedit {
  margin-bottom: -20px;
}
</style>
