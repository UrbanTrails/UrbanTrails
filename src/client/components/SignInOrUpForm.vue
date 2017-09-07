<template>
  <div>
    <v-card flat>
      <v-form ref="form" >
        <h6 class="error--text" v-if="!isSignIn && this.$store.state.authfail.signUp">Email already in use</h6>
        <h6 class="error--text" v-if="isSignIn && this.$store.state.authfail.signIn">Incorrect email or password</h6>
        <v-text-field
          label="Enter your E-mail"
          v-model="email"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          v-if="isSignIn"
          label="Enter your password"
          hint="At least 8 characters"
          min="8"
          :append-icon="nonVisible ? 'visibility_off' : 'visibility'"
          :append-icon-cb="() => (nonVisible = !nonVisible)"
          :type="nonVisible ? 'password' : 'text'"
          v-model="password"
          :rules="passwordRules"
          required
          counter
        ></v-text-field>
        <v-text-field
          v-else
          label="Set your password"
          hint="At least 8 characters"
          min="8"
          :append-icon="nonVisible ? 'visibility_off' : 'visibility'"
          :append-icon-cb="() => (nonVisible = !nonVisible)"
          :type="nonVisible ? 'password' : 'text'"
          v-model="password"
          :rules="passwordRules"
          required
          counter
        ></v-text-field>
        <v-btn @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: ['isSignIn'],
    data() {
      return {
        nonVisible: true,
        error: true,
        password: '',
        email: '',
        emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => (!!v && v.length >= 8) || 'Password must be at least 8 characters'
        ]
      }
    },
    methods: {
      signInOrUp() {
        return this.isSignIn ? 'signin' : 'signup'
      },
      toggleSignInOrUp(bool) {
        if(this.$data.isSignIn === !bool){
          this.clear()
          this.$data.isSignIn = bool
        }
      },
      submit() {
        if(this.$refs.form.validate()) {
          let dispatchObj = {
            signInOrUp: this.signInOrUp(),
            email: this.$data.email,
            password: this.$data.password
          }
          this.$store.dispatch('USER_SIGN_IN_OR_UP', dispatchObj)
        } else {
          console.log('requirements not met');
        }
      },
      clear() {
        this.$refs.form.reset()
        this.$store.commit('TOGGLE_AUTHFAIL', { signIn: false, signUp: false })
      },

    }
  }
</script>
