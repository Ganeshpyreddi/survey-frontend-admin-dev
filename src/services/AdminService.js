import http from "../http-common";

class AdminService {
  createAdmin(formData) {
    return http.post("/user/signup", formData);
  }
  getAllAdmins() {
    return http.get("/user/alladmins", {
      headers: {
        'x-access-token': sessionStorage.getItem("token")
      }
    });
  }
  getAdminSurveys(adminId) {
    return http.get(`/surveylist?adminId=${adminId}`, {
      headers: {
        'x-access-token': sessionStorage.getItem("token")
      }
    });
  }
  delete(userId) {
    return http.delete(`/user/delete?userId=${userId}`, {
      headers: {
        'x-access-token': sessionStorage.getItem("token")
      }
    });
  }
}
export default new AdminService();