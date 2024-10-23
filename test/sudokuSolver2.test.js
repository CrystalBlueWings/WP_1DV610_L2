import SudokuSolver from '../src/sudokuSolver.js'
import SudokuGenerator from '../src/sudokuGenerator.js'
import SudokuValidator from '../src/sudokuValidator.js'

describe('SudokuSolver', () => {
  let solver
  let grid

  beforeEach(() => {
    const generator = new SudokuGenerator()
    grid = generator.generateUnfinishedSudokuGrid() // Generate a random, unfinished Sudoku grid.
    solver = new SudokuSolver(grid)
  })

  // Set a timeout for tests that might take longer.
  jest.setTimeout(10000) // 10 seconds.

  test('should solve the Sudoku puzzle', () => {
    const solved = solver.solveGrid()
    expect(solved).toBe(true)
    expect(solver.isComplete()).toBe(true)
    const validator = new SudokuValidator(solver.grid.sudokuGrid)
    expect(validator.isValidGrid()).toBe(true)
  })

  test('should solve the Sudoku puzzle with randomization', () => {
    const solved = solver.solveGrid(true)
    expect(solved).toBe(true)
    expect(solver.isComplete()).toBe(true)
    const validator = new SudokuValidator(solver.grid.sudokuGrid)
    expect(validator.isValidGrid()).toBe(true)
  })

  test('should solve a specific box', () => {
    const boxRow = Math.floor(Math.random() * 3)
    const boxCol = Math.floor(Math.random() * 3)
    const solved = solver.solveSpecificBox(boxRow, boxCol)
    expect(solved).toBe(true)

    // Verify that the box is fully filled and valid.
    const boxCells = []
    const startRow = boxRow * 3
    const startCol = boxCol * 3
    for (let row = startRow; row < startRow + 3; row++) {
      for (let col = startCol; col < startCol + 3; col++) {
        expect(solver.grid.isCellEmpty(row, col)).toBe(false)
        boxCells.push(solver.grid.sudokuGrid[row][col])
      }
    }
    // Check that the box contains numbers 1 to 9 without duplicates.
    const numbersInBox = new Set(boxCells)
    expect(numbersInBox.size).toBe(9)
    for (let num = 1; num <= 9; num++) {
      expect(numbersInBox.has(num)).toBe(true)
    }
  })

  test('should check if the puzzle is complete', () => {
    const isCompleteBefore = solver.isComplete()
    expect(isCompleteBefore).toBe(false)
    solver.solveGrid()
    const isCompleteAfter = solver.isComplete()
    expect(isCompleteAfter).toBe(true)
  })
})
