import SudokuGrid from '../src/sudokuGrid.js'
import SudokuGenerator from '../src/sudokuGenerator.js'
import SudokuValidator from '../src/sudokuValidator.js'

describe('SudokuGrid', () => {
  let gridInstance
  let grid

  beforeEach(() => {
    const generator = new SudokuGenerator()
    grid = generator.generateUnfinishedSudokuGrid() // Generate a random, unfinished Sudoku grid.
    gridInstance = new SudokuGrid(grid)
  })

  // Set a timeout for tests that might take longer.
  jest.setTimeout(10000) // 10 seconds.

  test('should find the first empty position', () => {
    const emptyPosition = gridInstance.findEmptyPosition()
    if (emptyPosition) {
      const { row, col } = emptyPosition
      expect(gridInstance.isCellEmpty(row, col)).toBe(true)
    } else {
      expect(gridInstance.isComplete()).toBe(true) // Grid is full.
    }
  })

  test('should get all empty positions', () => {
    const emptyPositions = gridInstance.getAllEmptyPositions()
    emptyPositions.forEach(({ row, col }) => {
      expect(gridInstance.isCellEmpty(row, col)).toBe(true)
    })
  })

  test('should get empty cells in a specific box', () => {
    const boxRow = Math.floor(Math.random() * 3)
    const boxCol = Math.floor(Math.random() * 3)
    const emptyCells = gridInstance.getEmptyCellsInBox(boxRow, boxCol)
    emptyCells.forEach(({ row, col }) => {
      expect(Math.floor(row / 3)).toBe(boxRow)
      expect(Math.floor(col / 3)).toBe(boxCol)
      expect(gridInstance.isCellEmpty(row, col)).toBe(true)
    })
  })

  test('should check if a cell is empty', () => {
    const row = Math.floor(Math.random() * 9)
    const col = Math.floor(Math.random() * 9)
    const isEmpty = gridInstance.isCellEmpty(row, col)
    if (grid[row][col] === null) {
      expect(isEmpty).toBe(true)
    } else {
      expect(isEmpty).toBe(false)
    }
  })

  test('should place and remove a number in the grid', () => {
    const emptyPosition = gridInstance.findEmptyPosition()
    if (emptyPosition) {
      const { row, col } = emptyPosition
      const num = Math.floor(Math.random() * 9) + 1
      if (gridInstance.checkIfCanPlaceNumber(row, col, num)) {
        gridInstance.placeNumber(row, col, num)
        expect(gridInstance.isCellEmpty(row, col)).toBe(false)
        expect(gridInstance.sudokuGrid[row][col]).toBe(num)

        gridInstance.removeNumber(row, col)
        expect(gridInstance.isCellEmpty(row, col)).toBe(true)
        expect(gridInstance.sudokuGrid[row][col]).toBe(null)
      }
    } else {
      expect(gridInstance.isComplete()).toBe(true)
    }
  })

  test('should check if a number can be placed in a cell', () => {
    const emptyPosition = gridInstance.findEmptyPosition()
    if (emptyPosition) {
      const { row, col } = emptyPosition
      for (let num = 1; num <= 9; num++) {
        const canPlace = gridInstance.checkIfCanPlaceNumber(row, col, num)
        gridInstance.placeNumber(row, col, num) // Temporarily place the number to check validity.
        const validator = new SudokuValidator(gridInstance.sudokuGrid)
        const isValid = validator.isValidGrid()
        gridInstance.removeNumber(row, col)

        expect(canPlace).toBe(isValid)
      }
    } else {
      expect(gridInstance.isComplete()).toBe(true)
    }
  })
})
