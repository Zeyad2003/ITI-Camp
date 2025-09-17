### Using sed Utility ###

# 1
echo "Task #1: Display the lines that contain the word 'lp' in /etc/passwd file."
sed -n '/lp/p' /etc/passwd
echo "-----------------------------"

# 2
echo "Task #2: Display /etc/passwd file except the third line."
sed '3d' /etc/passwd
echo "-----------------------------"

# 3
echo "Task #3: Display /etc/passwd file except the last line."
sed '$d' /etc/passwd
echo "-----------------------------"

# 4
echo "Task #4: Display /etc/passwd file except the lines that contain the word 'lp'."
sed '/lp/d' /etc/passwd
echo "-----------------------------"

# 5
echo "Task #5: Substitute all the words that contain 'lp' with 'mylp' in /etc/passwd file."
sed 's/lp/mylp/g' /etc/passwd
echo "-----------------------------"
