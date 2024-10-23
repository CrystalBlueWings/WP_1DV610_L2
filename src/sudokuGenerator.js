import SudokuSolver from './sudokuSolver.js'
import SudokuValidator from './sudokuValidator.js'

/**
 * Class responsible for generating Sudoku grids.
 */
export default class SudokuGenerator {
  /**
   * Generates a complete, valid Sudoku grid.
   *
   * @returns {number[][]} - A 9x9 matrix representing a complete Sudoku grid.
   */
  generateCompleteSudokuGrid () {
    return this.#attemptToGenerateCompleteGrid()
  }

  /**
   * Generates an unfinished Sudoku grid by removing numbers from a complete grid.
   *
   * @param {string} difficulty - Difficulty level ('easy', 'medium', 'hard').
   * @returns {number[][]} - A 9x9 matrix representing an unfinished Sudoku grid.
   */
  generateUnfinishedSudokuGrid (difficulty = 'medium') {
    return this.#createUnfinishedGrid(difficulty)
  }

  /* Private Methods */

  /**
   * Attempts to generate a complete Sudoku grid within given time and attempt constraints.
   *
   * @returns {number[][]} - A valid and complete Sudoku grid.
   * @private
   */
  #attemptToGenerateCompleteGrid () {
    const startTime = Date.now()
    const maxTime = 5000 // 5 seconds timeout.
    const maxAttempts = 10000 // Maximum attempts.
    let attempts = 0

    while (attempts < maxAttempts) {
      const grid = this.#createCompleteGrid()
      if (this.#isGridValid(grid)) {
        return grid
      }
      attempts++

      if (this.#hasTimedOut(startTime, maxTime)) {
        throw new Error('Sudoku grid generation timed out.')
      }
    }

    throw new Error('Maximum attempts reached. Could not generate a valid grid.')
  }

  /**
   * Creates a complete Sudoku grid using the solver with randomization.
   *
   * @returns {number[][]} - A complete Sudoku grid.
   * @private
   */
  #createCompleteGrid () {
    const emptyGrid = this.#initializeEmptyGrid() // Initialize an empty 9x9 grid filled with nulls.
    const solver = new SudokuSolver(emptyGrid) // Create a new instance of SudokuSolver with the empty grid.
    solver.solveGrid(true) // Solve the grid with randomization to generate a complete Sudoku puzzle.
    return solver.grid.sudokuGrid // Return the completed Sudoku grid.
  }

  /**
   * Checks if the grid is valid using the SudokuValidator.
   *
   * @param {number[][]} grid - The Sudoku grid to validate.
   * @returns {boolean} - True if the grid is valid.
   * @private
   */
  #isGridValid (grid) {
    const validator = new SudokuValidator(grid)
    return validator.isValidGrid()
  }

  /**
   * Checks if the generation process has exceeded the allowed time limit.
   *
   * @param {number} startTime - The start time of the process.
   * @param {number} maxTime - The maximum allowed time in milliseconds.
   * @returns {boolean} - True if the generation has timed out.
   * @private
   */
  #hasTimedOut (startTime, maxTime) {
    return (Date.now() - startTime) > maxTime
  }

  /**
   * Creates an unfinished Sudoku grid by removing numbers from a complete grid based on difficulty.
   *
   * @param {string} difficulty - The difficulty level.
   * @returns {number[][]} - An unfinished Sudoku grid.
   * @private
   */
  #createUnfinishedGrid (difficulty) {
    const completeGrid = this.#createCompleteGrid()
    const attempts = this.#getAttemptsBasedOnDifficulty(difficulty) // Determine the number of attempts to remove numbers based on difficulty.
    return this.#removeNumbersFromGrid(completeGrid, attempts) // Remove numbers from the complete grid to create an unfinished puzzle.
  }

  /**
   * Initializes an empty 9x9 Sudoku grid.
   *
   * @returns {number[][]} - An empty Sudoku grid.
   * @private
   */
  #initializeEmptyGrid () {
    return Array.from({ length: 9 }, () => Array(9).fill(null))
  }

  /**
   * Determines the number of attempts to remove numbers based on difficulty.
   *
   * @param {string} difficulty - The difficulty level.
   * @returns {number} - The number of attempts.
   * @private
   */
  #getAttemptsBasedOnDifficulty (difficulty) {
    switch (difficulty) {
      case 'easy':
        return 30 // Fewer attempts result in fewer empty cells, making the puzzle easier.
      case 'hard':
        return 60 // More attempts result in more empty cells, making the puzzle harder.
      case 'medium':
      default:
        return 45 // Default to medium difficulty if not specified.
    }
  }

  /**
   * Removes numbers from the grid while ensuring it remains solvable.
   *
   * @param {number[][]} grid - The complete Sudoku grid.
   * @param {number} attempts - The number of attempts to remove numbers.
   * @returns {number[][]} - The unfinished Sudoku grid.
   * @private
   */
  #removeNumbersFromGrid (grid, attempts) {
    const gridCopy = this.#deepCopyGrid(grid) // Create a deep copy of the grid to avoid modifying the original.
    let remainingAttempts = attempts // Initialize the remaining attempts to remove numbers.

    while (remainingAttempts > 0) {
      const { row, col } = this.#getRandomCell() // Select a random cell in the grid.
      if (gridCopy[row][col] !== null) { // If the cell is not already empty.
        const backup = gridCopy[row][col] // Backup the original number.
        gridCopy[row][col] = null // Remove the number from the cell.

        // Ensure that the grid still has a unique solution.
        if (!this.#hasUniqueSolution(gridCopy)) {
          gridCopy[row][col] = backup // Revert the change if the grid has no solution.
        }
        // Decrease number of remaining attempts regardless of whether a number was successfully removed or not.
        // This ensures the loop will eventually terminate, and not cause an infinite loop.
        remainingAttempts--
      }
    }

    return gridCopy // Return the unfinished grid with numbers removed.
  }

  /**
   * Creates a deep copy of the grid.
   *
   * @param {number[][]} grid - The grid to copy.
   * @returns {number[][]} - The copied grid.
   * @private
   */
  #deepCopyGrid (grid) {
    return JSON.parse(JSON.stringify(grid)) // Use JSON to create a deep copy of the grid.
  }

  /**
   * Generates random row and column indices.
   *
   * @returns {object} - An object containing random row and column indices (0-8).
   * @private
   */
  #getRandomCell () {
    return {
      row: Math.floor(Math.random() * 9),
      col: Math.floor(Math.random() * 9)
    }
  }

  /**
   * Checks if the grid has a unique solution.
   *
   * @param {number[][]} grid - The grid to check.
   * @returns {boolean} - True if the grid has at least one solution.
   * @private
   */
  #hasUniqueSolution (grid) {
    const testGrid = this.#deepCopyGrid(grid) // Create a copy of the grid to avoid modifying the original.
    const solver = new SudokuSolver(testGrid) // Create a new solver instance with the test grid.
    return solver.solveGrid() // Attempt to solve the grid. Return true if solvable.
  }
}
