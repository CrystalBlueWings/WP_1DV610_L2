import SudokuGrid from './sudokuGrid.js'

/**
 * Generates hints for a Sudoku puzzle.
 */
export default class HintGenerator {
  /**
   * Initializes the HintGenerator with a given grid.
   *
   * @param {number[][]} sudokuGrid - A 9x9 matrix representing the Sudoku puzzle, where each element is a number (1-9) or null for empty cells.
   */
  constructor (sudokuGrid) {
    this.grid = new SudokuGrid(sudokuGrid) // Initialize an instance of SudokuGrid.
  }

  /**
   * Returns a hint for a specific cell in the grid.
   * If the cell is empty, returns the first valid number that can be placed there.
   *
   * @param {number} row - The row index for the cell (0-8).
   * @param {number} col - The column index for the cell (0-8).
   * @returns {number|null} - The correct number for the specified cell, or null if the cell is not empty or no hint is available.
   */
  getHintForCell (row, col) {
    if (!this.#isCellEmpty(row, col)) return null // If the cell is not empty, return null as no hint is needed.
    return this.#findFirstValidNumber(row, col) // Find the first valid number for this cell.
  }

  /**
   * Returns a hint for the easiest cell to fill based on the least number of possible candidates.
   * This finds the cell with the fewest valid numbers that can be placed.
   *
   * @returns {object|null} - An object containing the row, col, and hint number, or null if no hints are available.
   */
  getAutomatedEasyHint () {
    const emptyCells = this.#findAllEmptyCells()
    return this.#findCellWithFewestCandidates(emptyCells)
  }

  /* Private Methods */

  /**
   * Checks if a cell is empty in the grid.
   *
   * @param {number} row - The row index for the cell.
   * @param {number} col - The column index for the cell.
   * @returns {boolean} - True if the cell is empty, false otherwise.
   * @private
   */
  #isCellEmpty (row, col) {
    return this.grid.isCellEmpty(row, col)
  }

  /**
   * Finds the first valid number that can be placed in a specific cell according to Sudoku rules.
   *
   * @param {number} row - The row index for the cell.
   * @param {number} col - The column index for the cell.
   * @returns {number|null} - The first valid number that can be placed in the cell, or null if no number can be placed.
   * @private
   */
  #findFirstValidNumber (row, col) {
    for (let num = 1; num <= 9; num++) {
      if (this.grid.checkIfCanPlaceNumber(row, col, num)) {
        return num // Return the first valid number for that cell.
      }
    }
    return null // Return null if no valid number is found (should not happen if the grid is valid).
  }

  /**
   * Finds all empty cells in the grid and returns their coordinates.
   *
   * @returns {Array} - An array of objects containing row and col for each empty cell.
   * @private
   */
  #findAllEmptyCells () {
    const emptyCells = []
    // Iterate over all cells in the grid.
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.grid.isCellEmpty(row, col)) {
          emptyCells.push({ row, col })
        }
      }
    }
    return emptyCells // Return all empty cells in the grid.
  }

  /**
   * Finds the cell with the fewest candidates (possible numbers that can be placed in the cell).
   * This helps to find the easiest cell to solve.
   *
   * @param {Array} emptyCells - An array of empty cells with their coordinates.
   * @returns {object|null} - An object containing the row, col, and hint number, or null if no cell can be found.
   * @private
   */
  #findCellWithFewestCandidates (emptyCells) {
    let easiestHint = null
    let fewestCandidatesCount = 10 // Set initial value higher than possible candidates (1-9).

    emptyCells.forEach(({ row, col }) => {
      const candidates = this.#findCandidates(row, col)

      // If the cell has fewer candidates than the current fewest, update the easiest hint.
      if (candidates.length < fewestCandidatesCount) {
        fewestCandidatesCount = candidates.length
        easiestHint = { row, col, hint: candidates[0] }
      }
    })

    return easiestHint // Return the cell with the fewest candidates or null if none found.
  }

  /**
   * Finds all possible numbers that can be placed in a specific cell without violating Sudoku rules.
   *
   * @param {number} row - The row index of the cell.
   * @param {number} col - The column index of the cell.
   * @returns {number[]} - An array of possible numbers (1-9) that can be placed in the cell.
   * @private
   */
  #findCandidates (row, col) {
    const candidates = []

    // Check each number from 1 to 9 to see if it can be placed in the cell.
    for (let num = 1; num <= 9; num++) {
      if (this.grid.checkIfCanPlaceNumber(row, col, num)) {
        candidates.push(num)
      }
    }

    return candidates // Return all possible candidates for the cell.
  }
}
