/**
 * Represents a Sudoku grid and provides methods for grid manipulation and validation.
 */
export default class SudokuGrid {
  /**
   * Initializes the Sudoku grid.
   *
   * @param {number[][]} sudokuGrid - A 9x9 matrix representing the Sudoku puzzle, where each element is a number (1-9) or null for empty cells.
   */
  constructor (sudokuGrid) {
    this.sudokuGrid = sudokuGrid // Assigns the Sudoku grid (sudokuGrid) to an instance variable (this.sudokuGrid) for this specific instance.
  }

  /**
   * Finds the first empty cell in the Sudoku grid and returns its coordinates (row, col).
   *
   * @returns {object|null} - An object containing the coordinates of the empty cell ({ row, col }) or null if no empty cell is found.
   */
  findEmptyPosition () {
    return this.#getFirstEmptyPosition()
  }

  /**
   * Retrieves all empty positions in the Sudoku grid.
   *
   * @returns {Array} - An array of objects containing row and col for each empty cell.
   */
  getAllEmptyPositions () {
    return this.#getAllEmptyCells()
  }

  /**
   * Retrieves all empty cells in a specific 3x3 box.
   *
   * @param {number} boxRow - The row index of the box (0-2).
   * @param {number} boxCol - The column index of the box (0-2).
   * @returns {Array} - An array of objects containing row and col for each empty cell in the box.
   */
  getEmptyCellsInBox (boxRow, boxCol) {
    return this.#getEmptyCellsInBox(boxRow, boxCol)
  }

  /**
   * Checks if a specific cell in the Sudoku grid is empty.
   *
   * @param {number} row - The row index of the cell.
   * @param {number} col - The column index of the cell.
   * @returns {boolean} - True if the cell is empty, false otherwise.
   */
  isCellEmpty (row, col) {
    return this.#isCellEmpty(row, col)
  }

  /**
   * Places a number in a specific cell in the Sudoku grid.
   *
   * @param {number} row - The row index where the number will be placed.
   * @param {number} col - The column index where the number will be placed.
   * @param {number} num - The number to be placed in the cell (1-9).
   */
  placeNumber (row, col, num) {
    this.#placeNumber(row, col, num)
  }

  /**
   * Removes a number from a specific cell in the Sudoku grid.
   *
   * @param {number} row - The row index of the cell.
   * @param {number} col - The column index of the cell.
   */
  removeNumber (row, col) {
    this.#removeNumber(row, col)
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
    return this.#isPlacementValid(row, col, num)
  }

  /* Private methods */

  /**
   * Finds the first empty cell in the grid.
   *
   * @returns {object|null} - Coordinates of the empty cell or null if none found.
   * @private
   */
  #getFirstEmptyPosition () {
    const emptyPositions = this.#getAllEmptyCells()
    return emptyPositions.length > 0 ? emptyPositions[0] : null // Return the first empty position if available.
  }

  /**
   * Retrieves all empty cells in the grid.
   *
   * @returns {Array} - Array of empty cell coordinates.
   * @private
   */
  #getAllEmptyCells () {
    const emptyPositions = []

    // Iterate over all rows and columns.
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.#isCellEmpty(row, col)) {
          emptyPositions.push({ row, col })
        }
      }
    }

    return emptyPositions
  }

  /**
   * Retrieves all empty cells within a specific 3x3 box.
   *
   * @param {number} boxRow - The row index of the box.
   * @param {number} boxCol - The column index of the box.
   * @returns {Array} - Array of empty cell coordinates in the box.
   * @private
   */
  #getEmptyCellsInBox (boxRow, boxCol) {
    const emptyCells = []
    const startRow = boxRow * 3
    const startCol = boxCol * 3

    // Iterate over the 3x3 box.
    for (let row = startRow; row < startRow + 3; row++) {
      for (let col = startCol; col < startCol + 3; col++) {
        if (this.#isCellEmpty(row, col)) {
          emptyCells.push({ row, col })
        }
      }
    }

    return emptyCells
  }

  /**
   * Checks if a cell is empty.
   *
   * @param {number} row - The row index.
   * @param {number} col - The column index.
   * @returns {boolean} - True if empty, false otherwise.
   * @private
   */
  #isCellEmpty (row, col) {
    return this.sudokuGrid[row][col] === null // Check if the cell contains null, which means that it's empty.
  }

  /**
   * Places a number in the grid at the specified location.
   *
   * @param {number} row - The row index.
   * @param {number} col - The column index.
   * @param {number} num - The number to place.
   * @private
   */
  #placeNumber (row, col, num) {
    this.sudokuGrid[row][col] = num // Place the number in the grid.
  }

  /**
   * Removes a number from the grid at the specified location.
   *
   * @param {number} row - The row index.
   * @param {number} col - The column index.
   * @private
   */
  #removeNumber (row, col) {
    this.sudokuGrid[row][col] = null // Set the cell to null to indicate that it's empty.
  }

  /**
   * Checks if placing a number at a specific location is valid.
   *
   * @param {number} row - The row index.
   * @param {number} col - The column index.
   * @param {number} num - The number to place.
   * @returns {boolean} - True if valid, false otherwise.
   * @private
   */
  #isPlacementValid (row, col, num) {
    // Check row, column, and box validity.
    return (
      this.#isRowValid(row, num) &&
      this.#isColumnValid(col, num) &&
      this.#isBoxValid(row, col, num)
    )
  }

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
    // Iterate through the row to check for duplicates.
    for (let col = 0; col < 9; col++) {
      if (this.sudokuGrid[row][col] === num) {
        return false // Duplicate found.
      }
    }

    return true // No duplicates found.
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
    // Iterate through the column to check for duplicates.
    for (let row = 0; row < 9; row++) {
      if (this.sudokuGrid[row][col] === num) {
        return false // Duplicate found.
      }
    }

    return true // No duplicates found.
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

    // Iterate through all cells in the 3x3 box.
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.sudokuGrid[boxRowStart + i][boxColStart + j] === num) {
          return false // Duplicate found.
        }
      }
    }

    return true // If no duplicates are found, the number can be placed in the 3x3 box.
  }
}
