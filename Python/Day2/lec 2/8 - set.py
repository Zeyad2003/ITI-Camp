"""
set:
    - mutable container of unique elements
    - can only contain immutable types (int, float, str, tuple, etc.)

typecase / creation:
        set()
        {1, 2, 3}

why use sets:
    - no duplicate elements allowed

supports:
    - membership testing (`in`)
    - set operations (union, intersection, difference)

important methods:
    - add()
    - remove()
    - discard()
    - pop()

operators:
    - intersection →  &
    - union        →  |
"""

list1 = [1, 2, 2, 3, 4, 5, 5]

print(set(list1))


print(len(list1) == len(set(list1)))

set1 = {1, 2, 3, 4}
set1.add(5)
print(set1)


print(set1.intersection({4, 6}))
print(set1.union({8, 9}))

print(set1 & {2})
print(set1 | {20})



set2 = {1, 2, 3, 4, 5, 20, 30}

# set2.remove(30)
set2.discard(30)
print("pass")

print(set2)

set3 = {1, 2, 4, 4, 3}
print(set3)

