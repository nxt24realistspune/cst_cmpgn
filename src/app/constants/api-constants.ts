// API Base URLs
export const API_BASE_URL = 'https://merkledpai01-eus-enhancements-app.azurewebsites.net/';
export const AGENT_API_URL = 'agent?html_input=%3C%21DOCTYPE%20html%3E%20%3Chtml%20lang%3D%22en%22%3E%20%3Chead%3E%20%20%20%3Cmeta%20charset%3D%22UTF-8%22%3E%20%20%20%3Ctitle%3ETest%20Page%3C%2Ftitle%3E%20%20%20%3Cstyle%3E%20%20%20%20%20body%20%7B%20font-family%3A%20Arial%3B%20background%3A%20%23f2f2f2%3B%20padding%3A%2020px%3B%20%7D%20%20%20%20%20h1%20%7B%20color%3A%20%23333%3B%20%7D%20%20%20%20%20.card%20%7B%20background%3A%20%23fff%3B%20padding%3A%2015px%3B%20border-radius%3A%208px%3B%20box-shadow%3A%200%200%205px%20%23ccc%3B%20%7D%20%20%20%20%20button%20%7B%20margin%3A%205px%3B%20padding%3A%208px%2012px%3B%20border%3A%20none%3B%20background%3A%20%23007bff%3B%20color%3A%20white%3B%20border-radius%3A%205px%3B%20%7D%20%20%20%3C%2Fstyle%3E%20%3C%2Fhead%3E%20%3Cbody%3E%20%20%20%3Ch1%3ERandom%20HTML%20Test%3C%2Fh1%3E%20%20%20%3Cdiv%20class%3D%22card%22%3E%20%20%20%20%20%3Cp%20id%3D%22text%22%3EClick%20to%20change%20text%21%3C%2Fp%3E%20%20%20%20%20%3Cbutton%20onclick%3D%22randomText%28%29%22%3EChange%3C%2Fbutton%3E%20%20%20%3C%2Fdiv%3E%20%20%20%3Cscript%3E%20%20%20%20%20function%20randomText%28%29%7B%20%20%20%20%20%20%20%20const%20words%20%3D%20%5B%27Hello%27%2C%27World%27%2C%27Testing%27%2C%27Random%27%2C%27HTML%27%2C%27Page%27%5D%3B%20%20%20%20%20%20%20%20document.getElementById%28%27text%27%29.innerText%20%3D%20words%5BMath.floor%28Math.random%28%29%2Awords.length%29%5D%3B%20%20%20%20%20%7D%20%20%20%3C%2Fscript%3E%20%3C%2Fbody%3E%20%3C%2Fhtml%3E';

// // API Endpoints
// export const API_ENDPOINTS = {
//   // Authentication
//   AUTH: {
//     LOGIN: '/auth/login',
//     LOGOUT: '/auth/logout',
//     REFRESH: '/auth/refresh',
//     REGISTER: '/auth/register'
//   },

//   // User management
//   USERS: {
//     BASE: '/users',
//     PROFILE: '/users/profile',
//     UPDATE: '/users/update'
//   },

//   // Campaign related
//   CAMPAIGNS: {
//     BASE: '/campaigns',
//     CREATE: '/campaigns/create',
//     UPDATE: '/campaigns/update',
//     DELETE: '/campaigns/delete'
//   },

//   // Agent related
//   AGENTS: {
//     BASE: '/agents',
//     STATUS: '/agents/status',
//     ASSIGN: '/agents/assign'
//   }
// } as const;

// // HTTP Status Codes
// export const HTTP_STATUS = {
//   OK: 200,
//   CREATED: 201,
//   BAD_REQUEST: 400,
//   UNAUTHORIZED: 401,
//   FORBIDDEN: 403,
//   NOT_FOUND: 404,
//   INTERNAL_SERVER_ERROR: 500
// } as const;

// // Request timeout in milliseconds
// export const REQUEST_TIMEOUT = 30000;

// // API Version
// export const API_VERSION = 'v1';
