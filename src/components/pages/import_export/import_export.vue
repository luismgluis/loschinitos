<template>
  <v-card class="elevation-0 overflow-y-auto" :height="pantalla.size.y - 80">
    <v-tabs color="cyan accent-5" right>
      <v-tab>Importar datos</v-tab>
      <v-tab>Exportar datos</v-tab>

      <v-tab-item key="import">
        <v-card
          class="overflow-y-auto pt-5 px-1"
          fluid
          :height="pantalla.size.y - 150"
        >
          <v-row>
            <v-col cols="12" sm="6">
              <p class="subtitle-2">
                Escoge que tipo de datos vas a subir e ingresalos en el campo de
                abajo
              </p>
              <v-col cols="6">
                <v-select
                  v-model="opcionSelect"
                  :hint="`${opcionSelect.name} -> ${opcionSelect.descrip}`"
                  :items="opcionesSelect"
                  item-text="name"
                  item-value="valor"
                  label="Select"
                  persistent-hint
                  return-object
                  single-line
                ></v-select>
              </v-col>

              <v-textarea
                v-model="importar_input_value"
                filled
                auto-grow
                label="Ingresa los datos aqui"
                rows="4"
                row-height="30"
                shaped
                class="inputdatas"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-btn
            class="mr-5"
            v-on:click="analizar_fn"
            color="secondary"
            elevation="2"
            >Analizar</v-btn
          >

          <v-btn v-on:click="save_data" color="primary" elevation="2"
            >Guardar</v-btn
          >
          <v-card
            class="overflow-y-auto pt-5 px-1 elevation-0 mt-3"
            fluid
            :height="pantalla.size.y / 2"
          >
            <v-treeview :items="items_tree"></v-treeview
          ></v-card>
        </v-card>
      </v-tab-item>

      <v-tab-item key="export">
        <v-container fluid>
          <v-row>
            <v-col class="">
              <v-btn v-on:click="get_all_data" color="primary" elevation="2"
                >Exportar todos los datos</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
import importe_module from "../../../components/pages/import_export/import_export_module.js";

const importex = new importe_module();
export default {
  name: "clientes-com",
  data: function () {
    return {
      opcionSelect: {
        name: "Clientes",
        valor: "clientes",
        descrip: "Formato JSON",
      },
      opcionesSelect: [
        { name: "Clientes", valor: "clientes", descrip: "Formato JSON" },
        {
          name: "Transacciones",
          valor: "transacciones",
          descrip: "Separado por ( ' )",
        },
        { name: "Compras", valor: "compras", descrip: "Separado por ( | )" },
      ],
      importex: importex,
      items_tree: [],
      importar_input_value: `[{"id":"1b4dc721","name":"Zsa","age":67}]`,
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
    analizar_fn() {
      const context = this;
      try {
        context.items_tree = [];
        const json_o = JSON.parse(context.importar_input_value);
        if (typeof json_o == "object") {
          context.importex.object_to_treeview(json_o).then(function (res) {
            context.items_tree = res;
          });
        }
      } catch (error) {
        alert("Fallo");
      }
    },
    save_data() {
      this.importex
        .upload_datos(this.importar_input_value)
        .then(function (res) {
          if (res !== null) {
            alert("info subida");
          }
        })
        .catch(function (error) {
          alert(error);
        });
    },
    get_all_data() {
      this.importex.upload_datos;
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
    busqueda_value() {},
    opcionSelect(newval) {
      console.log(newval);

      switch (newval.valor) {
        case "clientes":
          this.importar_input_value = `[{"id":"1b4dc721","name":"Zsa","age":67}]`;
          break;
        case "transacciones":
          this.importar_input_value = `#00006000db00|70e87af3|208.13.131.207|ios|(2f935339,c983606)||#00006000db01|cab487b3|188.192.16.31|ios|(979b5210,d6a71102)||`;
          break;
        case "compras":
          this.importar_input_value = `2f6c661a'Pumpkin soup'3433`;
          break;
        default:
          break;
      }
    },
    /*p4:function(newval,oldval){__hacealgo__} */
  },
  mounted(){
     this.$emit("OnLoadPage", {name:"importexport",data:{}});
  }
};
</script>
<style lang="scss" scoped>
.inputdatas {
  max-height: 300px;
  overflow-y: auto;
}
.busqueda {
  margin-bottom: -20px;
  padding-bottom: 0px;
}
</style>
