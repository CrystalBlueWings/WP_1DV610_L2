import SudokuGenerator from '../src/sudokuGenerator.js'
import SudokuSolver from '../src/sudokuSolver.js'
import SudokuValidator from '../src/sudokuValidator.js'

describe('SudokuGenerator', () => {
  let generator

  beforeEach(() => {
    generator = new SudokuGenerator()
  })

  afterEach(() => {
    jest.restoreAllMocks() // Restore mocks after each test to avoid side effects.
  })

  test('should generate a valid complete Sudoku grid', () => {
    const completeGrid = generator.generateCompleteSudokuGrid()
    const validator = new SudokuValidator(completeGrid)
    expect(validator.isValidGrid()).toBe(true) // Ensure the grid is valid.
  })

  test('should generate a complete Sudoku grid with correct dimensions', () => {
    const completeGrid = generator.generateCompleteSudokuGrid()
    expect(completeGrid).toHaveLength(9)
    expect(completeGrid[0]).toHaveLength(9)
  })

  test('should generate a complete Sudoku grid filled with valid numbers', () => {
    const completeGrid = generator.generateCompleteSudokuGrid()
    completeGrid.forEach(row => {
      row.forEach(cell => {
        expect(cell).toBeGreaterThanOrEqual(1)
        expect(cell).toBeLessThanOrEqual(9)
      })
    })
  })

  test('should generate an unfinished Sudoku grid with easy difficulty and have empty cells', () => {
    const unfinishedGrid = generator.generateUnfinishedSudokuGrid('easy')
    const emptyCells = unfinishedGrid.flat().filter(cell => cell === null)

    expect(unfinishedGrid).toHaveLength(9)
    expect(unfinishedGrid[0]).toHaveLength(9)
    expect(emptyCells.length).toBeGreaterThan(0) // Check if grid has some empty cells
    expect(emptyCells.length).toBeLessThan(81) // Ensure the grid is not fully complete
  })

  test('should generate an unfinished Sudoku grid with medium difficulty', () => {
    const unfinishedGrid = generator.generateUnfinishedSudokuGrid('medium')
    const emptyCells = unfinishedGrid.flat().filter(cell => cell === null)

    expect(unfinishedGrid).toHaveLength(9)
    expect(unfinishedGrid[0]).toHaveLength(9)
    expect(emptyCells.length).toBeGreaterThan(0)
    expect(emptyCells.length).toBeLessThan(81)
  })

  test('should generate an unfinished Sudoku grid with hard difficulty', () => {
    const unfinishedGrid = generator.generateUnfinishedSudokuGrid('hard')
    const emptyCells = unfinishedGrid.flat().filter(cell => cell === null)

    expect(unfinishedGrid).toHaveLength(9)
    expect(unfinishedGrid[0]).toHaveLength(9)
    expect(emptyCells.length).toBeGreaterThan(0)
    expect(emptyCells.length).toBeLessThan(81)
  })

  test('should generate different grids for each difficulty level', () => {
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

  test('should throw an error if the generated puzzle is unsolvable', () => {
    jest.setTimeout(10000) // Increase timeout to 10 seconds

    // Mock the countSolutions method to simulate an unsolvable grid.
    jest.spyOn(SudokuSolver.prototype, 'countSolutions').mockReturnValue(0) // Simulate unsolvable grid.

    // Create a generator with reduced maxAttempts and maxTime for testing.
    const testGenerator = new SudokuGenerator(5, 1000)

    expect(() => testGenerator.generateUnfinishedSudokuGrid('medium')).toThrow(
      'Maximum attempts reached. Could not generate a valid grid.'
    )
  })

  test('should generate an unfinished Sudoku grid within time limit', async () => {
    jest.setTimeout(5000) // Set timeout for this test.
    const unfinishedGrid = generator.generateUnfinishedSudokuGrid('medium')
    expect(unfinishedGrid).toBeDefined()
  })
})
