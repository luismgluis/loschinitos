<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4 mt-4" cols="12">
        <h1 class="display-2 font-weight-bold mb-3">
          {{titulo}}
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    data: () => ({
     titulo:"hola"
    }),
  }
</script>
