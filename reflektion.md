# Reflection on Code Quality

During the development of the `SudokuSolver module`, I applied principles from *Clean Code* to ensure that the code is readable, well-structured, and reusable. One of my goals was to adhere to the principle that "classes should represent a single responsibility" (Chapter 2), resulting in a clear separation between classes like `SudokuSolver`, `SudokuGrid`, and `SudokuValidator`.

By giving methods descriptive names, such as `getCellsWithFewestCandidates` and `solveSpecificBox`, I aimed to make the code self-documenting, as also recommended in Chapter 2. This approach improves readability and makes it easy for other developers to understand the purpose of each function.

I also reflected on the principle of small functions (Chapter 3). Some methods, like `#solvePuzzle`, adhere well to this principle by focusing on solving the Sudoku puzzle. Others, such as `#removeNumbersFromGrid`, could be refactored to reduce complexity and the number of responsibilities.

Overall, I am satisfied with how the code is structured, but there is room for improvement in further breaking down certain methods and clarifying variable names in accordance with *Clean Code* principles. Not to mention, the bugs that need fixing.


# Code Quality Requirements

## Naming Conventions (Chapter 2 of Clean Code)

| Name and Explanation               | Reflection and Rules from Clean Code                                                  |
|------------------------------------|---------------------------------------------------------------------------------------|
| `generateCompleteSudokuGrid`       | **Method Names**: Clear and descriptive of its purpose. Consistent naming convention. |
| `isValidGrid`                      | **Avoid Disinformation**: Name is straightforward and avoids ambiguity.               |
| `solveSpecificBox`                 | **Use Problem Domain Names**: Uses terminology relevant to the Sudoku domain.         |
| `getHintForCell`                   | **Don't Be Cute**: Name is not playful and is easy to understand.                     |
| `checkIfCanPlaceNumber`            | **Use Pronounceable Names**: The name clearly explains its purpose.                   |

*Reflection*: The naming in the public interface aligns well with the rules from Clean Code, aiming for clarity and avoiding disinformation or ambiguity.


## Functions Analysis (Chapter 3 of Clean Code)

| Function Name                  | Lines of Code | Reflection on Clean Code Rules                                                         |
|--------------------------------|---------------|----------------------------------------------------------------------------------------|
| `solvePuzzle`                  | ~32           | **Do One Thing**: This method focuses on solving the entire Sudoku puzzle through recursive backtracking. However, the combination of recursion and number placement validation introduces complexity. **Improvement**: To follow the "Do One Thing" principle better, consider breaking the method into smaller, single-purpose helper functions for validation and number placement. This will enhance readability and maintainability.  |
| `fillEmptyCellsInBox`          | ~24           | **Small Functions**: The method attempts to fill empty cells in a specific 3x3 box. The current implementation effectively uses recursion to achieve its goal but lacks modularity. **Improvement**: Refactor the logic to separate responsibilities, such as generating candidate numbers and placing them into cells, which will align better with the "Small Functions" principle. | |
| `findEasiestBox`               | ~26           | **Descriptive Names**: The function name clearly indicates its purpose—to find the 3x3 box with the fewest candidates. However, nested loops and calculations within the function make it challenging to understand at a glance. **Improvement**: Extract smaller functions for calculating the total number of candidates per box and comparing boxes. This will help in following the "Function Should Do One Thing" principle. |
| `attemptToGenerateCompleteGrid`| ~29           | **Function Arguments & Clarity**: This method handles generating a complete grid within time and attempt limits. The multiple concerns (timing, grid creation, validation) reduce clarity and make it harder to maintain. **Improvement**: Separate the concerns into helper functions—one for timeout checks, another for validation, and a primary function for grid creation—to follow the "Single Responsibility" principle effectively. |
| `removeNumbersFromGrid`        | ~28           | **Minimize Control Statements**: This function aims to create an unfinished Sudoku grid by removing numbers, but it contains nested loops and conditionals. While it follows a clear single purpose, the complexity is high. **Improvement**: Use smaller helper functions for random cell selection, validation, and removal logic, adhering to the "Keep Functions Small" and "Avoid Deep Nesting" principles for better clarity. |
