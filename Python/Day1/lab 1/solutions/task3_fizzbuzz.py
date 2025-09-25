# 3. FizzBuzz function
def fizzbuzz(num):
    if num % 3 == 0 and num % 5 == 0:
        return "FizzBuzz"
    elif num % 3 == 0:
        return "Fizz"
    elif num % 5 == 0:
        return "buzz"
    else:
        return str(num)

# Example usage
n = int(input("Enter a number: "))
print(fizzbuzz(n))
