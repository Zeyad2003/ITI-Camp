# 5. User name and email validation
def is_valid_name(name):
    return name.strip() != "" and not name.isdigit()

name = input("Enter your name: ")
while not is_valid_name(name):
    print("Invalid name. Please enter a valid name.")
    name = input("Enter your name: ")

email = input("Enter your email: ")
print(f"Name: {name}\nEmail: {email}")
