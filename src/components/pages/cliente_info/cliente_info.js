import my_genericos from "../../../components/utils/my_genericos.js";
import api from "../../../components/utils/api.js";

import { AvatarGenerator } from "random-avatar-generator";
const generator = new AvatarGenerator();

class cliente_info_module {
  constructor() {}
  getClienteInfo(uid = "", fn = null) {
    if (uid == "") {
      return;
    }
    my_genericos.httpGetAsync(
      `${my_genericos.constantes.DBHOST}/cliente/${uid}`,
      function(result) {
        try {
          console.log(result);
          let datos = {};
          if (Array.isArray(result.cliente)) {
            datos = result.cliente[0];
          } else {
            datos = result.cliente;
          }
          const cliente = my_genericos.tipos.cliente(datos);
          if (cliente.avatar == "") {
            cliente.avatar = generator.generateRandomAvatar(cliente.id);
          }
          console.log(cliente);
          fn(cliente);
        } catch (error) {
          fn(null);
        }
      }
    );
  }
  actualizarCliente(data){
    new Promise(function(resolve, reject) {
      try {
        api.clienteUpdate(data).then(function (res) {
          resolve(res);
        })
      } catch (error) {
       reject("error");
      }
    });
  }
  subirCliente(data){
    new Promise(function(resolve, reject) {
      try {
        api.clienteCrear(data).then(function (res) {
          resolve(res);
        })
      } catch (error) {
       reject("error");
      }
    });
  }
}
export default cliente_info_module;

/*class client_info {
    constructor() {
        
    }
}
export default client_info;*/
