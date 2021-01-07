import my_genericos from "../../../components/utils/my_genericos.js";
class clientes {
    constructor() {
        this.listado = [
            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                title: "Brunch this weekend?",
                subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
            },
            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
                title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
            },
            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
                title: "Oui oui",
                subtitle:
                    '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
            },
            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                title: "Birthday gifta",
                subtitle:
                    '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
            },

            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
                title: "Recipe to tryaa",
                subtitle:
                    '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
            },

            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
                title: "Recipe to tryaaa",
                subtitle:
                    '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
            },

            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
                title: "Recipe to tryaaaa",
                subtitle:
                    '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
            },
        ]
    }
    cliente_data(data) {
        return {
            avatar: data.avatar || "",
            title: data.title || "",
            subtitle: data.subtitle || ""
        }
    }
    get_listado() {

        let division = { divider: true, inset: true }
        let arr_result = [];
        const listado = Object.assign(this.listado, {});
        arr_result.push({ header: "Hoy" });//cabecera
        for (const key in listado) {
            if (Object.hasOwnProperty.call(listado, key)) {
                const element = listado[key];
                arr_result.push(Object.assign(element, {}));
                arr_result.push(Object.assign(division, {}))//copia de division
            }
        }
        return arr_result
    }
    filtrar_listado(text, fn) {

        const listado = this.listado;
        const listado_res = [];
        const size = my_genericos.object_count(listado);
        let conteo = 0;
        let conteop = 0;
        const division = { divider: true, inset: true }

        const cabecera = { header: `${conteo}/${size}` }
        listado_res.push(cabecera);

        for (const key in listado) {
            if (Object.hasOwnProperty.call(listado, key)) {
                const cliente = this.cliente_data(listado[key]);

                my_genericos.coincidencias(text, cliente.title).then(function (res) {
                    console.log(res);
                    conteo++;
                    if (res.cantidad > 0) {
                        conteop++;
                        cliente.coincidencia = res;
                        listado_res.push(cliente);
                        listado_res.push(Object.assign(division, {}))
                    }
                    if (size == conteo) {
                        if(conteop <= 0){
                            fn(listado);
                        }else{
                            cabecera.header = `${conteop}/${size}`;
                            fn(listado_res);
                        }
                       
                    }
                })
            }
        }
        return {}
    }
}
export default clientes;

/*class client_info {
    constructor() {

    }
}
export default client_info;*/