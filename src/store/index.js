import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    allUsers: [
      { id: 1, name: "sj", email: "sj@abc.com", password: "12345" },
      { id: 1, name: "dj", email: "dj@abc.com", password: "54321" },
    ],
    isLogin: false,
    isLoginError: false,
  },
  mutations: {
    // 로그인이 성공했을 때,
    loginSuccess(state, payload) {
      state.isLogin = true;
      state.isLoginError = false;
      state.userInfo = payload;
    },
    // 로그인이 실패했을 때,
    loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
    },
    logout(state) {
      state.isLogin = false;
      state.isLoginError = false;
      state.userInfo = null;
    },
  },
  actions: {
    // 로그인 시도
    login({ commit }, loginObj) {
      axios
        .post("https://reqres.in/api/login", loginObj)
        .then((res) => {
          // 성공 시 toekn: ~~~ (실제로는 user_id 값을 받아옴)
          // 토큰을 헤더에 포함시켜서 유저 정보 요청
          let token = res.data.token;
          let config = {
            headers: {
              "access-token": token,
            },
          };
          axios
            .get("https://reqres.in/api/users/2", config)
            .then((response) => {
              let userInfo = {
                id: response.data.data.id,
                first_name: response.data.data.first_name,
                last_name: response.data.data.last_name,
                avatar: response.data.data.avatar,
              };
              commit("loginSuccess", userInfo);
            })
            .catch(() => {
              alert("이메일과 비밀번호를 확인하세요.");
            });
        })
        .catch((err) => {
          console.log(err);
        });
      // let selectedUser = null;
      // state.allUsers.forEach((user) => {
      //   if (user.email === loginObj.email) {
      //     selectedUser = user;
      //   }
      // });
      // if (selectedUser === null || selectedUser.password !== loginObj.password)
      //   commit("loginError");
      // else {
      //   commit("loginSuccess", selectedUser);
      //   router.push({ name: "mypage" });
      // }
    },
    logout({ commit }) {
      commit("logout");
      router.push({ name: "home" });
    },
  },
  modules: {},
});
