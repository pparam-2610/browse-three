import axios from "axios";
// const domain = "http://13.232.38.48:8000";
const domain = "http://localhost:8000";

async function getModal() {
  try {
    const url = `${domain}/modal/get`;
    let data = await axios.get(url);
    console.log("the data is: ", data.data);
    return data.data.details;
  } catch (e) {
    console.log(`Error in getModal: ${e}`);
    return "error";
  }
}

async function getSingleModal(name) {
  try {
    const url = `${domain}/modal/get/${name}`;
    let data = await axios.get(url);
    console.log("the data is: ", data.data);
    return data.data.details;
  } catch (e) {
    console.log(`Error in getModal: ${e}`);
    return "error";
  }
}

async function getRecentModal() {
  try {
    const url = `${domain}/modal/getRecent/`;
    let data = await axios.get(url);
    console.log("the data is: ", data.data);
    return data.data.details;
  } catch (e) {
    console.log(`Error in getModal: ${e}`);
    return "error";
  }
}

async function addModal(uploadData, name) {
  try {
    console.log("upload form: ", uploadData);
    const url = `${domain}/modal/add/${name}`;
    let data = await axios.post(url, uploadData);
    console.log("the data is: ", data.data);
    return data.data;
  } catch (e) {
    console.log(`Error in getModal: ${e}`);
    return "error";
  }
}

export default {
  getModal,
  getSingleModal,
  getRecentModal,
  addModal,
};
