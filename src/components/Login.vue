<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 col-xl-9 mx-auto">
          <div class="card card-signin flex-row my-5">
            <div class="card-img-left d-none d-md-flex"></div>
            <div class="card-body">
              <form class="form-signin">
                {{ error }}
                <div v-if="isRegister">
                  <h5 class="card-title text-center">Register</h5>
                  <div class="form-label-group">
                    <input
                      type="text"
                      id="inputUserame"
                      class="form-control"
                      v-model="regUsername"
                      placeholder="Username"
                      required
                      autofocus
                    />
                    <label for="inputUserame">Username</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      class="form-control"
                      v-model="regEmail"
                      placeholder="Email address"
                      required
                    />
                    <label for="inputEmail">Email address</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      class="form-control"
                      v-model="regPassword"
                      placeholder="Password"
                      required
                    />
                    <label for="inputPassword">Password</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="password"
                      id="inputConfirmPassword"
                      class="form-control"
                      placeholder="Password"
                      required
                    />
                    <label for="inputConfirmPassword">Confirm password</label>
                  </div>
                  <hr />
                  <button
                    class="btn btn-lg btn-primary btn-block text-uppercase"
                    @click="register"
                  >
                    Register
                  </button>
                  <button class="switch btn mt-3" @click="switchToSignin">
                    Switch to Sign In
                  </button>
                  <hr class="my-4" />
                  <button
                    class="btn btn-lg btn-google btn-block text-uppercase"
                  >
                    <i class="fab fa-google mr-2"></i> Sign up with Google
                  </button>
                  <button
                    class="btn btn-lg btn-facebook btn-block text-uppercase"
                  >
                    <i class="fab fa-facebook-f mr-2"></i> Sign up with Facebook
                  </button>
                </div>
                <div v-if="isSignIn">
                  <h5 class="card-title text-center">Sign In</h5>
                  <div class="form-label-group">
                    <input
                      type="text"
                      id="inputUserame"
                      class="form-control"
                      v-model="username"
                      placeholder="Username"
                      required
                      autofocus
                    />
                    <label for="inputUserame">Username</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      class="form-control"
                      v-model="password"
                      placeholder="Password"
                      required
                    />
                    <label for="inputPassword">Password</label>
                  </div>
                  <hr />
                  <button
                    class="btn btn-lg btn-primary btn-block text-uppercase"
                    @click="signIn"
                  >
                    Sign In
                  </button>
                  <button class="switch btn mt-3" @click="switchToregister">
                    Switch to Register
                  </button>
                  <hr class="my-4" />
                  <button
                    class="btn btn-lg btn-google btn-block text-uppercase"
                  >
                    <i class="fab fa-google mr-2"></i> Sign In with Google
                  </button>
                  <button
                    class="btn btn-lg btn-facebook btn-block text-uppercase"
                  >
                    <i class="fab fa-facebook-f mr-2"></i> Sign In with Facebook
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      isRegister: true,
      isSignIn: false,
      regUsername: "",
      regEmail: "",
      regPassword: "",
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    switchToregister() {
      this.isSignIn = false;
      this.isRegister = true;
    },
    switchToSignin() {
      this.isRegister = false;
      this.isSignIn = true;
    },
    register(e) {
      e.preventDefault();
      let newUser = {
        username: this.regUsername,
        email: this.regEmail,
        password: this.regPassword,
      };
      axios
        .post("http://localhost:5000/signup", newUser)
        .then(() => {
          console.log(newUser);
          this.isRegister = false;
          this.isSignIn = true;
        })
        .catch((err) => console.log("Error: ", err));
    },
    signIn(e) {
      e.preventDefault();
      let user = {
        username: this.username,
        password: this.password,
      };
      axios.post("http://localhost:5000/login", user).then(
        (res) => {
          //if successfull
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            this.$router.push("/home");
          }
        },
        (err) => {
          console.log(err.response);
          this.error = err.response.data.error;
        }
      );
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

body {
  background: #007bff;
  background: linear-gradient(to right, #0062e6, #33aeff);
}

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-img-left {
  width: 45%;
  /* Link to your background image using in the property below! */
  background: scroll center
    url("https://source.unsplash.com/WEQbe2jBg40/414x512");
  background-size: cover;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

.btn-google {
  color: white;
  background-color: #ea4335;
}

.btn-facebook {
  color: white;
  background-color: #3b5998;
}
</style>
