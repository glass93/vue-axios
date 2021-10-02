/* eslint-disable prettier/prettier */ /* eslint-disable prettier/prettier */
<template>
  <v-container fill-height style="max-width: 450px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-alert :value="isLoginError" type="error">
          아이디와 비밀번호를 확인해주세요.
        </v-alert>
        <v-alert :value="isLogin" type="success">
          로그인이 성공했습니다.
        </v-alert>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>로그인</v-toolbar-title>
          </v-toolbar>
          <div class="pa-3">
            <v-text-field v-model="email" label="이메일을 입력하세요">
            </v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              label="패스워드를 입력하세요"
            >
            </v-text-field>
            <v-btn
              large
              block
              depressed
              color="primary"
              @click="
                login({
                  email: email,
                  password: password,
                })
              "
            >
              로그인
            </v-btn>
            <v-btn @click="test">테스트</v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  computed: {
    ...mapState(["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(["login"]),
    test() {
      axios
        .get("https://reqres.in/api/users?page=2")
        .then(res => {
          // handle success
          console.log(res);
        })
        .catch(err => {
          // handle error
          console.log(err);
        })
        .then(() => {
          // always executed
          console.log("test")
        });
    },
  },
};
</script>
