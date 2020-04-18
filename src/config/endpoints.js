const PRODUCTION_MODE = process.env.NODE_ENV === "production";

console.log("process.env", process.env);
console.log("process.env node", process.env.NODE_ENV);
console.log("PROD MODE", PRODUCTION_MODE);

let SERVER = "http://localhost:8080";
if (PRODUCTION_MODE) {
  SERVER = "http://158.195.108.7/back";
  console.log("prod");
} else {
  console.log("not prod");
}

export const SERVER_URL = SERVER;

export const GET = `${SERVER}/get`;

export const USER_LOGGED = `${SERVER}/user-logged`;

export const USER_SIGN_UP = `${SERVER}/signup`;
export const USER_LOGIN = `${SERVER}/login`;
export const LOGOUT_USER = `${SERVER}/logout`;

export const USER_SETTINGS_GET = `${SERVER}/userSettings/get`;
export const USER_SETTINGS_SET = `${SERVER}/userSettings/set`;

export const SET_LANGUAGE_TO = `${SERVER}/setLanguageTo`;
export const GET_LANGUAGE_TO = `${SERVER}/getLanguageTo`;

export const GET_ALL_USERS = `${SERVER}/get-all`;
export const GET_USER = `${SERVER}/get`;
export const ADD_USER = `${SERVER}/add`;
export const DELETE_USER = `${SERVER}/delete`;

export const FREQUENCIES_TRANSLATE = `${SERVER}/frequencies/translate`;
export const TRANSLATE_ONE = `${SERVER}/translate/one`;

export const PAIR_EDIT = `${SERVER}/pair/edit`;
export const REMOVE_DUPLICATES = `${SERVER}/pair/flagDuos`;
export const PAIR_DELETE = `${SERVER}/pair/delete`;

export const LOG_USER_ACTION = `${SERVER}/log/userAction`;
export const USER_PROGRESS_GET_24 = `${SERVER}/log/userProgress24/get`;

export const USER_WORD_FLAG = `${SERVER}/userSettings/word/flag`;
export const USER_GET_ALL_FLAGGED = `${SERVER}/userSettings/flag/getAll`;

export const DICT_GET_TOTALWORDS = `${SERVER}/dict/totalWords/get`;

export const ADD_NEW_TASK = `${SERVER}/task/add`;
export const TASK_GET_ALL = `${SERVER}/task/get-all`;
export const TASK_UPDATE = `${SERVER}/task/update`;
export const TASK_COLOR_SET = `${SERVER}/task/color/set`;
export const TASK_REMOVE = `${SERVER}/task/remove`;
export const TASK_SORT = `${SERVER}/task/sort`;
