#!/usr/bin
# myavg: calculate average of all numbers entered by a user using arrays

read -r -p "How many numbers? " n
if ! [[ "$n" =~ ^[0-9]+$ ]] || (( n <= 0 )); then
	echo "Please enter a positive integer." >&2
	exit 1
fi

nums=()
for (( i=0; i<n; i++ )); do
	read -r -p "Enter number [$i]: " x
	if ! [[ "$x" =~ ^-?[0-9]+(\.[0-9]+)?$ ]]; then
		echo "Not a number. Try again."; ((i--)); continue
	fi
	nums+=("$x")
done

# Compute sum and average with awk for robust float math
sum=$(printf "%s\n" "${nums[@]}" | awk '{s+=$1} END{if(NR>0) print s; else print 0}')
avg=$(printf "%s\n" "${nums[@]}" | awk '{s+=$1} END{if(NR>0) printf "%.4f", s/NR; else print 0}')

echo "Numbers: ${nums[*]}"
echo "Sum: $sum"
echo "Average: $avg"

