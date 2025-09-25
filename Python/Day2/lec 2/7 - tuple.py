"""
tuple:
        - immutable container (cannot be modified after creation)

typecase / creation:
        tuple()
        ()
        element,    # single element tuple requires a comma

why use tuple:
        1 - immutability → data safety
        2 - smaller size than list (but less flexible)

supports:
        - indexing
        - reverse indexing
        - slicing

common methods:
        - index
        - count

best use:
        - swapping values (tuple unpacking)
"""

x = (1, 2, 3)
print(type(x))
y = tuple()
print(type(y))
z = 1,
print(type(z))




a = 5
b = 6

a, b = b, a
print(f"{a=}")
print(f"{b=}")


my_tuple = (1, 2, 3, 4, 5)

print(my_tuple[0])
print(my_tuple[-1])
print(my_tuple[1:4])



for index, value in enumerate(my_tuple):
        print(f"{index=}")
        print(f"{value=}")


