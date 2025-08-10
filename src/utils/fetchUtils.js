const HOST_NAME = import.meta.env.VITE_API_URL;

export const fetchGet = async (route, options) => {
  const { token, signal } = options;

  return await fetch(`${HOST_NAME}/${route}`, {
    method: "GET",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    mode: "cors",
    signal: signal || undefined,
  });
};

export const fetchPost = async (route, body, token) => {
  return await fetch(`${HOST_NAME}/${route}`, {
    method: "POST",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(body),
  });
};

export const fetchPostFormData = async (route, formData, token) => {
  return await fetch(`${HOST_NAME}/${route}`, {
    method: "POST",
    headers: {
      Authorization: token || "",
    },
    body: formData,
    mode: "cors",
  });
};

export const fetchPut = async (route, body, token) => {
  return await fetch(`${HOST_NAME}/${route}`, {
    method: "PUT",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(body),
  });
};

export const fetchDelete = async (route, body, token) => {
  return await fetch(`${HOST_NAME}/${route}`, {
    method: "DELETE",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(body),
  });
};
