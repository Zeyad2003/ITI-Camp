"""
Reference vs Value in Python
    - In Python, everything is an object.
    - Variables store {references} to objects, not the actual values.
    - When we pass a variable to a function, we are passing a reference.

    Behavior depends on mutability:
        - Immutable objects → act like pass by value
        - Mutable objects   → act like pass by reference
"""

x = 5
print(id(x))


def add_one(x: int):
    print("inside function", x)
    x = x * 10
    print("inside function", x)

y = 5
add_one(5)
print("outside function", y)


def append_to_list(x: list):
    print(x)
    x.append(4)

y = [1, 2, 3]
append_to_list(y)
print(y)