import axios from "axios";

export const login = async (loginFormValues) => {
  const { username, password } = loginFormValues;
  const request = await axios({
    method: 'post',
    url: 'http://localhost:8080/api/user/login',
    data: {
      username,
      password,
    },
  }).catch(err => err.response);

  return request;
}

export const signup = async (loginFormValues) => {
  const { username, password, email } = loginFormValues;
  const request = await axios({
    method: 'post',
    url: 'http://localhost:8080/api/user/new',
    data: {
      username,
      password,
      email
    },
  }).catch(err => err.response);

  return request;
}

export const getModules = async (token) => {

  const request = await axios({
    method: 'get',
    headers: {
      Authorization: token,
    },
    url: 'http://localhost:8080/api/module/',
  }).catch(err => err.response);

  return request;
}

export const addNewModule = async (name, token) => {

  const request = await axios({
    method: 'post',
    headers: {
      Authorization: token,
    },
    data: {
      name: name
    },
    url: 'http://localhost:8080/api/module/new',
  }).catch(err => console.log(err.response));

  return request;
}

export const addLesson = async (details, token) => {

  const request = await axios({
    method: 'post',
    headers: {
      Authorization: token,
    },
    data: {
      ...details
    },
    url: 'http://localhost:8080/api/lesson/new',
  }).catch(err => console.log(err.response));

  return request;
}

export const deleteLesson = async (lessonId, token) => {
  const request = await axios({
    method: 'delete',
    headers: {
      Authorization: token,
    },
    url: `http://localhost:8080/api/lesson/delete/${lessonId}`,
  }).catch(err => console.log(err.response));

  console.log(request)

  return request;
}

export const getLessonsById = async (params, token) => {
  const request = await axios({
    method: 'get',
    headers: {
      Authorization: token,
    },
    url: `http://localhost:8080/api/lesson/${params}`,
  }).catch(err => console.log(err.response));

  console.log(request)

  return request;
}

export const updateModule = async (name, moduleId, token) => {

  const request = await axios({
    method: 'put',
    headers: {
      Authorization: token,
    },
    data: {
      name,
      moduleId
    },
    url: 'http://localhost:8080/api/module/update',
  }).catch(err => console.log(err.response));

  return request;
}

export const getAllLessons = async (token) => {

  const request = await axios({
    method: 'get',
    headers: {
      Authorization: token,
    },
    url: 'http://localhost:8080/api/lesson/',
  }).catch(err => console.log(err.response));

  return request;
}

export const createAdmin = async (loginFormValues, token) => {
  const { username, password, email } = loginFormValues;

  const request = await axios({
    method: 'post',
    headers: {
      Authorization: token,
    },
    data: {
      username,
      password,
      email
    },
    url: 'http://localhost:8080/api/user/new/admin',
  }).catch(err => console.log(err.response));

  return request;
}

export const deleteModule = async (moduleId, token) => {
  const request = await axios({
    method: 'delete',
    headers: {
      Authorization: token,
    },
    url: `http://localhost:8080/api/module/delete/${moduleId}`,
  }).catch(err => console.log(err.response));

  console.log(request)

  return request;
}
