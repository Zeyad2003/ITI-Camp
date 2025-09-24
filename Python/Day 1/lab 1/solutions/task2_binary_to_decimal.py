# 2. Convert binary to decimal
binary = input("Enter a number in binary: ")
try:
    decimal = int(binary, 2)
    print(f"Decimal: {decimal}")
except ValueError:
    print("Invalid binary number.")
