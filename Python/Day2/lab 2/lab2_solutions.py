"""
Solutions for Lab 2 - Python Day 2
All tasks are implemented as functions and run via a menu system.
"""
import random

# 1 - Ask the user to enter 5 numbers. Store them, then display them in ascending order and descending order.
def task1():
    nums = []
    while len(nums) < 5:
        try:
            n = int(input(f"Enter number {len(nums)+1}/5: "))
            nums.append(n)
        except ValueError:
            print("Invalid input. Please enter an integer, e.g.: 7")
    print("Ascending:", sorted(nums))
    print("Descending:", sorted(nums, reverse=True))

# 2 - Function that takes two numbers: (length, start). Generate a sequence of numbers with the given length, starting from start, increasing by one each time.
def task2():
    while True:
        try:
            length = int(input("Enter sequence length: "))
            start = int(input("Enter start number: "))
            if length < 1:
                raise ValueError
            break
        except ValueError:
            print("Invalid input. Example: length=5, start=10")
    seq = []
    for i in range(length):
        seq.append(start + i)
    print("Sequence:", seq)

# 3 - Keep asking the user for numbers until they type "done". Print total, count, average.
def task3():
    nums = []
    while True:
        s = input("Enter a number (or 'done' to finish): ")
        if s.lower() == 'done':
            break
        try:
            n = int(s)
            nums.append(n)
        except ValueError:
            print("Invalid input. Example: 3 or done")
    if nums:
        print(f"Total: {sum(nums)}")
        print(f"Count: {len(nums)}")
        print(f"Average: {sum(nums) / len(nums)}")
    else:
        print("No valid numbers entered.")

# 4 - Ask the user to enter a list of numbers. Remove duplicates, sort, display.
def task4():
    while True:
        s = input("Enter numbers separated by spaces: ")
        try:
            nums = []
            for num_str in s.split():
                nums.append(int(num_str))
            break
        except ValueError:
            print("Invalid input. Example: 1 2 3 4 5")
    unique_sorted = sorted(set(nums))
    print("Result:", unique_sorted)

# 6 - Ask the user to enter a sentence. Count how many times each word appears.
def task6():
    while True:
        s = input("Enter a sentence: ")
        if not s.strip():
            print("Invalid input. Example: this is a sentence")
        else:
            break
    words = s.lower().split()
    counts = {}
    for w in words:
        counts[w] = counts.get(w, 0) + 1
    print("Word counts:")
    for w, c in counts.items():
        print(f"{w}: {c}")

# 7 - Gradebook system: 5 students names and scores. Show highest, lowest, average.
def task7():
    students = []
    scores = []
    for i in range(5):
        name = input(f"Enter name for student {i+1}: ")
        while True:
            try:
                score = int(input(f"Enter score for {name}: "))
                break
            except ValueError:
                print("Invalid input. Example: 88")
        students.append(name)
        scores.append(score)
        
    highest_score = max(scores)
    lowest_score = min(scores)
    highest_student = students[scores.index(highest_score)]
    lowest_student = students[scores.index(lowest_score)]
    average_score = sum(scores) / len(scores)

    print(f"Highest score: {highest_score} ({highest_student})")
    print(f"Lowest score: {lowest_score} ({lowest_student})")
    print(f"Average score: {average_score}")

# 8 - Shopping cart simulation
def task8():
    cart = {}
    while True:
        print("\n1. Add item\n2. Remove item\n3. View cart\n4. Checkout")
        choice = input("Choose an option: ")
        if choice == '1':
            name = input("Item name: ")
            while True:
                try:
                    price = int(input("Item price: "))
                    break
                except ValueError:
                    print("Invalid price. Example: 12")
            cart[name] = price
        elif choice == '2':
            name = input("Item name to remove: ")
            if name in cart:
                del cart[name]
                print(f"Removed {name}.")
            else:
                print("Item not found.")
        elif choice == '3':
            if not cart:
                print("Cart is empty.")
            else:
                for n, p in cart.items():
                    print(f"{n}: {p}")
        elif choice == '4':
            total = sum(cart.values())
            print(f"Total cost: {total}")
            break
        else:
            print("Invalid option. Please choose 1-4. Example: 1")

# 9 - Number guessing game
def task9():
    number = random.randint(1, 20)
    attempts = 0
    print("Guess the number (1-20)")
    while True:
        try:
            guess = int(input("Your guess: "))
            attempts += 1
            if guess < 1 or guess > 20:
                print("Guess must be between 1 and 20. Example: 7")
            elif guess < number:
                print("Too low.")
            elif guess > number:
                print("Too high.")
            else:
                print(f"Correct! Attempts: {attempts}")
                break
        except ValueError:
            print("Invalid input. Please enter an integer between 1 and 20. Example: 13")

def main():
    tasks = [
        ("List order (5 numbers)", task1),
        ("Sequence generator", task2),
        ("Sum/count/average until 'done'", task3),
        ("Remove duplicates from list", task4),
        ("Count words in sentence", task6),
        ("Gradebook system", task7),
        ("Shopping cart", task8),
        ("Number guessing game", task9),
    ]
    while True:
        print("\nLab 2 Menu:")
        for i in range(len(tasks)):
            print(f"{i+1}. {tasks[i][0]}")
        print("0. Exit")
        try:
            choice = int(input("Choose a task: "))
            if choice == 0:
                print("Goodbye!")
                break
            elif 1 <= choice <= len(tasks):
                tasks[choice-1][1]()
            else:
                print(f"Invalid choice. Enter a number between 0 and {len(tasks)}.")
        except ValueError:
            print(f"Invalid input. Enter a number between 0 and {len(tasks)}.")

if __name__ == "__main__":
    main()
