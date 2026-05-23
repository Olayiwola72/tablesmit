import { describe, expect, it } from 'vitest'
import { KEY_ARROW_DOWN, KEY_ARROW_LEFT, KEY_ARROW_RIGHT, KEY_ARROW_UP, KEY_ESCAPE } from '../../constants/keys'

describe('keys', () => {
  it('KEY_ESCAPE is Escape', () => expect(KEY_ESCAPE).toBe('Escape'))
  it('KEY_ARROW_UP is ArrowUp', () => expect(KEY_ARROW_UP).toBe('ArrowUp'))
  it('KEY_ARROW_DOWN is ArrowDown', () => expect(KEY_ARROW_DOWN).toBe('ArrowDown'))
  it('KEY_ARROW_LEFT is ArrowLeft', () => expect(KEY_ARROW_LEFT).toBe('ArrowLeft'))
  it('KEY_ARROW_RIGHT is ArrowRight', () => expect(KEY_ARROW_RIGHT).toBe('ArrowRight'))
})
