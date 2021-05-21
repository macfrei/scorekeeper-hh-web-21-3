import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreatePage from './CreatePage'

describe('CreatePage', () => {
  it('should render a form with two inputs and a button', () => {
    render(<CreatePage onSubmit={jest.fn()} />)

    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()

    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(2)

    const button = screen.getByRole('button', { name: 'Create game' })
    expect(button).toBeInTheDocument()
  })

  it('should call submit function with form data', () => {
    const submitCallback = jest.fn()
    render(<CreatePage onSubmit={submitCallback} />)

    userEvent.type(screen.getByLabelText('Name of game:'), 'Carcassone')
    userEvent.type(screen.getByLabelText('Player names:'), 'Jane, John')

    userEvent.click(screen.getByRole('button', { name: 'Create game' }))

    expect(submitCallback).toHaveBeenCalledWith({
      nameOfGame: 'Carcassone',
      players: [
        { name: 'Jane', score: 0 },
        { name: 'John', score: 0 },
      ],
    })
  })
})
