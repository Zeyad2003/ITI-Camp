# 2.  Create a script called s1 that calls another script s2 where: 
# a.  In s1 there is a variable called x, it's value 5 
# b.  Try to print the value of x in s2 by two different ways.

# First way: print x from environment variable
echo "Value of x from environment: $x"

# Second way: print x from argument
echo "Value of x from argument: $1"
