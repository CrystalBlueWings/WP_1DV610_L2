import SudokuGrid from './sudokuGrid.js'

/**
 * Represents a solver for Sudoku puzzles using a backtracking algorithm.
 */
export default class SudokuSolver {
  /**
   * Initializes the SudokuSolver with a given grid.
   *
   * @param {number[][]} sudokuGrid - A 9x9 matrix representing the Sudoku puzzle, where each element is a number (1-9) or null for empty cells.
   */
  constructor (sudokuGrid) {
    this.grid = new SudokuGrid(sudokuGrid) // Initialize an instance of SudokuGrid.
  }

  /**
   * Attempts to solve the Sudoku puzzle using a backtracking algorithm.
   *
   * @returns {boolean} - True if the puzzle is solved successfully, false otherwise.
   */
  solve () {
    // Get the next empty position in the grid.
    const emptyPosition = this.grid.findEmptyPosition()
    if (!emptyPosition) {
      return true // No empty cells left - the puzzle is solved!
    }

    const { row, col } = emptyPosition

    // Try placing numbers 1 to 9 in the empty cell.
    for (let num = 1; num <= 9; num++) {
      // Check if the number can be placed in the empty cell.
      if (this.grid.checkIfCanPlaceNumber(row, col, num)) {
        this.grid.placeNumber(row, col, num)

        // Recursively try to solve the puzzle with the placed number.
        if (this.solve()) {
          return true // The puzzle is solved.
        }

        // Backtrack - remove the number if it doesn't lead to a solution.
        this.grid.removeNumber(row, col)
      }
    }

    return false // No solution found for this configuration.
  }

  /**
   * Checks if the Sudoku puzzle is complete (no empty cells).
   *
   * @returns {boolean} - True if the puzzle is complete, false otherwise.
   */
  isComplete () {
    return this.grid.findEmptyPosition() === null // Returns true if there are no empty cells left.
  }
}
