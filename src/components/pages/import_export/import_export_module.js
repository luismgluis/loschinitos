import my_genericos from "../../../components/utils/my_genericos.js";
class importexport {
  constructor() {
    console.log(my_genericos.fecha.obtener_fecha_actual_numeric());
  }
  get_all_data() {
    new Promise(function(resolve, reject) {
      try {
        const result = {};
        my_genericos.httpGetAsync(`${my_genericos.constantes.DBHOST}/`)
        resolve(result);
      } catch (error) {
       reject("error");
      }
    });
  }
  upload_datos(data) {
    return new Promise(function(resolve, reject) {
      let json_obj = {};

      try {
        json_obj = JSON.parse(data);
        json_obj = json_obj.clientes;
      } catch (error) {
        reject("json error parse");
      }
      if (typeof json_obj.clientes !== "undefined") {
        console.log(json_obj.clientes);
      }
      function check() {
        //chekeamos que todos los datos del objeto se subieran
        for (const key in json_obj) {
          if (Object.hasOwnProperty.call(json_obj, key)) {
            const element = json_obj[key];
            if (typeof element.ok !== "undefined") {
              if (element.ok == false) {
                return false;
              }
            } else {
              return false;
            }
          }
        }
        return true;
      } //esta puede ser una solucion costosa en procesamiento
      //pero es "mas segura"
      //podemos tambien implementar un contador y simplemente compararlo con
      // el tamaño del objecto con  let size = my_genericos.object_count(json_obj)

      for (const key in json_obj) {
        if (Object.hasOwnProperty.call(json_obj, key)) {
          const element = my_genericos.tipos.cliente(json_obj[key]);
          if (element.id !== "") {
            const post = my_genericos.tipos.cliente(element);
            element.ok = false;
            console.log("subir");
            my_genericos.httpPost(
              `${my_genericos.constantes.DBHOST}/cliente/create`,
              post,
              function(res) {
                console.log(res);
                element.ok = true;
                if (check()) {
                  resolve("OK");
                }
              }
            );
          }
        }
      }
    });
  }
  object_to_treeview(json_o) {
    return new Promise(function(resolve) {
      let id_c = 0;
      function formar(obje, con_arr = false) {
        let new_obj = {};
        if (con_arr) {
          new_obj = [];
        }
        for (const key in obje) {
          if (Object.hasOwnProperty.call(obje, key)) {
            const element = obje[key];
            id_c++; //contador de ids
            console.log(element);
            let insertar_esto = null;
            if (typeof element == "object") {
              insertar_esto = {
                id: id_c,
                name: key,
                children: formar(element, true),
              };
            } else if (Array.isArray(element)) {
              insertar_esto = {
                id: id_c,
                name: key,
                children: formar(element, true),
              };
            } else {
              insertar_esto = {
                id: id_c,
                name: `${key}: ${element}`,
              };
            }
            if (con_arr) {
              new_obj.push(insertar_esto);
            } else {
              new_obj[key] = element;
            }
          }
        }
        return new_obj;
      }
      const an = formar(json_o, true);
      //console.log(an);
      //const arr = Object.values(an);
      resolve(an);
      /*const the_items = formar(json_o);
            for (const key in json_o) {
                if (Object.hasOwnProperty.call(json_o, key)) {
                    const element = json_o[key];
                    console.log(element);
                    the_items[element.id] = {
                        id: element.id,
                        name: element.id,
                        children: [
                            { id: element.id + "1", name: `name: ${element.name}` },
                            { id: element.id + "2", name: `age: ${element.age}` },
                        ],
                    };
                }

                resolve(Object.values(the_items))
                //console.log(json_o);
            } */
    });
  }
}
export default importexport;
