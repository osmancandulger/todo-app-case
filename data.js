





export const deleteTaskFromApi = (id) => {
  return fetch(`${API_URL}/${id}`, {
    method: "delete",
  });
};
