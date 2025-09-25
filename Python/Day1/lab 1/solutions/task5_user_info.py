# 5. User name and email validation
def is_valid_name(name):
    return name.strip() != "" and not name.isdigit()

def is_valid_email(email):
    return "@" in email and "." in email.split("@")[-1]

name = input("Enter your name: ")
while not is_valid_name(name):
    print("Invalid name. Please enter a valid name.")
    name = input("Enter your name: ")

email = input("Enter your email: ")
while not is_valid_email(email):
    print("Invalid email. Please enter a valid email.")
    email = input("Enter your email: ")

print(f"Name: {name}\nEmail: {email}")
