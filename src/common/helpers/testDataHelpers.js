import { faker } from '@faker-js/faker';

export function generateUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode('#####'),
    phone: faker.string.numeric(10),
    ssn: faker.string.numeric(9),
    username: `user${Date.now()}${faker.string.numeric(3)}`,
    password: faker.string.alphanumeric(12),
  };
}

export function generatePayee() {
  return {
    name: faker.company.name(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode('#####'),
    phone: faker.string.numeric(10),
    accountNumber: faker.string.numeric(5),
  };
}
