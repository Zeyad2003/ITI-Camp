# 5.  Create a script called myls where: 
# a.  It lists the current directory, if it is called without arguments. 
# b.  Otherwise, it lists the given directory.
if [ $# -eq 0 ]; then
  ls
else
  ls "$1"
fi