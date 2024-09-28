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

## test-app.js: En manuell test-app för att testa biblioteket.

------------------------
## test/ : Här läggs all tester för att validera funktionaliteten.

## hintGenerator.test.js: Testfall för automatiska tester för HintGenerator.

## sudokuGrid.test.js: Testfall för SudokuGrid.
## sudokuSolver.test.js: Testfall för SudokuSolver.

------------------------

## .gitignore: Fil för att undvika att lägga till oönskade filer i git.
## LICENSE: Öppen källkodslicens.
## package.json: Projektmetadata och beroenden.
## README.md: Dokumentation om hur man använder biblioteket.
