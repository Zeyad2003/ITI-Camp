#!/usr/bin
# myarr: ask how many elements, fill the array, then print it

read -r -p "How many elements? " n
if ! [[ "$n" =~ ^[0-9]+$ ]] || (( n <= 0 )); then
	echo "Please enter a positive integer." >&2
	exit 1
fi

arr=()
for (( i=0; i<n; i++ )); do
	read -r -p "Enter element [$i]: " val
	arr+=("$val")
done

echo "Array elements:"
for e in "${arr[@]}"; do
	echo "$e"
done

