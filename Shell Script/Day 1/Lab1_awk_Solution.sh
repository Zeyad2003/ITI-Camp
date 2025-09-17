### Using awk Utility ###

# 1
echo "Task #1: Print full name (comment) of all users in the system."
awk -F: '{print $5}' /etc/passwd
echo "-----------------------------"

# 2
echo "Task #2: Print login, full name (comment) and home directory of all users. (Print each line preceded by a line number)"
awk -F: '{print NR, $1, $5, $6}' /etc/passwd
echo "-----------------------------"

# 3
echo "Task #3: Print login, uid and full name (comment) of those uid is greater than 500."
awk -F: '$3 > 500 {print $1, $3, $5}' /etc/passwd
echo "-----------------------------"

# 4
echo "Task #4: Print login, uid and full name (comment) of those uid is exactly 500."
awk -F: '$3 == 500 {print $1, $3, $5}' /etc/passwd
echo "-----------------------------"

# 5
echo "Task #5: Print line from 5 to 15 from /etc/passwd."
awk 'NR >= 5 && NR <= 15' /etc/passwd
echo "-----------------------------"

# 6
echo "Task #6: Change 'lp' to 'mylp'."
awk '{gsub(/lp/, "mylp"); print}' /etc/passwd
echo "-----------------------------"

# 7
echo "Task #7: Print all information about the greatest uid."
awk -F: '{if ($3 > max_uid) {max_uid = $3; max_line = $0}} END {print max_line}' /etc/passwd
echo "-----------------------------"

# 8
echo "Task #8: Get the sum of all accounts id's."
awk -F: '{sum += $3} END {print "Sum of all UIDs is:", sum}' /etc/passwd
echo "-----------------------------"
