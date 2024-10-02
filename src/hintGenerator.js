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
   * @param {number} row - The row index of the cell (0-8).
   * @param {number} col - The column index of the cell (0-8).
   * @returns {number|null} - The correct number for the cell, or null if no hint is available.
   */
  getHintForCell (row, col) {
    return this.#generateHintForCell(row, col)
  }

  /**
   * Returns the cells with the fewest candidates.
   *
   * @param {number} count - The number of cells to return (default 1).
   * @returns {Array} - An array of cells with the fewest candidates.
   */
  getCellsWithFewestCandidates (count = 1) {
    return this.#getCellsWithFewestCandidates(count)
  }

  /**
   * Returns the cells with the most candidates.
   *
   * @param {number} count - The number of cells to return (default 1).
   * @returns {Array} - An array of cells with the most candidates.
   */
  getCellsWithMostCandidates (count = 1) {
    return this.#getCellsWithMostCandidates(count)
  }

  /**
   * Returns the easiest box to solve based on total number of candidates.
   *
   * @returns {object|null} - An object with boxRow and boxCol for the easiest box, or null if none found.
   */
  getEasiestBox () {
    return this.#findEasiestBox()
  }

  /* Private Methods */

  /**
   * Generates a hint for a specific cell.
   *
   * @param {number} row - The row index.
   * @param {number} col - The column index.
   * @returns {number|null} - The hint number or null if cell is not empty.
   * @private
   */
  #generateHintForCell (row, col) {
    if (!this.grid.isCellEmpty(row, col)) {
      return null // No hint needed for non-empty cells.
    }

    return this.#findFirstValidNumber(row, col)
  }

  /**
   * Retrieves cells with the fewest candidates.
   *
   * @param {number} count - Number of cells to return.
   * @returns {Array} - Array of cells.
   * @private
   */
  #getCellsWithFewestCandidates (count) {
    const rankedCells = this.#getCellsRankedByCandidates()
    return rankedCells.slice(0, count)
  }

  /**
   * Retrieves cells with the most candidates.
   *
   * @param {number} count - Number of cells to return.
   * @returns {Array} - Array of cells.
   * @private
   */
  #getCellsWithMostCandidates (count) {
    const rankedCells = this.#getCellsRankedByCandidates().reverse()
    return rankedCells.slice(0, count)
  }

  /**
   * Finds the easiest box to solve based on total candidates.
   *
   * @returns {object|null} - Coordinates of the easiest box.
   * @private
   */
  #findEasiestBox () {
    let easiestBox = null
    let fewestTotalCandidates = Infinity

    // Iterate over all 3x3 boxes.
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const totalCandidates = this.#calculateTotalCandidatesInBox(boxRow, boxCol)

        // Update if this box has fewer total candidates.
        if (totalCandidates < fewestTotalCandidates) {
          fewestTotalCandidates = totalCandidates
          easiestBox = { boxRow, boxCol }
        }
      }
    }

    return easiestBox
  }

  /**
   * Calculates the total number of candidates in a specific box.
   *
   * @param {number} boxRow - The box row index.
   * @param {number} boxCol - The box column index.
   * @returns {number} - Total number of candidates in the box.
   * @private
   */
  #calculateTotalCandidatesInBox (boxRow, boxCol) {
    const emptyCells = this.grid.getEmptyCellsInBox(boxRow, boxCol)
    let totalCandidates = 0

    // Sum the number of candidates in the box.
    emptyCells.forEach(({ row, col }) => {
      const candidates = this.#findCandidates(row, col)
      totalCandidates += candidates.length
    })

    return totalCandidates
  }

  /**
   * Retrieves all empty cells ranked by number of candidates.
   *
   * @returns {Array} - Array of cells with candidates.
   * @private
   */
  #getCellsRankedByCandidates () {
    const candidatesList = this.#getCandidatesForAllEmptyCells()
    // Sort the cells based on the number of candidates (ascending).
    return candidatesList.sort((a, b) => a.candidates.length - b.candidates.length)
  }

  /**
   * Finds the first valid number that can be placed in a cell.
   *
   * @param {number} row - The row index.
   * @param {number} col - The column index.
   * @returns {number|null} - The first valid number or null if none found.
   * @private
   */
  #findFirstValidNumber (row, col) {
    // Try numbers 1 through 9.
    for (let num = 1; num <= 9; num++) {
      if (this.grid.checkIfCanPlaceNumber(row, col, num)) {
        return num // Return the first valid number found.
      }
    }

    return null // No valid number found.
  }

  /**
   * Finds candidates for all empty cells.
   *
   * @returns {Array} - Array of cells with their candidates.
   * @private
   */
  #getCandidatesForAllEmptyCells () {
    const candidatesList = []
    const emptyCells = this.grid.getAllEmptyPositions()

    emptyCells.forEach(({ row, col }) => {
      const candidates = this.#findCandidates(row, col)
      candidatesList.push({ row, col, candidates })
    })

    return candidatesList
  }

  /**
   * Finds all possible numbers that can be placed in a specific cell.
   *
   * @param {number} row - The row index.
   * @param {number} col - The column index.
   * @returns {number[]} - Array of possible numbers.
   * @private
   */
  #findCandidates (row, col) {
    const candidates = []

    // Check numbers 1 through 9.
    for (let num = 1; num <= 9; num++) {
      if (this.grid.checkIfCanPlaceNumber(row, col, num)) {
        candidates.push(num) // Add valid candidate.
      }
    }

    return candidates
  }
}
