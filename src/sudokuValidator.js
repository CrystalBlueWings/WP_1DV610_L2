/**
 * Class responsible for validating Sudoku grids.
 */
export default class SudokuValidator {
  /**
   * Initializes the SudokuValidator with a given grid.
   *
   * @param {number[][]} sudokuGrid - A 9x9 Sudoku grid.
   * @throws {Error} - Throws an error if the grid is invalid.
   */
  constructor (sudokuGrid) {
    this.#validateInputGrid(sudokuGrid)
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
   * Validates the input grid structure and content.
   *
   * @param {any} sudokuGrid - The grid to validate.
   * @throws {Error} - Throws an error if the grid is invalid.
   * @private
   */
  #validateInputGrid (sudokuGrid) {
    if (!Array.isArray(sudokuGrid) || sudokuGrid.length !== 9) {
      throw new Error('Invalid grid: Grid must be a 9x9 array.')
    }

    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      const row = sudokuGrid[rowIndex]
      if (!Array.isArray(row) || row.length !== 9) {
        throw new Error(`Invalid grid: Row ${rowIndex} must be an array of length 9.`)
      }
      for (let colIndex = 0; colIndex < 9; colIndex++) {
        const value = row[colIndex]
        if (
          value !== null &&
          value !== undefined &&
          (
            typeof value !== 'number' ||
            Number.isNaN(value) ||
            !Number.isInteger(value) ||
            value < 1 ||
            value > 9
          )
        ) {
          throw new Error(
            `Invalid grid: Cell at row ${rowIndex}, column ${colIndex} contains an invalid value.`
          )
        }
      }
    }
  }

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
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      const row = this.#getRow(rowIndex) // Retrieve the current row.
      if (!this.#isUnitValid(row)) { // Check if the row is valid.
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
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const column = this.#getColumn(colIndex) // Retrieve the current column.
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
    for (const value of unit) {
      if (value !== null && value !== undefined) { // Ignore empty cells.
        if (numbersInUnit.has(value)) {
          return false // The unit is invalid due to a duplicate number.
        }
        numbersInUnit.add(value) // Add the number to the set of numbers in the unit.
      }
    }
    return true // No duplicates found; the unit is valid.
  }

  /**
   * Retrieves a row from the grid.
   *
   * @param {number} rowIndex - The index of the row (0-8).
   * @returns {number[]} - The row as an array.
   * @private
   */
  #getRow (rowIndex) {
    return this.grid[rowIndex] // Return the row at the specified index.
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
