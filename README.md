
# SudokuSolver Library

## Description
`SudokuSolver` is a library written in `JavaScript` that helps to generate, solve, and validate Sudoku puzzles. It includes classes for creating complete and incomplete grids, generating hints, and solving and validating grids according to standard Sudoku rules.

## Installation
1. Clone or download this repository.
2. Install the dependencies:
   ```bash
   npm install sudoku-solver
   ```

## Usage

Example of how to use the SudokuSolver module to generate and solve a Sudoku puzzle:

    import SudokuGenerator from './src/sudokuGenerator.js'
    import SudokuSolver from './src/sudokuSolver.js'

    // Create a generator and generate an incomplete Sudoku grid.
    const generator = new SudokuGenerator()
    const unfinishedGrid = generator.generateUnfinishedSudokuGrid('medium')

    // Create a solver and solve the grid.
    const solver = new SudokuSolver(unfinishedGrid)
    solver.solveGrid()
    console.log(solver.grid.sudokuGrid)
    
## Test Reports

All tests for the module were run using Jest and verified as passing, with the exception of the commented-out tests in `sudokuGenerator.test.js.`. See `testrapport.md` for detailed results.

## Bugs / Issues

Testing of the `SudokuGenerator` class led to an infinity loop of generated code. The issue seems to arise when a complete Sudoku puzzle is reduced to a solvable, incomplete puzzle. It is likely that the logic for this function does not ensure that the result is a solvable puzzle, causing an error. Additionally, it may be generating an infinite number of puzzles without limitation, which is a bug that needs fixing in the next version of this library.

## Dependencies

* jest: For testing.
* jest-extended and jest-chain: To extend Jest's functionality.
* Node.js version 20.6.0 or later.

## License

This project is licensed under the MIT license. For more information, see the LICENSE file.

## Contribution

If you wish to contribute to the project or report bugs, please open a pull request or create an issue in the GitHub repository.

## Disclaimer

This module is still in development and was created as part of a school assignment. As there are some issues with `sudokuGenerator.js`, it is not yet ready for production use. Use with caution.