import HintGenerator from '../src/hintGenerator.js'
import SudokuGenerator from '../src/sudokuGenerator.js'

describe.each([
  ['Static Grid', () => {
    // Initialize a sample static Sudoku grid.
    const staticGrid = [
      [5, 3, null, null, 7, null, null, null, null],
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9]
    ]
    return new HintGenerator(staticGrid)
  }],
  ['Dynamic Grid', () => {
    // Initialize a dynamic Sudoku grid.
    const sudokuGenerator = new SudokuGenerator()
    const dynamicGrid = sudokuGenerator.generateUnfinishedSudokuGrid('medium')
    return new HintGenerator(dynamicGrid)
  }]
])('HintGenerator with %s', (name, getInstance) => {
  let instance

  beforeEach(() => {
    instance = getInstance()
  })

  test('should return a valid hint for an empty cell', () => {
    const emptyPosition = instance.grid.findEmptyPosition()
    if (emptyPosition) {
      const { row, col } = emptyPosition
      const hint = instance.getHintForCell(row, col)
      if (hint !== null) {
        expect(hint).toBeGreaterThanOrEqual(1)
        expect(hint).toBeLessThanOrEqual(9)
        // Verify that placing the hint number is valid.
        expect(instance.grid.checkIfCanPlaceNumber(row, col, hint)).toBe(true)
      } else {
        // In case no valid hint is found (unlikely in a valid puzzle).
        expect(hint).toBeNull()
      }
    } else {
      // If there are no empty positions, the grid is complete.
      expect(instance.grid.isComplete()).toBe(true)
    }
  })

  test('should return null for a non-empty cell', () => {
    // Find a filled cell.
    let found = false
    for (let row = 0; row < 9 && !found; row++) {
      for (let col = 0; col < 9 && !found; col++) {
        if (!instance.grid.isCellEmpty(row, col)) {
          const hint = instance.getHintForCell(row, col)
          expect(hint).toBeNull()
          found = true
        }
      }
    }
    // Ensure that a filled cell was actually found.
    expect(found).toBe(true)
  })

  test('should return cells with the fewest candidates', () => {
    const cells = instance.getCellsWithFewestCandidates(3)
    expect(cells.length).toBeLessThanOrEqual(3)
    cells.forEach(cell => {
      expect(cell.candidates.length).toBeGreaterThan(0)
    })
  })

  test('should return cells with the most candidates', () => {
    const cells = instance.getCellsWithMostCandidates(3)
    expect(cells.length).toBeLessThanOrEqual(3)
    cells.forEach(cell => {
      expect(cell.candidates.length).toBeGreaterThan(0)
    })
  })

  test('should return the easiest box to solve', () => {
    const easiestBox = instance.getEasiestBox()
    expect(easiestBox).toHaveProperty('boxRow')
    expect(easiestBox).toHaveProperty('boxCol')
    expect(easiestBox.boxRow).toBeGreaterThanOrEqual(0)
    expect(easiestBox.boxRow).toBeLessThanOrEqual(2)
    expect(easiestBox.boxCol).toBeGreaterThanOrEqual(0)
    expect(easiestBox.boxCol).toBeLessThanOrEqual(2)
  })
})
