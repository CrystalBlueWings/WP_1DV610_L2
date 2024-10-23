import SudokuSolver from '../src/sudokuSolver.js'
import SudokuGenerator from '../src/sudokuGenerator.js'
import SudokuValidator from '../src/sudokuValidator.js'

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
    return new SudokuSolver(staticGrid)
  }],
  ['Dynamic Grid', () => {
    // Generate a dynamic unfinished Sudoku grid.
    const generator = new SudokuGenerator()
    const dynamicGrid = generator.generateUnfinishedSudokuGrid('medium')
    return new SudokuSolver(dynamicGrid)
  }]
])('SudokuSolver with %s', (name, getSolverInstance) => {
  let solver

  beforeEach(() => {
    solver = getSolverInstance()
  })

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

  test('should return false for an unsolvable Sudoku puzzle', () => {
    // Create an unsolvable grid by introducing a duplicate number.
    const unsolvableGrid = JSON.parse(JSON.stringify(solver.grid.sudokuGrid))
    unsolvableGrid[0][0] = 1 // Introduce a conflict.
    unsolvableGrid[0][1] = 1 // Duplicate number in the same row.
    const unsolvableSolver = new SudokuSolver(unsolvableGrid) // Create a new instance of SudokuSolver with the unsolvable grid.
    const solved = unsolvableSolver.solveGrid() // Attempt to solve the unsolvable puzzle.
    expect(solved).toBe(false) // Verify that the solver correctly identifies the puzzle as unsolvable.
  })

  test('should return false when the Sudoku puzzle is incomplete', () => {
    expect(solver.isComplete()).toBe(false) // Verify that the puzzle is initially incomplete before solving.
  })

  test('should solve a specific 3x3 box', () => {
    const boxRow = 0
    const boxCol = 0
    const solvedBox = solver.solveSpecificBox(boxRow, boxCol)
    expect(solvedBox).toBe(true)

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

  test('should solve a specific 3x3 box with randomization', () => {
    const boxRow = 0
    const boxCol = 0
    const solvedBox = solver.solveSpecificBox(boxRow, boxCol, true)
    expect(solvedBox).toBe(true)

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

  test('should count the number of solutions correctly', () => {
    // For static grid, we might know the expected number of solutions.
    // For dynamic grid, we can check if the solution count is at least 1.
    const solutionCount = solver.countSolutions(2)
    expect(solutionCount).toBeGreaterThanOrEqual(1)
    expect(solutionCount).toBeLessThanOrEqual(2)
  })

  test('should count the number of solutions with randomization', () => {
    const solutionCount = solver.countSolutions(2, true)
    expect(solutionCount).toBeGreaterThanOrEqual(1)
    expect(solutionCount).toBeLessThanOrEqual(2)
  })

  test('should count zero solutions for an unsolvable Sudoku puzzle', () => {
    // Create an unsolvable grid by introducing a conflict.
    const unsolvableGrid = JSON.parse(JSON.stringify(solver.grid.sudokuGrid))
    unsolvableGrid[0][0] = 1
    unsolvableGrid[0][1] = 1 // Conflict in the same row.
    const unsolvableSolver = new SudokuSolver(unsolvableGrid)
    const solutionCount = unsolvableSolver.countSolutions(2)
    expect(solutionCount).toBe(0)
  })

  test('should count solutions up to the specified limit', () => {
    // Test with a different limit.
    const solutionCount = solver.countSolutions(1)
    expect(solutionCount).toBeGreaterThanOrEqual(1)
    expect(solutionCount).toBeLessThanOrEqual(1)
  })
})
