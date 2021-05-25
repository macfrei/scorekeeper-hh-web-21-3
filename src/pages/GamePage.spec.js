import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GamePage from './GamePage'

describe('GamePage', () => {
  it('should render a page with props', () => {
    render(
      <GamePage
        nameOfGame="Carcassone"
        players={[
          { name: 'Jane', score: 0 },
          { name: 'John', score: 0 },
        ]}
        onEndGame={jest.fn()}
        onPlayerUpdate={jest.fn()}
        onResetScores={jest.fn()}
      />
    )

    expect(screen.getByText('Carcassone')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(
      screen.getByRole('list', { name: 'List of players' })
    ).toBeInTheDocument()
  })

  it('should call player update function on button click', () => {
    const handlePlayerUpdate = jest.fn()

    render(
      <GamePage
        nameOfGame="Carcassone"
        players={[
          { name: 'Jane', score: 0 },
          { name: 'John', score: 0 },
        ]}
        onEndGame={jest.fn()}
        onResetScores={jest.fn()}
        onPlayerUpdate={handlePlayerUpdate}
      />
    )

    const minusButtons = screen.getAllByRole('button', { name: '-' })
    const plusButtons = screen.getAllByRole('button', { name: '+' })

    userEvent.click(minusButtons[0])
    expect(handlePlayerUpdate).toHaveBeenCalledWith(0, -1)

    userEvent.click(plusButtons[1])
    expect(handlePlayerUpdate).toHaveBeenCalledWith(1, 1)
  })

  it('should call reset function on button click', () => {
    const handleResetScores = jest.fn()
    render(
      <GamePage
        nameOfGame="Carcassone"
        players={[
          { name: 'Jane', score: 0 },
          { name: 'John', score: 0 },
        ]}
        onEndGame={jest.fn()}
        onPlayerUpdate={jest.fn()}
        onResetScores={handleResetScores}
      />
    )

    const resetButton = screen.getByRole('button', { name: 'Reset scores' })
    userEvent.click(resetButton)

    expect(handleResetScores).toHaveBeenCalled()
  })

  it('should call end game on button click', () => {
    const handleEndGame = jest.fn()
    render(
      <GamePage
        nameOfGame="Carcassone"
        players={[
          { name: 'Jane', score: 0 },
          { name: 'John', score: 0 },
        ]}
        onPlayerUpdate={jest.fn()}
        onResetScores={jest.fn()}
        onEndGame={handleEndGame}
      />
    )

    const resetButton = screen.getByRole('button', { name: 'End game' })
    userEvent.click(resetButton)

    expect(handleEndGame).toHaveBeenCalled()
  })
})
