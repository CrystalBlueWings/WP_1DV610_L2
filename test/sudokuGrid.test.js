import SudokuGrid from '../src/sudokuGrid.js'
import SudokuGenerator from '../src/sudokuGenerator.js'
import SudokuValidator from '../src/sudokuValidator.js'

describe.each([
  ['Static Grid', () => {
    // Initialize a sample static Sudoku grid.
    const staticGrid = [
      [5, 3, null, null, 7, null, null, null, null],
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9]
    ]
    return new SudokuGrid(staticGrid)
  }],
  ['Dynamic Grid', () => {
    // Generate a dynamic unfinished Sudoku grid.
    const generator = new SudokuGenerator()
    const dynamicGrid = generator.generateUnfinishedSudokuGrid('medium')
    return new SudokuGrid(dynamicGrid)
  }]
])('SudokuGrid with %s', (name, getGridInstance) => {
  let gridInstance

  beforeEach(() => {
    gridInstance = getGridInstance()
  })

  test('should find the first empty position', () => {
    const emptyPosition = gridInstance.findEmptyPosition()
    if (emptyPosition) {
      const { row, col } = emptyPosition
      expect(gridInstance.isCellEmpty(row, col)).toBe(true)
    } else {
      // If no empty positions, grid is complete.
      expect(gridInstance.getAllEmptyPositions().length).toBe(0)
    }
  })

  test('should retrieve all empty positions', () => {
    const emptyPositions = gridInstance.getAllEmptyPositions()
    emptyPositions.forEach(({ row, col }) => {
      expect(gridInstance.isCellEmpty(row, col)).toBe(true)
    })
  })

  test('should retrieve all empty cells in a box', () => {
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const emptyCells = gridInstance.getEmptyCellsInBox(boxRow, boxCol)
        emptyCells.forEach(({ row, col }) => {
          expect(Math.floor(row / 3)).toBe(boxRow)
          expect(Math.floor(col / 3)).toBe(boxCol)
          expect(gridInstance.isCellEmpty(row, col)).toBe(true)
        })
      }
    }
  })

  test('should check if a cell is empty', () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const isEmpty = gridInstance.isCellEmpty(row, col)
        const expected = gridInstance.sudokuGrid[row][col] === null
        expect(isEmpty).toBe(expected)
      }
    }
  })

  test('should place a number in the grid', () => {
    const emptyPosition = gridInstance.findEmptyPosition()
    if (emptyPosition) {
      const { row, col } = emptyPosition
      const num = 5 // Arbitrary number for testing.
      gridInstance.placeNumber(row, col, num)
      expect(gridInstance.isCellEmpty(row, col)).toBe(false)
      expect(gridInstance.sudokuGrid[row][col]).toBe(num)
    } else {
      // If no empty positions, grid is complete.
      expect(gridInstance.getAllEmptyPositions().length).toBe(0)
    }
  })

  test('should remove a number from the grid', () => {
    // Find a non-empty cell to remove a number from.
    let found = false
    for (let row = 0; row < 9 && !found; row++) {
      for (let col = 0; col < 9 && !found; col++) {
        if (!gridInstance.isCellEmpty(row, col)) {
          const originalValue = gridInstance.sudokuGrid[row][col]
          gridInstance.removeNumber(row, col)
          expect(gridInstance.isCellEmpty(row, col)).toBe(true)
          expect(gridInstance.sudokuGrid[row][col]).toBe(null)
          // Restore the original value.
          gridInstance.placeNumber(row, col, originalValue)
          found = true
        }
      }
    }
    // If no non-empty cells found, the grid is empty.
    if (!found) {
      expect(gridInstance.getAllEmptyPositions().length).toBe(81)
    }
  })

  test('should check if a number can be placed in a cell', () => {
    const emptyPosition = gridInstance.findEmptyPosition()
    if (emptyPosition) {
      const { row, col } = emptyPosition
      for (let num = 1; num <= 9; num++) {
        const canPlace = gridInstance.checkIfCanPlaceNumber(row, col, num)
        // Temporarily place the number to check validity.
        gridInstance.placeNumber(row, col, num)
        const validator = new SudokuValidator(gridInstance.sudokuGrid)
        const isValid = validator.isValidGrid()
        // Remove the number.
        gridInstance.removeNumber(row, col)
        expect(canPlace).toBe(isValid)
      }
    } else {
      // If no empty positions, grid is complete.
      expect(gridInstance.getAllEmptyPositions().length).toBe(0)
    }
  })
})
