import supertest from 'supertest';
import constants from 'src/config/constants';
import employeeSchema from './schema';

const superRequest = supertest(constants.employeeApi.base);
let employees = [];

describe('Employees Details API', () => {
  beforeAll(async () => {
    const response = await superRequest
      .get(constants.employeeApi.employees)
      .expect(200);
    const { body: { data }, error } = response;

    _expect(data).toBeTruthy();
    _expect(error).toBeFalsy();
    employees = data;
  });

  it('should get employee details success', async () => {
    const response = await superRequest
      .get(`${constants.employeeApi.employees}/${employees[0].id}`)
      .expect(200);

    const { body, error } = response;

    _expect(body).toBeTruthy();
    _expect(error).toBeFalsy();

    expect(body).toMatchSchema(employeeSchema.employee);
  });

  it('should get employee details fail', async () => {
    const response = await superRequest
      .get(`${constants.employeeApi.employees}/test}`)
      .expect(404);

    const { body, error } = response;

    _expect(error).toBeTruthy();

    expect(body).toMatchSchema(employeeSchema.fail404);
  });
});
