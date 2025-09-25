"""
list:
    - Array-like object
    - Container of elements
    - Can carry different data types

Creation:
    []
    list()

Features:
    - Supports indexing
    - Reverse indexing
    - Slicing
    - Unpacking
    - Membership (in)

Important methods:
    append, pop, sort, reverse, remove, insert, extend, count

Important keyword/function:
    del
"""

my_list = []
my_list = list()


new_list = list("Eslam")
print(new_list)

print(new_list[0])
print(new_list[-1])
print(new_list[3:])


my_str = ", ".join(new_list)
print(my_str)

num_list = [8, 9, 7, 4, 3, 10, -1, 1, -4]
num_list.append(20)
print(num_list)

poped_value = num_list.pop()

print(num_list)
print(poped_value)

poped_value = num_list.pop(0)

print(num_list)
print(poped_value)

num_list.sort(reverse=True)
print(num_list)


str_list = ["Eslam", "Ali", "Mohamed"]
str_list.sort(key=len)
print(str_list)

str_list.reverse()
print(str_list)

str_list.append([1, 2, 3])
print(str_list)

str_list.extend([4, 5, 6])
print(str_list)

print(str_list[3][1])

list1 = [1, 2, 3]
list2 = [4, 5, 6]
list3 = list1 + list2

print(list3)



my_list = [1, 2]
a, b = my_list
print(a)
print(b)


my_list = [1, 2 ,4, 5, 6, 7, 2]
a, *c, b = my_list
print(a)
print(b)
print(c)



if 2 in c:
    print("2 in c")

del c[0]
print(c)


