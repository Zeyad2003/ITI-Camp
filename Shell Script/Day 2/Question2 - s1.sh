# 2.  Create a script called s1 that calls another script s2 where: 
# a.  In s1 there is a variable called x, it's value 5 
# b.  Try to print the value of x in s2 by two different ways.

# Set variable x
x=5

# First way: export x as environment variable
export x
./Question2\ -\ s2.sh

# Second way: pass x as an argument
./Question2\ -\ s2.sh "$x"
