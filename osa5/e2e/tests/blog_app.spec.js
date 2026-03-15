const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText(`Welcome Matti Luukkainen!`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrongpassword')
      await expect(page.getByText(`Welcome Matti Luukkainen!`)).not.toBeVisible()

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Check your username and password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Check your username and password')).toBeVisible()
    })
  })

 test('a new blog can be created', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await createBlog(page, 'Test Blog', 'Test Author', 'http://example.com')

    const successDiv = page.locator('.success')
    await expect(successDiv).toBeVisible()
    await expect(successDiv).toContainText('a new blog Test Blog by Test Author added')
    await expect(successDiv).toHaveCSS('border-style', 'solid')
    await expect(successDiv).toHaveCSS('color', 'rgb(0, 128, 0)')

    await expect(page.getByText('Test Blog Test Author')).toBeVisible()
    await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
  })
})