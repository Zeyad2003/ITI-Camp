# 4.  Create a script called mycd where: 
# a.  It changed directory to the user home directory, if it is called without arguments. 
# b.  Otherwise, it change directory to the given directory.
if [ $# -eq 0 ]; then
  cd ~ || exit
else
  cd "$1" || echo "Directory not found"
fi
