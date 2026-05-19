import { expect, test } from '@playwright/test'

test.describe('Critical path', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('table[role="grid"]')
  })

  test('page loads with default 5x5 grid', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('analytical writing')
    const cells = page.locator('[role="gridcell"]')
    await expect(cells).toHaveCount(25)
    await expect(page.getByText('5 rows x 5 columns')).toBeVisible()
  })

  test('type into a cell and verify content after commit', async ({ page }) => {
    const cell = page.locator('[data-cell-id="R0C0"] [contenteditable]')
    await cell.click()
    await cell.fill('Hello')
    // Tab away to trigger onBlur, committing the value to React state
    await page.keyboard.press('Tab')
    await expect(cell).toHaveText('Hello')
  })

  test('add a row increases row count', async ({ page }) => {
    await page.getByRole('button', { name: /add row/i }).click()
    const cells = page.locator('[role="gridcell"]')
    await expect(cells).toHaveCount(30)
    await expect(page.getByText('6 rows x 5 columns')).toBeVisible()
  })

  test('add a column increases column count', async ({ page }) => {
    await page.getByRole('button', { name: /add column/i }).click()
    const cells = page.locator('[role="gridcell"]')
    await expect(cells).toHaveCount(30)
    await expect(page.getByText('5 rows x 6 columns')).toBeVisible()
  })

  test('remove a row decreases row count', async ({ page }) => {
    await page.getByRole('button', { name: /remove row/i }).click()
    const cells = page.locator('[role="gridcell"]')
    await expect(cells).toHaveCount(20)
    await expect(page.getByText('4 rows x 5 columns')).toBeVisible()
  })

  test('remove a column decreases column count', async ({ page }) => {
    await page.getByRole('button', { name: /remove column/i }).click()
    const cells = page.locator('[role="gridcell"]')
    await expect(cells).toHaveCount(20)
    await expect(page.getByText('5 rows x 4 columns')).toBeVisible()
  })

  test('cannot remove the last row — button becomes disabled', async ({ page }) => {
    // Remove 4 rows to reach 1 row (starts at 5)
    for (let i = 0; i < 4; i++) {
      await page.getByRole('button', { name: /remove row/i }).click()
    }
    const cells = page.locator('[role="gridcell"]')
    await expect(cells).toHaveCount(5)
    await expect(page.getByText('1 rows x 5 columns')).toBeVisible()
    // The button should now be disabled
    await expect(page.getByRole('button', { name: /remove row/i })).toBeDisabled()
  })

  test('merge cells flow', async ({ page }) => {
    // Click first cell
    await page.locator('[data-cell-id="R0C0"] [contenteditable]').click()
    // Shift-click second cell to extend selection
    await page.locator('[data-cell-id="R1C1"]').click({ modifiers: ['Shift'] })
    // Click Merge in the toolbar (use exact name and scope to toolbar)
    await page.getByLabel('Table editing controls').getByRole('button', { name: 'Merge', exact: true }).click()
    // Verify the merged anchor cell still exists
    await expect(page.locator('[data-cell-id="R0C0"]')).toBeAttached()
  })

  test('find and replace panel opens and closes with Ctrl+F / Escape', async ({ page }) => {
    await page.keyboard.press('Control+f')
    await expect(page.getByPlaceholder(/find/i)).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByPlaceholder(/find/i)).not.toBeVisible()
  })

  test('set caption and verify it renders', async ({ page }) => {
    const caption = page.getByText(/add a table title or caption/i)
    await expect(caption).toBeVisible()
    await caption.click()
    // Wait for the input to be editable
    await page.waitForTimeout(200)
    await page.keyboard.type('Revenue by Quarter')
    await page.keyboard.press('Enter')
    await expect(page.getByText('Revenue by Quarter')).toBeVisible()
  })

  test('apply a theme', async ({ page }) => {
    // Theme picker is a DropdownMenu in the toolbar
    await page.getByRole('button', { name: /table theme/i }).click()
    await page.getByRole('button', { name: /minimal/i }).click()
    // Verify no crash — theme was applied
    await expect(page.locator('table[role="grid"]')).toBeVisible()
  })

  test('undo reverts an add-row operation', async ({ page }) => {
    // Add a row (this is undoable)
    await page.getByRole('button', { name: /add row/i }).click()
    await expect(page.locator('[role="gridcell"]')).toHaveCount(30)

    // Click Undo — should restore to 5x5
    await page.getByRole('button', { name: /undo/i }).click()
    await expect(page.locator('[role="gridcell"]')).toHaveCount(25)
  })

  test('clear all clears cell values', async ({ page }) => {
    // Type into a cell
    const cell = page.locator('[data-cell-id="R0C0"] [contenteditable]')
    await cell.click()
    await cell.fill('data')
    // Commit value via Tab
    await page.keyboard.press('Tab')

    // Clear all
    await page.getByRole('button', { name: /clear all/i }).click()
    // Cell should be empty
    await expect(cell).toHaveText('')
  })

  test('freeze first row checkbox toggles', async ({ page }) => {
    // The checkbox is in the Header Options panel (left sidebar)
    const checkbox = page.getByRole('checkbox', { name: /freeze.*row/i })
    await expect(checkbox).toBeVisible()
    await checkbox.check()
    await expect(checkbox).toBeChecked()
    await checkbox.uncheck()
    await expect(checkbox).not.toBeChecked()
  })
})
