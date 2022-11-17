import axios from "axios";

const baseurl = "http://3.17.36.249/api/";
// if (process.env.NODE_ENV === "development") {
//   baseurl = "http://3.17.36.249/api/";
// } else {
//   baseurl = "/api/";
// }

 
export default axios.create({
  base: process.env.NODE_ENV === 'development' ? '' : '/',
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    crossDomain: true
  }
});
