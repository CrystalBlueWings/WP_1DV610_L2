import SudokuGrid from '../src/sudokuGrid'

describe('SudokuGrid', () => {
  let grid

  beforeEach(() => {
    // Ett exempelgrid som används i varje test (genererat mha ChatGPT).
    grid = new SudokuGrid([
      [5, 3, null, null, 7, null, null, null, null],
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9]
    ])
  })

  test('should find the first empty position', () => {
    const emptyPosition = grid.findEmptyPosition()
    expect(emptyPosition).toEqual({ row: 0, col: 2 }) // Första tomma cellen finns på position (0, 2)
  })

  test('should check if a cell is empty', () => {
    expect(grid.isCellEmpty(0, 2)).toBe(true) // Cell (0, 2) är tom
    expect(grid.isCellEmpty(0, 0)).toBe(false) // Cell (0, 0) är inte tom
  })

  test('should place a number in the grid', () => {
    grid.placeNumber(0, 2, 4)
    expect(grid.isCellEmpty(0, 2)).toBe(false) // Cell är inte tom längre
    expect(grid.sudokuGrid[0][2]).toBe(4) // Nummer 4 ska vara placerad i cell (0, 2)
  })

  test('should remove a number from the grid', () => {
    grid.placeNumber(0, 2, 4)
    grid.removeNumber(0, 2)
    expect(grid.isCellEmpty(0, 2)).toBe(true) // Cell är tom igen
    expect(grid.sudokuGrid[0][2]).toBe(null) // Nummer tas bort från cell (0, 2)
  })

  test('should check if a number can be placed in a cell', () => {
    expect(grid.checkIfCanPlaceNumber(0, 2, 4)).toBe(true) // Nummer 4 kan placeras
    expect(grid.checkIfCanPlaceNumber(0, 2, 5)).toBe(false) // Nummer 5 kan inte placeras då den redan finns i raden
  })
})
