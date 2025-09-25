"""
for loop in Python:
    - Iterates over sequences (list, tuple, string, range, etc.)

Common patterns:
    for i in range(n)               -> simple loop with numbers
    for element in sequence         -> loop over elements
    for index, value in enumerate() -> loop with index and value
    for ... else:                   -> else runs if no break occurs
"""
for i in range(3 ,5):
    print(i)

list1 = [100, "Eslam", 200]
for i in list1:
    print(i)

for index, value in enumerate(list1):
    print(f"{index=}, {value=}")

for i in range(len(list1)):
    print(i, list1[i])
    
for i in range(5):
    print(i)
else:
    print("All, Done")
