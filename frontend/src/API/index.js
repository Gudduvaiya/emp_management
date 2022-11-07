import axios from "axios";

export const makeGetAPICall = (request) => {
  axios
    .get("http://localhost:4500/api/v1/" + request.urlPath, {
      headers: {
        Authorization: `token ${localStorage.getItem("Auth Token")}`,
      },
    })
    .then(({ data }) => {
      request.onSuccess(data);
    })
    .catch((err) => {
      request.onFail(err);
    });
};

export const makePostAPICall = (request) => {
  axios
    .post("http://localhost:4500/api/v1/" + request.urlPath, request.data, {
      headers: {
        Authorization: `token ${localStorage.getItem("Auth Token")}`,
      },
    })
    .then(({ data }) => {
      request.onSuccess(data);
    })
    .catch((err) => {
      request.onFail(err);
    });
};
