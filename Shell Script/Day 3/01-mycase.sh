#!/usr/bin
# mycase: check the type of a single character entered by the user

read -r -p "Enter a single character (or just Enter for nothing): " -n 1 ch || true
echo

case "$ch" in
	[A-Z])
		echo "Upper Case."
		;;
	[a-z])
		echo "Lower Case."
		;;
	[0-9])
		echo "Number."
		;;
	"")
		echo "Nothing."
		;;
	*)
		echo "Other."
		;;
esac

