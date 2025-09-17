#!/usr/bin
# mycase-enhancement: classify a string entered by a user

read -r -p "Enter a string (or just Enter for nothing): " str

if [[ -z "$str" ]]; then
	echo "Nothing."
elif [[ "$str" =~ ^[A-Z]+$ ]]; then
	echo "Upper Cases."
elif [[ "$str" =~ ^[a-z]+$ ]]; then
	echo "Lower Cases."
elif [[ "$str" =~ ^[0-9]+$ ]]; then
	echo "Numbers."
else
	echo "Mix."
fi

