import HintGenerator from '../src/hintGenerator.js'
import SudokuGenerator from '../src/sudokuGenerator.js'

describe('HintGenerator', () => {
  let hintGenerator
  let unfinishedGrid

  beforeEach(() => {
    const generator = new SudokuGenerator()
    unfinishedGrid = generator.generateUnfinishedSudokuGrid('medium')
    hintGenerator = new HintGenerator(unfinishedGrid)
  })

  test('should return a valid hint for a specific cell', () => {
    const emptyPosition = hintGenerator.grid.findEmptyPosition()
    if (emptyPosition) {
      const { row, col } = emptyPosition
      const hint = hintGenerator.getHintForCell(row, col)
      if (hint !== null) {
        expect(hint).toBeGreaterThanOrEqual(1)
        expect(hint).toBeLessThanOrEqual(9)
        // Check if placing the hint number is valid.
        expect(hintGenerator.grid.checkIfCanPlaceNumber(row, col, hint)).toBe(true)
      } else {
        expect(hint).toBeNull()
      }
    }
  })

  test('should return null for a non-empty cell', () => {
    // Find a filled cell.
    let found = false
    for (let row = 0; row < 9 && !found; row++) {
      for (let col = 0; col < 9 && !found; col++) {
        if (!hintGenerator.grid.isCellEmpty(row, col)) {
          const hint = hintGenerator.getHintForCell(row, col)
          expect(hint).toBeNull()
          found = true
        }
      }
    }
  })

  test('should return the cells with the fewest candidates', () => {
    const cells = hintGenerator.getCellsWithFewestCandidates(3)
    expect(cells.length).toBeLessThanOrEqual(3)
    cells.forEach(cell => {
      expect(cell.candidates.length).toBeGreaterThan(0)
    })
  })

  test('should return the cells with the most candidates', () => {
    const cells = hintGenerator.getCellsWithMostCandidates(3)
    expect(cells.length).toBeLessThanOrEqual(3)
    cells.forEach(cell => {
      expect(cell.candidates.length).toBeGreaterThan(0)
    })
  })

  test('should return the easiest box to solve', () => {
    const easiestBox = hintGenerator.getEasiestBox()
    expect(easiestBox).toHaveProperty('boxRow')
    expect(easiestBox).toHaveProperty('boxCol')
    expect(easiestBox.boxRow).toBeGreaterThanOrEqual(0)
    expect(easiestBox.boxRow).toBeLessThanOrEqual(2)
    expect(easiestBox.boxCol).toBeGreaterThanOrEqual(0)
    expect(easiestBox.boxCol).toBeLessThanOrEqual(2)
  })
})
