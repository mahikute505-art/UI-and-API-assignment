const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('DemoQA Book Store UI Automation', async ({ page }) => {
  // Test data
  const username = 'username';
  const password = '@Password0102';
  const bookName = 'Learning JavaScript Design Patterns';

  // Navigate to DemoQA
  
  await page.goto('https://demoqa.com/login');

  // Login
  await page.fill('#userName', username);
  await page.fill('#password', password);
  await page.click('#login');

  // Validate login success
  await expect(page.locator('#userName-value')).toHaveText(username);
  await expect(page.locator('button#submit')).toHaveText('Log out');

  // Go to Book Store
  await page.click('text=Go To Book Store');
  await page.click('text=Book Store');
  // Search book
  await page.fill('#searchBox', bookName);

  // Validate search result
  const bookRow = page.locator('.rt-tbody');
  await expect(bookRow).toContainText(bookName);

  // Capture book details
  const title = await page.locator('a[href*="books"]').textContent();
  const author = await page.locator('.rt-td').nth(2).textContent();
  const publisher = await page.locator('.rt-td').nth(3).textContent();

  // Write details to file
  const data = `Title: ${title}\nAuthor: ${author}\nPublisher: ${publisher}`;
  fs.writeFileSync('bookDetails.txt', data);

  // Logout
  await page.click('#submit');
});
