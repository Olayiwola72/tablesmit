import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../../components/ui/Tooltip/Tooltip'

describe('Tooltip', () => {
  it('renders tooltip content on hover', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )
    await user.hover(screen.getByRole('button', { name: 'Hover me' }))
    const contents = await screen.findAllByText('Tooltip text')
    expect(contents.length).toBeGreaterThanOrEqual(1)
  })

  it('forwards className to content', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Hover</button>
          </TooltipTrigger>
          <TooltipContent className="custom-cls">Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )
    await user.hover(screen.getByRole('button', { name: 'Hover' }))
    const contents = await screen.findAllByText('Content')
    const visible = contents.find((el) => el.className.includes('custom-cls'))
    expect(visible).toBeTruthy()
  })
})
