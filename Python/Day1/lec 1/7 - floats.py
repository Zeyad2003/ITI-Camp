
"""
    float:
        type cats:
                float("3.5")
                

    IEEIEEE 754 in PythonE75
        limitations of: IEEE754:
                        - Python’s built-in float is implemented using the IEEE 754 double precision (64-bit) standard.

                        - This gives about 15–17 significant decimal digits of precision.

                        - Not all real numbers can be represented exactly in binary floating-point → leading to small inaccuracies.
"""
print(type(0.2))

print(0.2 + 0.1)

x = "0.3"
y = float(x)
print(type(y))


# Limitation 1: Floating-Point Representation
print(0.1 + 0.2 == 0.3)

print(round(0.1 + 0.2, 1) == 0.3)





# Limitation 2: Large Floating Numbers (Beyond Quadrillions)
print(0.99999999999999999)
