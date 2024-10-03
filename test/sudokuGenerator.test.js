import SudokuGenerator from '../src/sudokuGenerator.js'

describe('SudokuGenerator', () => {
  let generator

  beforeEach(() => {
    generator = new SudokuGenerator()
  })

  test('should generate a complete Sudoku grid', () => {
    const completeGrid = generator.generateCompleteSudokuGrid()
    expect(completeGrid).toHaveLength(9)
    expect(completeGrid[0]).toHaveLength(9)
    completeGrid.forEach(row => row.forEach(cell => {
      expect(cell).toBeGreaterThanOrEqual(1)
      expect(cell).toBeLessThanOrEqual(9)
    }))
  })

  test('should generate an unfinished Sudoku grid with easy difficulty', () => {
    const unfinishedGrid = generator.generateUnfinishedSudokuGrid('easy')
    expect(unfinishedGrid).toHaveLength(9)
    expect(unfinishedGrid[0]).toHaveLength(9)

    // Check if grid has some empty cells.
    const emptyCells = unfinishedGrid.flat().filter(cell => cell === null)
    expect(emptyCells.length).toBeGreaterThan(0)

    // Ensure the grid is not fully complete.
    expect(emptyCells.length).toBeLessThan(81)
  })

  test('should generate an unfinished Sudoku grid with medium difficulty', () => {
    const unfinishedGrid = generator.generateUnfinishedSudokuGrid('medium')
    expect(unfinishedGrid).toHaveLength(9)
    expect(unfinishedGrid[0]).toHaveLength(9)

    const emptyCells = unfinishedGrid.flat().filter(cell => cell === null)
    expect(emptyCells.length).toBeGreaterThan(0)
    expect(emptyCells.length).toBeLessThan(81)
  })

  test('should generate an unfinished Sudoku grid with hard difficulty', () => {
    const unfinishedGrid = generator.generateUnfinishedSudokuGrid('hard')
    expect(unfinishedGrid).toHaveLength(9)
    expect(unfinishedGrid[0]).toHaveLength(9)

    const emptyCells = unfinishedGrid.flat().filter(cell => cell === null)
    expect(emptyCells.length).toBeGreaterThan(0)
    expect(emptyCells.length).toBeLessThan(81)
  })

  test('should generate different grids for different difficulties', () => {
    const easyGrid = generator.generateUnfinishedSudokuGrid('easy')
    const mediumGrid = generator.generateUnfinishedSudokuGrid('medium')
    const hardGrid = generator.generateUnfinishedSudokuGrid('hard')

    // Check that the number of empty cells varies with difficulty.
    const easyEmpty = easyGrid.flat().filter(cell => cell === null).length
    const mediumEmpty = mediumGrid.flat().filter(cell => cell === null).length
    const hardEmpty = hardGrid.flat().filter(cell => cell === null).length

    expect(easyEmpty).toBeLessThan(mediumEmpty)
    expect(mediumEmpty).toBeLessThan(hardEmpty)
  })
})
