import my_genericos from "../../../components/utils/my_genericos.js";
import api from "../../../components/utils/api.js";
class cliente_info_module {
  constructor() {}
  getClienteInfo(uid = "", fn = null) {
    if (uid == "") {
      return;
    }
    api.clienteOnce(uid).then(function(datos) {
      const cliente = my_genericos.tipos.cliente(datos);
      console.log(cliente);

      fn(cliente);
    });
  }
  getClienteInfoDetails(uid, fn) {
    if (uid == "") {
      return;
    }
    api.clienteOnceDetails(uid).then(function(datos) {
      console.log(datos);
      for (const key in datos.transacciones) {
        if (Object.hasOwnProperty.call(datos.transacciones, key)) {
          const element = datos.transacciones[key];
          let texto = ``;
          let arrprods = element.produtids;
          for (const keyp in arrprods) {
            if (Object.hasOwnProperty.call(arrprods, keyp)) {
              const idprod = arrprods[keyp];
              const prod = my_genericos.tipos.producto(datos.productos[idprod]);
              if (typeof prod !== "undefined") {
                texto += `${prod.name} ${prod.price} \n`;
              }
            }
          }
          element.texto = texto;
        }
      }
      datos.transacciones = Object.values(datos.transacciones);

      fn(datos);
    });
  }
  actualizarCliente(data) {
    return new Promise(function(resolve, reject) {
      try {
        api.clienteUpdate(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject("error");
      }
    });
  }
  subirCliente(data) {
    return new Promise(function(resolve, reject) {
      try {
        api.clienteCrear(data).then(function(res) {
          resolve(res);
        });
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
