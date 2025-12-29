const { test, expect } = require('@playwright/test');

let userId;

test('Create User API', async ({ request }) => {
  const response = await request.post('https://reqres.in/api/users', {
    data: {
      name: 'Mohit',
      job: 'QA Automation'
    }
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  userId = body.id;
  expect(body.name).toBe('Mohit');
});

test('Get Created User', async ({ request }) => {
  const response = await request.get(`https://reqres.in/api/users/${userId}`);
  expect(response.status()).toBe(200);
});

test('Update User', async ({ request }) => {
  const response = await request.put(`https://reqres.in/api/users/${userId}`, {
    data: {
      name: 'Mohit Updated'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.name).toBe('Mohit Updated');
});
