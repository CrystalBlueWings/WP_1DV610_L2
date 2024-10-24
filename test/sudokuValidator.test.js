// sudokuValidator.test.js
import SudokuValidator from '../src/sudokuValidator.js'
import SudokuGenerator from '../src/sudokuGenerator.js'

describe('SudokuValidator', () => {
  test('should validate a correct Sudoku grid as valid', () => {
    const validGrid = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ]

    const validator = new SudokuValidator(validGrid)
    expect(validator.isValidGrid()).toBe(true)
  })

  test('should validate a grid with a row conflict as invalid', () => {
    // Only fill one row with a duplicate number.
    const gridWithRowConflict = [
      [1, 2, 3, 4, 5, 6, 7, 8, 1], // Duplicate '1' in the first row.
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null]
    ]

    const validator = new SudokuValidator(gridWithRowConflict)
    expect(validator.isValidGrid()).toBe(false)
  })

  test('should validate a grid with a column conflict as invalid', () => {
    // Only fill one column with a duplicate number.
    const gridWithColumnConflict = [
      [1, null, null, null, null, null, null, null, null],
      [1, null, null, null, null, null, null, null, null], // Duplicate '1' in the first column.
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null]
    ]

    const validator = new SudokuValidator(gridWithColumnConflict)
    expect(validator.isValidGrid()).toBe(false)
  })

  test('should validate a grid with a box conflict as invalid', () => {
    // Only fill one 3x3 box with a duplicate number
    const gridWithBoxConflict = [
      [1, 2, 3, null, null, null, null, null, null],
      [4, 5, 1, null, null, null, null, null, null], // Duplicate '1' in the top-left box
      [7, 8, 9, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null]
    ]

    const validator = new SudokuValidator(gridWithBoxConflict)
    expect(validator.isValidGrid()).toBe(false)
  })

  test('should validate a grid with no conflicts as valid', () => {
    // Minimal grid with numbers that do not conflict
    const validMinimalGrid = [
      [1, null, null, null, null, null, null, null, null],
      [null, 2, null, null, null, null, null, null, null],
      [null, null, 3, null, null, null, null, null, null],
      [null, null, null, 4, null, null, null, null, null],
      [null, null, null, null, 5, null, null, null, null],
      [null, null, null, null, null, 6, null, null, null],
      [null, null, null, null, null, null, 7, null, null],
      [null, null, null, null, null, null, null, 8, null],
      [null, null, null, null, null, null, null, null, 9]
    ]

    const validator = new SudokuValidator(validMinimalGrid)
    expect(validator.isValidGrid()).toBe(true)
  })

  test('should validate a grid with multiple conflicts as invalid', () => {
    const invalidGrid = [
      [5, 3, 5, 6, 7, 8, 9, 1, 2], // Duplicate '5' in the row and box.
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 9, 3, 4, 2, 5, 6, 7], // Duplicate '9' in the row and column.
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 7, 1], // Duplicate '7' in the column and box.
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ]

    const validator = new SudokuValidator(invalidGrid)
    expect(validator.isValidGrid()).toBe(false)
  })

  test('should throw an error for a grid with invalid numbers', () => {
    const invalidGrid = [
      [0, 3, 4, 6, 7, 8, 9, 1, 2], // '0' is invalid.
      [6, 10, 2, 1, 9, 5, 3, 4, 8], // '10' is invalid.
      [1, 9, 8, 3, -4, 2, 5, 6, 7], // '-4' is invalid.
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, '6', 8, 5, 3, 7, 9, 1], // '6' as a string.
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6.5, 1, 5, 3, 7, 2, 8, 4], // Decimal number.
      [2, 8, 7, 4, 1, 9, 6, null, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ]

    expect(() => {
      // eslint-disable-next-line no-new
      new SudokuValidator(invalidGrid)
    }).toThrow('Invalid grid: Cell at row 0, column 0 contains an invalid value.')
  })

  test('should validate a fully empty grid as valid', () => {
    const emptyGrid = Array.from({ length: 9 }, () => Array(9).fill(null))
    const validator = new SudokuValidator(emptyGrid)
    expect(validator.isValidGrid()).toBe(true)
  })

  test('should validate a grid with undefined values as valid if no violations exist', () => {
    const incompleteValidGrid = [
      [5, 3, undefined, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [undefined, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, undefined, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, undefined, 5, 3, 7, 9, 1],
      [7, 1, undefined, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, undefined, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, undefined, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, undefined, 7, 9]
    ]

    const validator = new SudokuValidator(incompleteValidGrid)
    expect(validator.isValidGrid()).toBe(true)
  })

  test('should validate dynamically generated grids as valid or invalid', () => {
    const generator = new SudokuGenerator()
    const dynamicGrid = generator.generateUnfinishedSudokuGrid('medium')
    const validator = new SudokuValidator(dynamicGrid)
    expect(validator.isValidGrid()).toBe(true)
  })

  test('should validate dynamically generated complete grids as valid', () => {
    const generator = new SudokuGenerator()
    const dynamicCompleteGrid = generator.generateCompleteSudokuGrid()
    const validator = new SudokuValidator(dynamicCompleteGrid)
    expect(validator.isValidGrid()).toBe(true)
  })

  test('should throw an error for a grid with invalid dimensions', () => {
    const invalidGrid = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [null, null, null, null, null, null, null, null, null]
      // Only 2 rows instead of 9.
    ]

    expect(() => {
      // eslint-disable-next-line no-new
      new SudokuValidator(invalidGrid)
    }).toThrow('Invalid grid: Grid must be a 9x9 array.')
  })

  test('should throw an error for a row with invalid length', () => {
    const invalidGrid = Array.from({ length: 9 }, () => Array(8).fill(null)) // Rows with length 8.

    expect(() => {
      // eslint-disable-next-line no-new
      new SudokuValidator(invalidGrid)
    }).toThrow('Invalid grid: Row 0 must be an array of length 9.')
  })

  test('should throw an error for a grid with invalid cell values', () => {
    const invalidGrid = Array.from({ length: 9 }, () => Array(9).fill(null))
    invalidGrid[0][0] = 'a' // Invalid value.

    expect(() => {
      // eslint-disable-next-line no-new
      new SudokuValidator(invalidGrid)
    }).toThrow('Invalid grid: Cell at row 0, column 0 contains an invalid value.')
  })

  test('should throw an error when grid is not an array', () => {
    const invalidGrid = 'Not an array'

    expect(() => {
      // eslint-disable-next-line no-new
      new SudokuValidator(invalidGrid)
    }).toThrow('Invalid grid: Grid must be a 9x9 array.')
  })
})
