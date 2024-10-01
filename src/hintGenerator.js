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
   * Returns the easiest hint in the entire grid (cell with the least number of candidates).
   * If multiple cells have the same number of candidates, a random one is chosen.
   *
   * @returns {object|null} - An object containing the row, col, and hint number, or null if no hint is available.
   */
  getEasiestHintInGrid () {
    const emptyCells = this.#findAllEmptyCells()
    return this.#findCellWithFewestCandidates(emptyCells)
  }

  /**
   * Returns the hardest hint in the entire grid (cell with the most number of candidates).
   * If multiple cells have the same number of candidates, a random one is chosen.
   *
   * @returns {object|null} - An object containing the row, col, and hint number, or null if no hint is available.
   */
  getHardestHintInGrid () {
    const emptyCells = this.#findAllEmptyCells()
    return this.#findCellWithMostCandidates(emptyCells)
  }

  /**
   * Returns the easiest hint in a specified 3x3 box.
   * If multiple cells have the same number of candidates, a random one is chosen.
   *
   * @param {number} boxRow - The row index of the box (0-2).
   * @param {number} boxCol - The column index of the box (0-2).
   * @returns {object|null} - An object containing the row, col, and hint number, or null if no hint is available.
   */
  getEasiestHintInBox (boxRow, boxCol) {
    const emptyCells = this.#findEmptyCellsInBox(boxRow, boxCol)
    return this.#findCellWithFewestCandidates(emptyCells)
  }

  /**
   * Returns a hint for a specific cell.
   *
   * @param {number} row - The row index for the cell (0-8).
   * @param {number} col - The column index for the cell (0-8).
   * @returns {number|null} - The correct number for the specified cell, or null if no hint is available.
   */
  getHintForSpecificCell (row, col) {
    return this.getHintForCell(row, col)
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
    let easiestHints = [] // Array to store cells with the minimum number of candidates.
    let fewestCandidatesCount = 10 // Set initial value higher than possible candidates (1-9) for a cell.

    emptyCells.forEach(({ row, col }) => {
      const candidates = this.#findCandidates(row, col)

      // If the cell has fewer candidates than the current fewest, update the easiestHints array.
      if (candidates.length < fewestCandidatesCount) {
        // Found a new easiest hint, reset the array.
        fewestCandidatesCount = candidates.length
        easiestHints = [{ row, col, hint: candidates[0] }]
      } else if (candidates.length === fewestCandidatesCount) {
        // Add to array if it has the same number of candidates as the current minimum.
        easiestHints.push({ row, col, hint: candidates[0] })
      }
    })

    // Randomly choose a hint from the easiestHints array if there are multiple hints.
    return easiestHints.length > 0 ? easiestHints[Math.floor(Math.random() * easiestHints.length)] : null
  }

  /**
   * Finds the cell with the most candidates (possible numbers that can be placed in the cell).
   * This helps to find the hardest cell to solve.
   *
   * @param {Array} emptyCells - An array of empty cells with their coordinates.
   * @returns {object|null} - An object containing the row, col, and hint number, or null if no cell can be found.
   * @private
   */
  #findCellWithMostCandidates (emptyCells) {
    let hardestHints = []
    let mostCandidatesCount = 0 // Lower than the possible number of candidates (1-9).

    emptyCells.forEach(({ row, col }) => {
      const candidates = this.#findCandidates(row, col)

      if (candidates.length > mostCandidatesCount) {
        // Found a new hardest hint, reset the array.
        mostCandidatesCount = candidates.length
        hardestHints = [{ row, col, hint: candidates[0] }]
      } else if (candidates.length === mostCandidatesCount) {
        // Add to array if it has the same number of candidates as the current maximum.
        hardestHints.push({ row, col, hint: candidates[0] })
      }
    })

    // Randomly choose a hint from the hardestHints array if there are multiple hints.
    return hardestHints.length > 0 ? hardestHints[Math.floor(Math.random() * hardestHints.length)] : null
  }

  /**
   * Finds all empty cells in a specified 3x3 box and returns their coordinates.
   *
   * @param {number} boxRow - The row index of the box (0-2).
   * @param {number} boxCol - The column index of the box (0-2).
   * @returns {Array} - An array of objects containing row and col for each empty cell in the box.
   * @private
   */
  #findEmptyCellsInBox (boxRow, boxCol) {
    const emptyCells = []
    const startRow = boxRow * 3
    const startCol = boxCol * 3

    // Iterate over the cells in the 3x3 box.
    for (let row = startRow; row < startRow + 3; row++) {
      for (let col = startCol; col < startCol + 3; col++) {
        if (this.grid.isCellEmpty(row, col)) {
          emptyCells.push({ row, col })
        }
      }
    }
    return emptyCells
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
