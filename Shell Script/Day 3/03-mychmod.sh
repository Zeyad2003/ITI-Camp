#!/usr/bin
# mychmod: give execute permission to all files and directories in home directory

HOME_DIR=${HOME:-$USERPROFILE}

# Use a for loop to iterate entries, including hidden ones
shopt -s dotglob nullglob
for entry in "$HOME_DIR"/*; do
	chmod +x "$entry" 2>/dev/null || true
done

echo "Execute permission granted (where possible) to entries in $HOME_DIR"

