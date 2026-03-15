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

test('a blog can be liked', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await createBlog(page, 'Test Blog', 'Test Author', 'http://example.com')
    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.getByText('likes 0')).toBeVisible()
    await page.getByRole('button', { name: 'like' }).click()
    await expect(page.getByText('likes 1')).toBeVisible()
  })

test('a blog can be deleted by the creator', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await createBlog(page, 'Test Blog', 'Test Author', 'http://example.com')
    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

    page.on('dialog', dialog => dialog.accept())
    await page.getByRole('button', { name: 'remove' }).click()

    await expect(page.getByText('Test Blog Test Author')).not.toBeVisible()
    const successDiv = page.locator('.success')
    await expect(successDiv).toBeVisible()
    await expect(successDiv).toContainText('blog removed')
    await expect(successDiv).toHaveCSS('border-style', 'solid')
    await expect(successDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
  })

test('only the creator of a blog can see the delete button', async ({ page, request }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await createBlog(page, 'Test Blog', 'Test Author', 'http://example.com')
    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
    await page.getByRole('button', { name: 'logout' }).click()
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'test user',
        username: 'test username',
        password: 'testpassword'
      }
    })
    await loginWith(page, 'test username', 'testpassword')
    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
  })

  test('blogs are sorted by likes in descending order', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')

    await createBlog(page, 'number1', 'author1', 'http://example1.com')
    const row1 = page.locator('[class="blog"]').filter({ hasText: 'number1' })
    await row1.getByRole('button', { name: 'view' }).click()

    await createBlog(page, 'number2', 'author2', 'http://example2.com')
    const row2 = page.locator('[class="blog"]').filter({ hasText: 'number2' })
    await row2.getByRole('button', { name: 'view' }).click()

    await createBlog(page, 'number3', 'author3', 'http://example3.com')
    const row3 = page.locator('[class="blog"]').filter({ hasText: 'number3' })
    await row3.getByRole('button', { name: 'view' }).click()

    await row2.getByRole('button', { name: 'like' }).click()
    await expect(row2).toContainText('likes 1')
    await row2.getByRole('button', { name: 'like' }).click()
    await expect(row2).toContainText('likes 2')

    await row1.getByRole('button', { name: 'like' }).click()
    await expect(row1).toContainText('likes 1')

    const blogRows = page.locator('[class="blog"]')
    await expect(blogRows.nth(0)).toContainText('number2')
    await expect(blogRows.nth(1)).toContainText('number1')
    await expect(blogRows.nth(2)).toContainText('number3')

    await row1.getByRole('button', { name: 'like' }).click()
    await expect(row1).toContainText('likes 2')
    await row1.getByRole('button', { name: 'like' }).click()
    await expect(row1).toContainText('likes 3')

    await expect(blogRows.nth(0)).toContainText('number1')
    await expect(blogRows.nth(1)).toContainText('number2')
    await expect(blogRows.nth(2)).toContainText('number3')
  })

})