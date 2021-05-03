const employeeApi = {
  base: 'https://employees-api.vercel.app/api',
  employees: '/employees',
};
const constants = {
  project: {
    state: ['planned', 'active', 'done', 'failed'],
    default: 'planned',
  },
  redisEmployeeKey: 'redisEmployeeKey',
  employeeApi,
  employee: {
    method: 'GET',
    url: `${employeeApi.base}${employeeApi.employees}`,
    headers: { accept: 'application/json' },
  },
  owner: 'manager',
};

export default constants;
