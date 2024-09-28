/* Sudoku-klass och metoder för lösning */

/**
 * 
 */
export default class Sudoku {
  // 1. Skapa ett grid med kolumner 1-9 och rader A-I, samt boxar (3x3 rutor x9 boxar)
  // 2. Exempel på metoder: solve(), isValid(), findEmpty(), isComplete()

  /**
   * 
   * @param {*} sudokuGrid 
   */
  constructor (sudokuGrid) { // En 9x9 tabell där varje element är en siffra eller null för tomma rutor.
    this.sudokuGrid = sudokuGrid // Tilldelar Sudoku-pusslet (sudokuGrid) till instansvariabeln 'this.sudokuGrid' som tillhör den specifika instansen av Sudoku-klassen.
  }

  /**
   * Löser Sudoku-pusslet med en backtracking algoritm.
   *
   * @returns 
   */
  solve () {
    const emptyPosition = this.#findEmptyPosition()
    if (!emptyPosition) {
      return true // Inga tommar rutor kvar - pusslet är löst!
    }

    const { row, col } = emptyPosition

    for (let num = 1; num <= 9; num++) {
      if (this.#isValid(row, col, num)) {
        this.sudokuGrid[row][col] = num // Försök sätta in numret.

        // Fortsätt rekursivt och se om det löser hela pusslet.
        if (this.solve()) {
          return true
        }

        // Om inte, backtrack och sätt tillbaka rutan som tom.
        this.sudokuGrid[row][col] = null
      }
    }

    return false // Ingen lösning funnen.
  }

  /**
   * Publik metod som kollar om Sudoku-pusslet är komplett (inga tomma rutor kvar).
   *
   * @returns 
   */
  isComplete () {
    return this.#findEmptyPosition() === null // Om ingen tom ruta hittas är pusslet komplett.
  }

  /* Privata metoder */

  /**
   * Privat metod som hittar nästa tomma ruta i Sudoku-pusslet och returnerar dess koordinater (row, col).
   *
   * @returns 
   */
  #findEmptyPosition () {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.sudokuGrid[row][col] === null) {
          return { row, col }
        }
      }
    }
    return null // Om ingen tom ruta hittas.
  }

  /**
   * Kontrollerar om ett nummer är giltigt i en viss position (dvs om det inte bryter mot reglerna för rader, kolumner och boxar).
   *
   * @param {*} row 
   * @param {*} col 
   * @param {*} num 
   * @returns 
   */
  #isValid (row, col, num) {
    // Kollar raden.
    for (let i = 0; i < 9; i++) {
      if (this.sudokuGrid[row][i] === num) {
        return false
      }
    }

    // Kolla kolumnen.
    for (let i = 0; i < 9; i++) {
      if (this.sudokuGrid[i][col] === num) {
        return false
      }
    }

    // Kollar 3x3-boxen.
    const boxRowStart = Math.floor(row / 3) * 3
    const boxColStart = Math.floor(col / 3) * 3

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.sudokuGrid[boxRowStart + i][boxColStart + j] === num) {
          return false
        }
      }
    }

    return true // Om inget hinder hittas kan siffran placeras i rutan.
  }
}
