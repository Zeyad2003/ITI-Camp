"""
while loop in Python:
    - Repeats as long as a condition is True
    - Unlike for loop, you don’t need to know the number of iterations in advance

Usage:
    while condition:
        # body

Difference:
    - for → when you know the exact number of iterations
    - while → when you loop until a condition is met
"""

x = 10

while x > 0:
    # print(x)
    x -= 1

list1 = [1, 2, 3, 4]
while list1:
    element = list1.pop()
    print(element)