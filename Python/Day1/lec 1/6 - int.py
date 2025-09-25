"""
int:
    type casts:
            int()
            remove spaces, accepts _
            int("400")
            int("  400_000  ")
            int("101", 2)
            int("F", 16)

    tips:
        is vs ==
        
            - == → checks if values are equal.

            - is → checks if two variables point to the same object in memory (identity).
            
                        (never use IS for equality checks with numbers)

arithmetic operations:

    +
    -
    /
    *
    %: remainder
    /: normal division
    //: floor division 
    **: power  2 ** 3 : 8  
"""

x = 300
y = 300
print(id(x))
print(id(y))
print(x == y)

x += 1
y += 1

print(id(x))
print(id(y))



print(x == y)

print(-7 // 2)

