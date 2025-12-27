const axios = require("axios");

const Axios = axios.create({
   baseURL: "https://news.nweightloss.shop/api",
});

export default Axios;
