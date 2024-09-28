/**
 * Represents a Sudoku grid and provides methods for grid manipulation and validation.
 */
export default class SudokuGrid {
  /**
   * Initializes the Sudoku grid.
   *
   * @param {number[][]} sudokuGrid - A 9x9 matrix where each element is a number (1-9) or null for empty cells.
   */
  constructor (sudokuGrid) {
    this.sudokuGrid = sudokuGrid // Assigns the Sudoku grid (sudokuGrid) to an instance variable (this.sudokuGrid) for this specific instance.
  }

  /**
   * Finds the next empty cell in the Sudoku grid and returns its coordinates (row, col).
   *
   * @returns {object|null} - An object containing the coordinates of the empty cell ({ row, col }) or null if no empty cell is found.
   */
  findEmptyPosition () {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.isCellEmpty(row, col)) {
          return { row, col }
        }
      }
    }
    return null // Returns null if no empty cell is found.
  }

  /**
   * Checks if a specific cell in the Sudoku grid is empty.
   *
   * @param {number} row - The row index of the cell.
   * @param {number} col - The column index of the cell.
   * @returns {boolean} - True if the cell is empty, false otherwise.
   */
  isCellEmpty (row, col) {
    return this.sudokuGrid[row][col] === null
  }

  /**
   * Places a number in a specific cell in the Sudoku grid.
   *
   * @param {number} row - The row index where the number will be placed.
   * @param {number} col - The column index where the number will be placed.
   * @param {number} num - The number to be placed in the cell (1-9).
   */
  placeNumber (row, col, num) {
    this.sudokuGrid[row][col] = num
  }

  /**
   * Removes a number from a specific cell in the Sudoku grid.
   *
   * @param {number} row - The row index of the cell.
   * @param {number} col - The column index of the cell.
   */
  removeNumber (row, col) {
    this.sudokuGrid[row][col] = null
  }

  /**
   * Checks if a number can be placed in a specific cell without violating Sudoku rules.
   *
   * @param {number} row - The row index for the placement.
   * @param {number} col - The column index for the placement.
   * @param {number} num - The number to be placed in the cell (1-9).
   * @returns {boolean} - True if the number can be placed in the cell, false otherwise.
   */
  checkIfCanPlaceNumber (row, col, num) {
    return (
      this.#isRowValid(row, num) &&
      this.#isColumnValid(col, num) &&
      this.#isBoxValid(row, col, num)
    )
  }

  /* Private methods for validation */

  /* Kontrollerar om ett nummer är giltigt i en viss position (dvs om det inte bryter mot reglerna för rader, kolumner och boxar). */

  /**
   * Checks if a row is valid for a given number.
   * Iterates through the columns for that specific row to see if the number is already there.
   *
   * @param {number} row - The row index to validate.
   * @param {number} num - The number to be placed in the row.
   * @returns {boolean} - True if the row is valid for the number, false otherwise.
   * @private
   */
  #isRowValid (row, num) {
    for (let col = 0; col < 9; col++) { // Iterates through all columns in the specific row.
      if (this.sudokuGrid[row][col] === num) {
        return false
      }
    }
    return true
  }

  /**
   * Checks if a column is valid for a given number.
   * Iterates through the rows for that specific column to see if the number is already there.
   *
   * @param {number} col - The column index to validate.
   * @param {number} num - The number to be placed in the column.
   * @returns {boolean} - True if the column is valid for the number, false otherwise.
   * @private
   */
  #isColumnValid (col, num) {
    for (let row = 0; row < 9; row++) { // Iterates through all rows in the specific column.
      if (this.sudokuGrid[row][col] === num) {
        return false
      }
    }
    return true
  }

  /**
   * Checks if a 3x3 box is valid for a given number.
   *
   * @param {number} row - The row index for the placement.
   * @param {number} col - The column index for the placement.
   * @param {number} num - The number to be placed in the 3x3 box.
   * @returns {boolean} - True if the 3x3 box is valid for the number, false otherwise.
   * @private
   */
  #isBoxValid (row, col, num) {
    const boxRowStart = Math.floor(row / 3) * 3
    const boxColStart = Math.floor(col / 3) * 3

    // Iterates through all cells in the 3x3 box.
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.sudokuGrid[boxRowStart + i][boxColStart + j] === num) {
          return false
        }
      }
    }
    return true // If no conflicts are found, the number can be placed in the 3x3 box.
  }
}
