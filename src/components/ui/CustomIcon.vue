<template>
  <div class="CustomIcon">
    <img :src="imageSourse" />
  </div>
</template>

<script>
//import close from "../assets/close.png"
//src="../assets/close.svg"
export default {
  name: "custom-icon",
  data: () => ({
    imageSourse: "../assets/close.svg",
  }),
  props: ["imagesourse"],
  methods: {
    setImg: function(url) {
      this.imageSourse = url;
    },
    
  },
  mounted() {
    console.log("mounted");
    this.imageSourse = this.imagesourse;
    //"../assets/close.svg";
  },
};
</script>

<style>
.CustomIcon {
  width: 30px;
  padding: 5px;
}
.CustomIcon img {
  width: 20px;
}
</style>
