import { API_URL, USER_URL } from "./constants";
export const getDataFromApi = () => {
  setTimeout(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((response) => {
        this.list = response;
      });

    fetch(USER_URL)
      .then((response) => response.json())
      .then((users) => {
        this.loading = false;
        this.userList = users;
        this.bind();
      });
  }, 850);
};

export const deleteTaskFromApi = (id) => {
  return fetch(`${API_URL}/${id}`, {
    method: "delete",
  });
};
