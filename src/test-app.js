// 1. Importera klasserna.
import Sudoku from './sudokuGrid.js'
import HintGenerator from './hintGenerator.js'

// 2. Lägg till ett exempel Sudoku-pussel här för tester.
const testGrid = [

]

const sudoku = new Sudoku(testGrid) // Lägg till namnet på funktionen med test-pusslet här.

// 3. Skriv funktion för att lösa pusslet. Eller anropa solve() metoden här.
const solvedSudoku = sudoku.solve()
console.log(solvedSudoku)

// 4. Generera en ledtråd för 1 specifik ruta, eller för lättaste rutan med minst antal möjliga svar.
const hint = HintGenerator.getHint(testGrid)
console.log(`Hint: ${hint}`)
