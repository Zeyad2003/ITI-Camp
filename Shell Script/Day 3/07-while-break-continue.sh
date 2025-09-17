#!/usr/bin
# Task 7: analyze the given ksh-like script logic by simulating in bash
# We'll print the sequence of outputs that the original would produce.

# In the provided script, n1 and n2 start at 1 and integers.
# Loop condition: while test $n1 -eq $n2
# Inside: n2=$n2+1 (in ksh with integer types, this increments)
# print $n1 (prints 1)
# then if [ $n1 -gt $n2 ] -> false, so continue; n1 increment and print n2 are skipped due to continue.
# On next iteration, test 1 -eq 2 -> false; loop ends. Thus only "1" is printed.

echo "Output of the script:"
echo "1"
