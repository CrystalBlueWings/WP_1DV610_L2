# WP_1DV610_L2
WP 1DV610 Introduktion till mjukvarukvaliatet (LNU) "L2 - Modulen"


# Sudoku-solver

-----------------------
## src/ : Här läggs all källkod för biblioteket

## sudokuGrid.js: Hanterar strukturen och representationen av ett Sudoku-pussel (inmatning, grid-hantering, och validering).
### Denna klass ansvarar för att hantera själva grid-strukturen i Sudoku-pusslet. Den inkluderar metoder för att hämta cellvärden, placera siffror och validera gridens tillstånd (rader, kolumner och boxar).

## sudokuSolver.js: Ansvarar endast för att lösa pusslet med hjälp av SudokuGrid. Den använder SudokuGrid för att läsa, skriva och validera grid-data.
### Denna klass använder sig av SudokuGrid för att lösa ett Sudoku-pussel. Den har ansvar för algoritmen för att lösa pusslet (backtracking), medan all grid-manipulation delegeras till SudokuGrid.

## hintGenerator.js: HintGenerator-klass och metoder för ledtrådar.

## test-app.js: En test-app för att manuellt testa biblioteket.

------------------------
## test/ : Här läggs alla automatiska tester för att validera funktionaliteten.

## hintGenerator.test.js: Testfall för automatiska tester för HintGenerator.

## sudokuGrid.test.js: Testfall för SudokuGrids publika metoder. Manages the grid and validates placements during manipulation.
## sudokuSolver.test.js: Testfall för SudokuSolvers publika metoder.
## SudokuValidator: Validates entire grids or units externally.

Ensure Separation of Concerns:

    SudokuGrid: Grid representation and manipulation.
    SudokuSolver: Solves given puzzles.
    SudokuGenerator: Generates puzzles.
    SudokuValidator: Validates grids.
    BacktrackingSolver: Contains the backtracking logic.
------------------------

## .gitignore: Fil för att undvika att lägga till oönskade filer i git.
## LICENSE: Öppen källkodslicens.
## package.json: Projektmetadata och beroenden.
## README.md: Dokumentation om hur man använder biblioteket.
