
# SudokuSolver Library

## Disclaimer

This module is still in development and was created as part of a school assignment.

## Description

`SudokuSolver` is a library written in `JavaScript` that helps to generate, solve, and validate classic Sudoku puzzles with 9x9 cell grids. It includes classes for creating complete and incomplete grids, generating hints, and solving and validating grids according to standard Sudoku rules.

## Installation

1. Clone or download this repository through GitHub.
2. Install the dependencies as npm package:

   ```bash
   npm install sudoku-puzzle-solver
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

All tests for the module were run using Jest and verified as passing. See [`testreport.md`](testreport.md) for detailed results.

Tests involve both static grids and dynamically generated grids for comprehensive coverage:

- Static Grid: Predictable and repeatable tests with known expected outcomes.
- Dynamic Grid: Varying conditions to reveal potential issues not apparent with static data.

## Bugs / Issues

All known bugs, including previous infinite loop issues in the `SudokuGenerator`, have been resolved.

## Version

1.1.0

## Dependencies

- Node.js version 20.6.0 or later.

## License

This project is licensed under the MIT license. For more information, see [`LICENSE`](LICENSE).

## Contribution

If you wish to contribute to the project or report bugs, please open a pull request or create an issue in the GitHub repository.
