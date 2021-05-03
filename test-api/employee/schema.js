const String = { type: 'string' };
const Number = { type: 'number' };
export default {
  fail404: {
    type: 'object',
    properties: {
      detail: String,
      title: String,
      status: Number,
    },
  },
  employee: {
    type: 'object',
    required: ['id', 'first_name', 'last_name', 'email', 'department', 'role'],
    properties: {
      id: String,
      first_name: { type: ['string', 'null'] },
      last_name: String,
      email: String,
      department: String,
      role: String,
    },
  },
};
