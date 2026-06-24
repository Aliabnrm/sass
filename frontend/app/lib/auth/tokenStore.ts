// let accessToken: string | null = null;

// export const tokenStore = {
//   get() {
//     return accessToken;
//   },

//   set(token: string) {
//     accessToken = token;
//   },

//   clear() {
//     accessToken = null;
//   },
// };

let accessToken: string | null = null;

export const tokenStore = {
  get() {
    console.log("GET TOKEN:", accessToken);
    return accessToken;
  },

  set(token: string) {
    accessToken = token;
    console.log("TOKEN SAVED:", token);
  },

  clear() {
    accessToken = null;
    console.log("TOKEN CLEARED");
  },
};