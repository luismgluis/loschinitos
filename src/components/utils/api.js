import my_genericos from "./my_genericos.js";

class Api {
  constructor() {
    this.host = my_genericos.constantes.DBHOST;
  }
  clientesAll() {
    return new Promise(function(resolve, reject) {
      try {
        //--
        const ruta = `${my_genericos.constantes.DBHOST}/clientes`;
        my_genericos.httpGetAsync(ruta, function(res) {
          try {
            if (typeof res.clientes !== "undefined") {
              resolve(res.clientes);
            } else {
              reject("json parse fail");
            }
          } catch (error) {
            reject("json parse fail");
          }
        });
        //--
      } catch (error) {
        reject("error");
      }
    });
  }
  clienteOnce(uid) {
    new Promise(function(resolve, reject) {
      try {
        //--
        const ruta = `${my_genericos.constantes.DBHOST}/cliente/${uid}`;
        my_genericos.httpGetAsync(ruta, function(result) {
          try {
            let datos = {};
            if (Array.isArray(result.cliente)) {
              datos = result.cliente[0];
            } else {
              datos = result.cliente;
            }
            const cliente = my_genericos.tipos.cliente(datos, true);
            //console.log(cliente);
            resolve(cliente);
          } catch (error) {
            reject("json parse fail");
          }
        });
        //--
      } catch (error) {
        reject("error");
      }
    });
  }
  clienteCrear(data) {
    return new Promise(function(resolve, reject) {
      try {
        const cliente = my_genericos.tipos.cliente(data);
        cliente.avatar = ""; //esto cuando subamos imagenes mientras solo avatars
        my_genericos
          .httpPost(`${this.host}/cliente`, cliente)
          .then(function(res) {
            resolve(res);
          });
      } catch (error) {
        reject("error");
      }
    });
  }
  clienteUpdate(data) {
    return new Promise(function(resolve, reject) {
      try {
        const cliente = my_genericos.tipos.cliente(data);
        cliente.avatar = ""; //esto cuando subamos imagenes mientras solo avatars
        my_genericos
          .httpPost(`${this.host}/cliente/${cliente.id}`, cliente)
          .then(function(res) {
            resolve(res);
          });
      } catch (error) {
        reject("error");
      }
    });
  }

}
export default new Api();
