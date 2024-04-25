import axios from "axios";

const commonConfig = {
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    },
    credentials: "include",
};

export default (baseURL) => {
    return axios.create({
        baseURL,
        ...commonConfig,
    });
};