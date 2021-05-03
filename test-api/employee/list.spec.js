import supertest from 'supertest';
import constants from 'src/config/constants';
import employeeSchema from './schema';

const superRequest = supertest(constants.employeeApi.base);

const schema = {
  type: 'array',
  minItems: 1,
  items: employeeSchema.employee,
};

describe('Employees List API', () => {
  it(`should get employee list from ${constants.employeeApi.base}`, async () => {
    const response = await superRequest
      .get(constants.employeeApi.employees)
      .expect(200);

    const { body: { data }, error } = response;

    expect(data).toBeTruthy();
    expect(error).toBeFalsy();

    expect(data).toMatchSchema(schema);
  });
});
