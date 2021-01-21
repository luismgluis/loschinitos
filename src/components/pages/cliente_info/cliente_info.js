import my_genericos from "../../../components/utils/my_genericos.js";
import api from "../../../components/utils/api.js";
class cliente_info_module {
  constructor() {}
  getClienteInfo(uid = "", fn = null) {
    if (uid == "") {
      return;
    }
    api.clienteOnce(uid).then(function (datos) {
      const cliente = my_genericos.tipos.cliente(datos);
      console.log(cliente);
      
      fn(cliente);
    })
  }
  getClienteInfoDetails(uid,fn){
    if (uid == "") {
      return;
    }
    api.clienteOnceDetails(uid).then(function (datos) {
      console.log(datos);
      
      const cliente = my_genericos.tipos.cliente(datos.cliente);
      console.log(cliente);
      fn(datos);
    })
  }
  actualizarCliente(data){
    return new Promise(function(resolve, reject) {
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
    return new Promise(function(resolve, reject) {
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
