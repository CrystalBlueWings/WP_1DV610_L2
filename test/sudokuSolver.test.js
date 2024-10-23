import SudokuSolver from '../src/sudokuSolver.js'

describe('SudokuSolver', () => {
  let solver // Variable to hold the instance of the SudokuSolver for testing.

  beforeEach(() => {
    // Initialize a sample Sudoku grid for testing (generated by ChatGPT).
    const grid = [
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
    solver = new SudokuSolver(grid) // Create an instance of SudokuSolver with the grid.
  })

  test('should solve the Sudoku puzzle', () => {
    const solved = solver.solveGrid() // Attempt to solve the Sudoku puzzle.
    expect(solved).toBe(true) // Verify that the puzzle was solved successfully.
    expect(solver.isComplete()).toBe(true) // Check if the puzzle is completely filled.
  })

  test('should return false for an unsolvable Sudoku puzzle', () => {
    // Create a grid that cannot be solved (contains a conflicting duplicate number).
    const unsolvableGrid = [
      [5, 5, null, null, 7, null, null, null, null], // Duplicate 5 in the same row.
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9]
    ]
    const unsolvableSolver = new SudokuSolver(unsolvableGrid) // Create a new instance of SudokuSolver with the unsolvable grid.
    const solved = unsolvableSolver.solveGrid() // Attempt to solve the unsolvable puzzle.
    expect(solved).toBe(false) // Verify that the solver correctly identifies the puzzle as unsolvable.
  })

  test('should solve a specific 3x3 box', () => {
    const solvedBox = solver.solveSpecificBox(0, 0)
    expect(solvedBox).toBe(true)
  })

  test('should return true when the Sudoku puzzle is complete', () => {
    solver.solveGrid() // Solve the Sudoku puzzle.
    expect(solver.isComplete()).toBe(true) // Verify that the puzzle is complete after solving.
  })

  test('should return false when the Sudoku puzzle is incomplete', () => {
    expect(solver.isComplete()).toBe(false) // Verify that the puzzle is initially incomplete before solving.
  })

  test('should solve the puzzle within a reasonable time limit', async () => {
    jest.setTimeout(5000) // 5 seconds timeout for the entire test case.
    const solved = solver.solveGrid() // Attempt to solve the Sudoku puzzle.
    expect(solved).toBe(true)
  })
})
