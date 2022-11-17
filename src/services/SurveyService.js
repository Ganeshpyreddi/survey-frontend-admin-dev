import http from "../http-common";
class SurveyService {
  getSurveys() {
    return http.get("/surveylist", {
      headers: {
        'x-access-token': sessionStorage.getItem("token")
      }
    });
  }
  createSurvey(surveyData) {
    return http.post("/survey", surveyData, {
      headers: {
        'x-access-token': sessionStorage.getItem("token")
      }
    });
  }
  deleteSurvey(id) {
    return http.delete(`/survey/${id}`, {
      headers: {
        'x-access-token': sessionStorage.getItem("token")
      }
    });
  }
  getSurvey(id) {
    return http.get(`/survey/${id}`, {
      headers: {
        'x-access-token': sessionStorage.getItem("token")
      }
    });
  }
  handlePublish(surveyData) {
    return http.put(`/survey/${surveyData.id}?makeLive=${surveyData.isPublished}`, {}, {
      headers: {
        'x-access-token': sessionStorage.getItem("token")
      }
    });
  }
  shareSurveyLink(linkData) {
    return http.post(`/send/email`, linkData, {
      headers: {
        'x-access-token': sessionStorage.getItem("token")
      }
    });
  }
  getSurveyReportDetails(surveyId) {
    return http.get(`/report/${surveyId}`, {
      headers: {
        'x-access-token': sessionStorage.getItem("token")
      }
    });
  }
}
export default new SurveyService();