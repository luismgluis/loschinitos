import my_genericos from "../../../components/utils/my_genericos.js";
class ventas {
    constructor() {
       console.log(my_genericos.obtener_fecha_actual_numeric());
       this.listado = [
        {
          action: '1 hr',
          headline: '$15.000',
          subtitle: `07/01/2021 16:45`,
          title: 'Gomitas',
        },
        {
          action: '2 hr',
          headline: '$20.000',
          subtitle: `07/01/2021 16:45`,
          title: 'Egg',
        },
        {
          action: '10 hr',
          headline: '$20.000',
          subtitle: `07/01/2021 16:45`,
          title: 'Macaroni and cheese spiralss',
        },
        {
          action: '12 hr',
          headline: '$25.000',
          subtitle: `07/01/2021 16:45`,
          title: 'CocaCola sixpack',
        },
        {
          action: '19 hr',
          headline: '$30.000',
          subtitle: `07/01/2021 16:45`,
          title: 'Oil',
        },
        {
            action: '18hr',
            headline: 'Recipe to try',
            subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
            title: 'Britta Holt22',
          },
          {
            action: '18hr',
            headline: 'Recipe to try',
            subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
            title: 'Britta Holt222',
          },
      ]
    }
   get_listado(){
    return this.listado;
   }
}
export default ventas;

/*class client_info {
    constructor() {

    }
}
export default client_info;*/