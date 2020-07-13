<template>
  <div>
    HOME VUE
    <p>{{ username }}</p>
    <p>{{ email }}</p>
    <button class="btn btn-primary" @click="logout">LOGOUT</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      username: "",
      email: "",
    };
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
  },
  mounted() {
    axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
        this.username = res.data.user.username;
        this.email = res.data.user.email;
      });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>
