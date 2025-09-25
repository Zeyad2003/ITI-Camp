"""
dictionary:
    - mutable container of key-value pairs
    - also called: hash map / associative array

type cast / creation:
        dict()
        {}

keys:
    - MUST be immutable (int, float, str, tuple, etc.)  # the same reason the set only accepts immutable types.
    - values can be of any type (mutable or immutable)

indexing:
    - dictionaries use key-based indexing, not numeric indexing

common methods:
    - update()
    - pop()
    - clear()
    - keys()
    - values()
    - items()
"""


my_dict = {"key": "value"}
print(my_dict["key"])



my_dict["new_key"] = "new_value"
print(my_dict)


my_dict[(1, 2, 3)] = "thise is tuple"
print(my_dict)


print(my_dict.keys())
print(my_dict.values())
print(my_dict.items())


for key in my_dict.keys():
    pass

for value in my_dict.values():
    pass

for key, value in my_dict.items():
    pass

for element in my_dict:
    print(element)
    

new_dict = {"one": 1}
my_dict.update(new_dict)

print(my_dict)