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
  solveGrid () {
    return this.#solvePuzzle()
  }

  /**
   * Attempts to solve a specific 3x3 box without violating Sudoku rules.
   *
   * @param {number} boxRow - The row index of the box (0-2).
   * @param {number} boxCol - The column index of the box (0-2).
   * @returns {boolean} - True if the box is solved successfully, false otherwise.
   */
  solveBox (boxRow, boxCol) {
    return this.#solveSpecificBox(boxRow, boxCol)
  }

  /**
   * Checks if the Sudoku puzzle is complete (no empty cells).
   *
   * @returns {boolean} - True if the puzzle is complete, false otherwise.
   */
  isComplete () {
    return this.grid.findEmptyPosition() === null
  }

  /* Private Methods */

  /**
   * Recursively attempts to solve the Sudoku puzzle using backtracking.
   *
   * @returns {boolean} - True if solved, false otherwise.
   * @private
   */
  #solvePuzzle () {
    const emptyPosition = this.grid.findEmptyPosition()
    if (!emptyPosition) {
      return true // Puzzle solved.
    }

    const { row, col } = emptyPosition

    // Try placing numbers 1 through 9.
    for (let num = 1; num <= 9; num++) {
      if (this.grid.checkIfCanPlaceNumber(row, col, num)) {
        this.grid.placeNumber(row, col, num)

        // Recursively attempt to solve with the new number placed.
        if (this.#solvePuzzle()) {
          return true
        }

        // Backtrack if placing num doesn't lead to a solution.
        this.grid.removeNumber(row, col)
      }
    }

    return false // Trigger backtracking.
  }

  /**
   * Initiates the process of solving a specific 3x3 box.
   *
   * @param {number} boxRow - The box row index (0-2).
   * @param {number} boxCol - The box column index (0-2).
   * @returns {boolean} - True if the box is solved, false otherwise.
   * @private
   */
  #solveSpecificBox (boxRow, boxCol) {
    const emptyCells = this.grid.getEmptyCellsInBox(boxRow, boxCol)
    return this.#fillEmptyCellsInBox(emptyCells, 0) // Start recursion.
  }

  /**
   * Recursively fills empty cells within a specific 3x3 box.
   *
   * @param {Array} emptyCells - Array of empty cell coordinates within the box.
   * @param {number} index - Current index in the emptyCells array.
   * @returns {boolean} - True if the box is solved, false otherwise.
   * @private
   */
  #fillEmptyCellsInBox (emptyCells, index) {
    if (index >= emptyCells.length) {
      return true // All cells filled successfully.
    }

    const { row, col } = emptyCells[index]

    // Try placing numbers 1 through 9 in the current cell.
    for (let num = 1; num <= 9; num++) {
      if (this.grid.checkIfCanPlaceNumber(row, col, num)) {
        this.grid.placeNumber(row, col, num)

        // Recursively attempt to fill the next cell.
        if (this.#fillEmptyCellsInBox(emptyCells, index + 1)) {
          return true
        }

        // Backtrack if placing num doesn't lead to a solution.
        this.grid.removeNumber(row, col)
      }
    }

    return false // Trigger backtracking.
  }
}
