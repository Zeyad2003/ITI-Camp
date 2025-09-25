"""
    mutability:
            the ability to change in place.

            data types:
                list, dictionary, set

    immutability:
            once created never changed.

            data types:
                int, float, string, tuple, bool, None
"""
my_int = 300
print(f"My original int: {id(my_int)}")
my_int += 1
print(f"new int: {id(my_int)}")

my_str = "Hello world"
new_str = my_str.replace("world", "universe")
print(new_str)


#method chaining
new_str = my_str.replace("world", "universe").upper().lower().title()
print(new_str)


#mutable 
import sys

list1 = [1, 2, 3]
print(id(list1))
list1.append(4)
print(id(list1))
print(list1)
print(sys.getrefcount(list1))

