#!/usr/bin
# Task 8: Create a menu using select then while

PS3="Choose an option: "

while true; do
  select opt in "ls" "ls -a" "exit"; do
    case $REPLY in
      1)
        ls
        break
        ;;
      2)
        ls -a
        break
        ;;
      3)
        echo "Bye"
        exit 0
        ;;
      *)
        echo "Invalid choice"
        ;;
    esac
  done
  echo ""
 done
