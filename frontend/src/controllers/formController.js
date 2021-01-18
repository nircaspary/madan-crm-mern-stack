import axios from "axios";
import { useState } from "react";
import * as formView from "../views/formView.js";

export const postData = async (url, data) => {
  try {
    const res = await axios.post(url, data);
    return res;
  } catch (err) {
    return err;
  }
};
export const getUserData = async (url) => {
  try {
    const res = await axios.get(url);
    return res;
  } catch (err) {
    return err;
  }
};

// export const fillUserData = async (id) => {
//   const { data } = await getUserData(
//     `http://127.0.0.1:8000/api/v1/users/${id}`
//   );
//   // Set Form Values If User Exists
//   if (data.data.user) {
//     for (let i = 2; i < Object.values(data.data.user).length; i++) {
//       let input = document.querySelector(
//         `input[name="${Object.keys(data.data.user)[i]}"]`
//       );
//       if (input != null) input.value = Object.values(data.data.user)[i];
//     }
//   }
//   // Make Form Visible
//   formView.formVisible();
// };
