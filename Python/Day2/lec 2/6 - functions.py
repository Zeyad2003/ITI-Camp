"""
functions:
    - Used to simplify logic, and reuse code.

    Parameters:
        - Positionals (rely on order)
        - Keyword arguments (rely on names)
            * Can't have positionals after keyword args
        - Default parameters
            * Never use a mutable type or a function call as default!

    Scope:
        - global: can access global vars; needs 'global' to modify
        - local: inside the function only
        - lexical (nested): can access outer scope; needs 'nonlocal' to modify

        Keywords:
            global
            nonlocal

    Available global functions:
        sum, min, max, any, all
        print
        len, type, id
        str, int, tuple, set, bool, range

    args and kwargs:
        *args   → positional arguments
        **kwargs → keyword arguments
"""
def my_fun():
    pass

print(my_fun())


def my_fun():
    return "inside my function"

print(my_fun())

def sum_nums(x, y, z=10):
    return x + y + z

print(sum_nums(5, y=6, z=20))



def append_to_list(num, my_list):
    if my_list is None:
        my_list = list()
    
    my_list.append(num)
    return my_list

a = append_to_list(2, [10])
b = append_to_list(4, a)
c = append_to_list(5, b)

print(a, b, c)


import random
def add_random(x, random_num = random.choice([1, 2, 3, 4, 5, 6])):
    print(f"{random_num=}")
    return x + random_num

print(add_random(1))
print(add_random(2))
print(add_random(3))


print(30 * "#")
print("scope")

x = 5

def outer_fun():
    y = 6
    print("Access global: x", x)
    def inner_fun():
        print("Access global: x", x)
        print("Access local: y", y)
    
    inner_fun()

outer_fun()





x = 5
def fun():
    global x
    x += 1

print("Befor: ", x)
fun()
print("after: ", x)




def outer_fun():
    y = 6
    
    def inner_fun():
        nonlocal y
        y += 1
        print(y)
        
    inner_fun()

outer_fun()






list1 = [2, 3, 4]

print(f"max: {max(list1)}")
print(f"min: {min(list1)}")
print(f"sum: {sum(list1)}")



list1 = ["", [], 0, ()]

print(f"any: {any(list1)}")

list2 = [" ", [1],  1, (2)]
print(f"all: {all(list2)}")



def sum(*args, **kwargs):
    print(f"args: {args}")
    print(f"type of args: {type(args)}")
    print(f"kwargs: {kwargs}")
    print(f"kwargs Type: {type(kwargs)}")
    
    summing = 0
    if args:
        for value in args:
            summing += value
    
    return summing



print(sum(1, 2, 3, 4, 5, k=2, b=5))







