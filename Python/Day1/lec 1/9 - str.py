
"""
    str:
        type cast:
                str()

    useful methods:
        indexing: [1]
        len(): length
        in: to check on the presence of the letter in the iterator
        # slicing: [from:to:step]

    please use formatted strings: f""
"""
#commant
"""
"""



x = ""
x = ''

name = "eslam Reda"

if 'E' in name:
    print("exist")

name = " Abdallah"

print(len(name))
print(name[1])
print(name[1:4])
print(name[1::2])
print(name[len(name) - 1])
print(name[-1])
print(name[-2])
print(name[:])
print(name[::-1])

print("##########################################################")
name = "Eslam Reda Mohamed"

print(name.count("e"))

# name2 = name.lower()
# print(name2.count("e"))

print(name.islower())

print(name.index("m"))

print(name.rfind("m"))

print(name.startswith("E"))

print(name.endswith("d"))




name = "   Ahmed \t \n  "
print(name.strip() == "Ahmed")

name = "   Ahmed Ali \t \n  "

print(name.strip())


print(name.replace(" ", "A"))


first_name = "Eslam"
last_name = "Reda"
age = 22

print("%s %s age: %d"%(first_name, last_name, age))
print(f"{first_name} {last_name} age: {age+5}")




















x = int(input("Enter your age: "))
print(type(x))

































def main():
    pass


if __name__ == '__main__':
    main()














