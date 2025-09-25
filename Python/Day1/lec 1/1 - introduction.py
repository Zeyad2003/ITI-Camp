
"""
difference between programming languages:

1 - syntax:
        - The set of rules that define how you write code in a language.
        
        - Example:
        
                Python: print("Hello")

                C++: std::cout << "Hello";
        
        - Both do the same job but follow different syntax rules.
----------------------------------------------------------

2 - paradigm:
        - The style or "way of thinking" about solving problems in programming
        
        Types:

                - Procedural: Code is organized into procedures (functions).
                        Example: C.

                - OOP (Object-Oriented Programming): Code is organized into classes and objects.
                        Example: Java, Python.

                - Functional: Focus on pure functions, immutability, and avoiding side effects.
                        Example: Haskell, Scala.

----------------------------------------------------------

low level languages vs high level languages.

Low-Level Languages

        - Close to machine hardware (assembly, C sometimes considered “lower”).

        - Programmer manually manages memory (e.g., malloc, free in C).

        - Harder to write but very fast.

High-Level Languages

        - Abstracted from machine details.

        - Memory is managed automatically (Garbage Collector in Java, Python).

        - Easier to use but usually slower.

--------------------------------------------------------
Compiled vs Interpreted

Compiled

        - Whole program is translated into machine code before execution.

        - Execution is very fast.

        - Errors are caught early (at compile time).

        - Examples: C, C++ (compiled to .exe or binary).

Interpreted

        - Program is executed line by line by an interpreter.

        - Slower execution.

        - Errors appear only when that line is executed (runtime).

        - Examples: Python, JavaScript.

-------------------------------------------------------

Statically Typed vs Dynamically Typed

Statically Typed

        - Type of variable must be declared before use.

        - Checked at compile time.

        - Example (C++):
                int x = 5;  // must declare type



Dynamically Typed:
        - Variable type is assigned at runtime.

        - More flexible, but more runtime errors possible.

        - Example (Python):
                x = 5       # int
                x = "hi"    # now string

----------------------------------------------------

weakly typed vs strongly typed
cohersion

weakly typed:
        - The language allows implicit conversions (coercion) between types.

        - Can lead to unexpected results.
        
        - Example (JavaScript):
                console.log("5" + 5);   // "55" (string + number → string)

Strongly Typed:

        - The language enforces strict type rules.

        - You can’t mix types unless you explicitly convert them.

        - Example (Python):
                print(x + y)   # TypeError: can’t add str and int

"""