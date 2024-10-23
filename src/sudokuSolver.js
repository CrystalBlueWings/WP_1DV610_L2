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
    this.solutionCount = 0 // Initialize the solution count.
  }

  /**
   * Attempts to solve the Sudoku puzzle.
   *
   * @param {boolean} randomize - Whether to randomize the number selection (default false).
   * @returns {boolean} - True if the puzzle is solved successfully, false otherwise.
   */
  solveGrid (randomize = false) {
    return this.#solvePuzzle(randomize)
  }

  /**
   * Attempts to solve a specific 3x3 box without violating Sudoku rules.
   *
   * @param {number} boxRow - The box row index (0-2).
   * @param {number} boxCol - The box column index (0-2).
   * @param {boolean} randomize - Whether to randomize the number selection (default false).
   * @returns {boolean} - True if the box is solved successfully, false otherwise.
   */
  solveSpecificBox (boxRow, boxCol, randomize = false) {
    return this.#solveBox(boxRow, boxCol, randomize)
  }

  /**
   * Counts the number of solutions for the Sudoku puzzle up to a specified limit.
   *
   * @param {number} limit - The maximum number of solutions to find (default 2).
   * @param {boolean} randomize - Whether to randomize the number selection (default false).
   * @returns {number} - The number of solutions found (up to the limit).
   */
  countSolutions (limit = 2, randomize = false) {
    this.solutionCount = 0
    const emptyCells = this.grid.getAllEmptyPositions()
    this.#countSolutionsRecursive(emptyCells, 0, limit, randomize)
    return this.solutionCount
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
   * Recursively counts the number of solutions up to the specified limit.
   *
   * @param {Array} emptyCells - Array of empty cell coordinates.
   * @param {number} index - Current index in the emptyCells array.
   * @param {number} limit - The maximum number of solutions to find.
   * @param {boolean} randomize - Whether to randomize the number selection.
   * @private
   */
  #countSolutionsRecursive (emptyCells, index, limit, randomize) {
    if (this.solutionCount >= limit) {
      return // Stop recursion if limit is reached.
    }

    if (index >= emptyCells.length) {
      this.solutionCount += 1
      return
    }

    const { row, col } = emptyCells[index]
    const numbers = this.#getListOfNumbersToTry(randomize)

    for (const num of numbers) {
      if (this.grid.checkIfCanPlaceNumber(row, col, num)) {
        this.grid.placeNumber(row, col, num)

        // Recursively attempt to fill the next cell.
        this.#countSolutionsRecursive(emptyCells, index + 1, limit, randomize)

        // Backtrack to try the next number.
        this.grid.removeNumber(row, col)

        if (this.solutionCount >= limit) {
          return // Early exit if limit is reached.
        }
      }
    }
  }

  /**
   * Recursively attempts to solve the Sudoku puzzle using backtracking.
   *
   * @param {boolean} randomize - Whether to randomize the number selection.
   * @returns {boolean} - True if solved, false otherwise.
   * @private
   */
  #solvePuzzle (randomize) {
    const emptyPosition = this.grid.findEmptyPosition()
    if (!emptyPosition) {
      return true // Puzzle solved.
    }

    const { row, col } = emptyPosition

    // Get the list of numbers to try.
    const numbers = this.#getListOfNumbersToTry(randomize)

    // Try placing numbers in the cell.
    for (const num of numbers) {
      if (this.grid.checkIfCanPlaceNumber(row, col, num)) {
        this.grid.placeNumber(row, col, num)

        // Recursively attempt to solve with the new number placed.
        if (this.#solvePuzzle(randomize)) {
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
   * @param {boolean} randomize - Whether to randomize the number selection.
   * @returns {boolean} - True if the box is solved successfully, false otherwise.
   * @private
   */
  #solveBox (boxRow, boxCol, randomize) {
    const emptyCells = this.grid.getEmptyCellsInBox(boxRow, boxCol)
    return this.#fillEmptyCellsInBox(emptyCells, 0, randomize) // Start recursion.
  }

  /**
   * Recursively fills empty cells within a specific 3x3 box.
   *
   * @param {Array} emptyCells - Array of empty cell coordinates within the box.
   * @param {number} index - Current index in the emptyCells array.
   * @param {boolean} randomize - Whether to randomize the number selection.
   * @returns {boolean} - True if the box is solved, false otherwise.
   * @private
   */
  #fillEmptyCellsInBox (emptyCells, index, randomize) {
    if (index >= emptyCells.length) {
      return true // All cells filled successfully.
    }

    const { row, col } = emptyCells[index]

    // Get the list of numbers to try.
    const numbers = this.#getListOfNumbersToTry(randomize)

    // Try placing numbers in the cell.
    for (const num of numbers) {
      if (this.grid.checkIfCanPlaceNumber(row, col, num)) {
        this.grid.placeNumber(row, col, num)

        // Recursively attempt to fill the next cell.
        if (this.#fillEmptyCellsInBox(emptyCells, index + 1, randomize)) {
          return true
        }

        // Backtrack if placing num doesn't lead to a solution.
        this.grid.removeNumber(row, col)
      }
    }

    return false // Trigger backtracking.
  }

  /**
   * Generates the list of numbers to try, optionally shuffled.
   *
   * @param {boolean} randomize - Whether to randomize the number selection.
   * @returns {number[]} - The array of numbers to try.
   * @private
   */
  #getListOfNumbersToTry (randomize) {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    if (randomize) {
      numbers = this.#shuffleArray(numbers)
    }
    return numbers
  }

  /**
   * Shuffles an array using the Fisher-Yates algorithm.
   *
   * @param {number[]} array - The array to shuffle.
   * @returns {number[]} - The shuffled array.
   * @private
   */
  #shuffleArray (array) {
    // Fisher-Yates shuffle algorithm.
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index j such that 0 ≤ j ≤ i.
      const j = Math.floor(Math.random() * (i + 1))
      // Swap elements at indices i and j.
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array // Return the array after shuffling.
  }
}
