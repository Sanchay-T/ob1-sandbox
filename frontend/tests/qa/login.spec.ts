import { test, expect, Page, Locator } from '@playwright/test'

const pickField = (page: Page, selectors: string[]): Locator => {
  return page.locator(selectors.join(', ')).first()
}

test('login experience renders and is interactive', async ({ page }) => {
  await page.goto('/')

  const heading = page.locator('h1, h2').filter({ hasText: /login|sign in/i }).first()
  await expect(heading).toBeVisible()

  const emailInput = pickField(page, [
    'input[type="email"]',
    'input[name*="email" i]',
    'input[placeholder*="email" i]',
  ])
  await expect(emailInput).toBeEditable()
  await emailInput.fill('demo@example.com')

  const passwordInput = pickField(page, [
    'input[type="password"]',
    'input[name*="password" i]',
    'input[placeholder*="password" i]',
  ])
  await expect(passwordInput).toBeEditable()
  await passwordInput.fill('secure-password')

  const rememberToggle = page.locator('input[type="checkbox"], button:has-text("remember")').first()
  if (await rememberToggle.count()) {
    try {
      await rememberToggle.check({ force: true })
    } catch {
      await rememberToggle.click({ force: true })
    }
  }

  const submitButton = page.getByRole('button', { name: /sign in|log in|continue|submit/i }).first()
  await expect(submitButton).toBeEnabled()
  await submitButton.click()

  await expect(page.locator('body')).toBeVisible()
})
