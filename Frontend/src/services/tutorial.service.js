import http from "../http-common";

class FinanDataService {
  getAll() {
    return http.get("/finan");
  }

  get(id) {
    return http.get(`/finan/${id}`);
  }

  create(data) {
    return http.post("/finan", data);
  }

  update(id, data) {
    return http.put(`/finan/${id}`, data);
  }

  delete(id) {
    return http.delete(`/finan/${id}`);
  }

  deleteAll() {
    return http.delete(`/finan`);
  }

  findByTitle(title) {
    return http.get(`/finan?title=${title}`);
  }
}

export default new FinanDataService();