# 3.  Create a script called mycp where: 
# a.  It copies a file to another 
# b.  It copies multiple files to a directory
if [ $# -eq 2 ] && [ -f "$1" ]; then
  cp "$1" "$2"
  echo "File copied from $1 to $2"
else
  dest=${@: -1}   # last argument is destination
  files=${@:1:$#-1}  # all but last
  cp $files "$dest"
  echo "Files copied to $dest"
fi
