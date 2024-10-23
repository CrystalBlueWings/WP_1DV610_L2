
# SudokuSolver Library

## Disclaimer

This module is still in development and was created as part of a school assignment.

## Description

`SudokuSolver` is a library written in `JavaScript` that helps to generate, solve, and validate classic Sudoku puzzles with 9x9 cell grids. It includes classes for creating complete and incomplete grids, generating hints, and solving and validating grids according to standard Sudoku rules.

## Installation

1. Clone or download this repository through GitHub.
2. Install the dependencies as npm package:

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

All tests for the module were run using Jest and verified as passing. See `testreport.md` for detailed results.

## Bugs / Issues

Testing of the `SudokuGenerator` class previously led to an infinity loop of generated code. The issue is solved in this version of the project.

## Version

1.1.0

## Dependencies

* Node.js version 20.6.0 or later.

## License

This project is licensed under the MIT license. For more information, see the LICENSE file.

## Contribution

If you wish to contribute to the project or report bugs, please open a pull request or create an issue in the GitHub repository.
