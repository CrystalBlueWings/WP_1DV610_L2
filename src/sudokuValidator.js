/**
 * Class responsible for validating Sudoku grids.
 */
export default class SudokuValidator {
  /**
   * Initializes the SudokuValidator with a given grid.
   *
   * @param {number[][]} sudokuGrid - A 9x9 Sudoku grid.
   */
  constructor (sudokuGrid) {
    this.grid = sudokuGrid
  }

  /**
   * Checks if the entire Sudoku grid is valid according to Sudoku rules.
   *
   * @returns {boolean} - True if the grid is valid, false otherwise.
   */
  isValidGrid () {
    return this.#validateGrid()
  }

  /* Private Methods */

  /**
   * Validates the entire grid by checking rows, columns, and boxes.
   *
   * @returns {boolean} - True if the grid is valid, false otherwise.
   * @private
   */
  #validateGrid () {
    return (
      this.#areRowsValid() &&
      this.#areColumnsValid() &&
      this.#areBoxesValid()
    ) // The grid is valid only if all rows, columns, and boxes are valid.
  }

  /**
   * Validates all rows in the grid.
   *
   * @returns {boolean} - True if all rows are valid.
   * @private
   */
  #areRowsValid () {
    for (let row = 0; row < 9; row++) { // Check if the current row is valid.
      if (!this.#isUnitValid(this.grid[row])) {
        return false // Return false if an invalid row is found.
      }
    }
    return true // All rows are valid.
  }

  /**
   * Validates all columns in the grid.
   *
   * @returns {boolean} - True if all columns are valid.
   * @private
   */
  #areColumnsValid () {
    for (let col = 0; col < 9; col++) {
      const column = this.#getColumn(col) // Retrieve the current column.
      if (!this.#isUnitValid(column)) { // Check if the column is valid.
        return false // Return false if an invalid column is found.
      }
    }
    return true // All columns are valid.
  }

  /**
   * Validates all 3x3 boxes in the grid.
   *
   * @returns {boolean} - True if all boxes are valid.
   * @private
   */
  #areBoxesValid () {
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const box = this.#getBox(boxRow, boxCol) // Retrieve the current 3x3 box.
        if (!this.#isUnitValid(box)) { // Check if the box is valid.
          return false // Return false if an invalid box is found.
        }
      }
    }
    return true // All boxes are valid.
  }

  /**
   * Checks if a unit (row, column, or box) is valid.
   *
   * @param {number[]} unit - An array of 9 numbers representing a unit.
   * @returns {boolean} - True if the unit is valid.
   * @private
   */
  #isUnitValid (unit) {
    const numbersInUnit = new Set() // Initialize a set to keep track of numbers in the unit.
    for (const number of unit) {
      if (number !== null) { // Ignore empty cells.
        if (numbersInUnit.has(number)) { // If the number is already in the set, it's a duplicate.
          return false // The unit is invalid due to a duplicate number.
        }
        numbersInUnit.add(number) // Add the number to the set of numbers in the unit.
      }
    }
    return true // No duplicates found; the unit is valid.
  }

  /**
   * Retrieves a column from the grid.
   *
   * @param {number} colIndex - The index of the column.
   * @returns {number[]} - The column as an array.
   * @private
   */
  #getColumn (colIndex) {
    const column = []
    for (let row = 0; row < 9; row++) {
      column.push(this.grid[row][colIndex]) // Add the value from each row at the specified column index.
    }
    return column // Return the assembled column array.
  }

  /**
   * Retrieves a 3x3 box from the grid.
   *
   * @param {number} boxRow - The box row index (0-2).
   * @param {number} boxCol - The box column index (0-2).
   * @returns {number[]} - The box as a flat array.
   * @private
   */
  #getBox (boxRow, boxCol) {
    const box = []
    // Calculate the starting indices for the box.
    const startRow = boxRow * 3
    const startCol = boxCol * 3

    for (let row = startRow; row < startRow + 3; row++) {
      for (let col = startCol; col < startCol + 3; col++) {
        box.push(this.grid[row][col]) // Add each cell within the 3x3 box to the array.
      }
    }
    return box // Return the assembled box array.
  }
}
