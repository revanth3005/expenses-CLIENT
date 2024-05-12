import axios from "axios";

export const saveExpensesThunk = async (data) => {
  const expensesPromise = new Promise(async (resolve, reject) => {
    try {
      console.log("api", data);
      const response = await axios.post(
        "https://expenses-server-a6yx.onrender.com/api/v1/add_item",
        data
      );
      if (response.status === 200) {
        console.log(response.data);
        resolve(response.data);
      }
    } catch (error) {
      reject(false);
    }
  });
  return expensesPromise;
};
export const fetchUserDataThunk = async (data) => {
  const expensesPromise = new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `https://expenses-server-a6yx.onrender.com/api/v1/get_items/${data}`
      );
      if (response.status === 200) {
        resolve(response.data.data);
      }
    } catch (error) {
      reject(false);
    }
  });
  return expensesPromise;
};
