const PRODUCTION_MODE = process.env.NODE_ENV === "production";

let SERVER = "http://localhost:8080";
if (PRODUCTION_MODE) {
  SERVER = "back";
  console.log("prod", SERVER);
} else {
  console.log("not prod", SERVER);
}

export const SERVER_URL = SERVER;

export const USER_LOGGED = `${SERVER}/user-logged`;

export const USER_SIGN_UP = `${SERVER}/signup`;
export const USER_LOGIN = `${SERVER}/login`;
export const LOGOUT_USER = `${SERVER}/logout`;

export const USER_SETTINGS_GET = `${SERVER}/userSettings/get`;
export const USER_SETTINGS_SET = `${SERVER}/userSettings/set`;

export const ADD_NEW_TASK = `${SERVER}/task/add`;
export const TASK_GET_ALL = `${SERVER}/task/get-all`;
export const TASK_UPDATE = `${SERVER}/task/update`;
export const TASK_COLOR_SET = `${SERVER}/task/color/set`;
export const TASK_REMOVE = `${SERVER}/task/remove`;
export const TASK_SORT = `${SERVER}/task/sort`;

export const UPLOAD_IMG = `${SERVER}/api/user-profile`;
