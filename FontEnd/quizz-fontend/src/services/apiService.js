import axios from "../utils/axiosCustomize";

const postCreateNewUser = async (email, password, username, role, img) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", img);
  return await axios.post("api/v1/participant", data);
};

const getParticipants = async () => {
  return await axios.get("api/v1/participant/all");
};

const putUpdateUser = async (id, username, role, img) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", img);
  return await axios.put("api/v1/participant", data);
};

const deleteParticipant = async (id) => {
  return await axios.delete("api/v1/participant", { data: { id } });
};

const getParticipantsWithPaginate = async (page, limit) => {
  return await axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

export {
  postCreateNewUser,
  getParticipants,
  putUpdateUser,
  deleteParticipant,
  getParticipantsWithPaginate,
};
