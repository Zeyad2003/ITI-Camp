# 7.  Create a script called mytest where: 
# a.  It check the type of the given argument (file/directory) 
# b.  It check the permissions of the given argument (read/write/execute)
if [ -d "$1" ]; then
  echo "$1 is a directory"
elif [ -f "$1" ]; then
  echo "$1 is a file"
else
  echo "$1 does not exist"
fi

[ -r "$1" ] && echo "Readable" || echo "Not Readable"
[ -w "$1" ] && echo "Writable" || echo "Not Writable"
[ -x "$1" ] && echo "Executable" || echo "Not Executable"
