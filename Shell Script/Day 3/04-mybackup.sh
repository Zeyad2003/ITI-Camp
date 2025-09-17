#!/usr/bin
# mybackup: create a backup of only files in your home directory

HOME_DIR=${HOME:-$USERPROFILE}
BACKUP_DIR=${1:-"$HOME_DIR/home_files_backup_$(date +%Y%m%d_%H%M%S)"}

mkdir -p "$BACKUP_DIR"

shopt -s dotglob nullglob
for f in "$HOME_DIR"/*; do
	if [[ -f "$f" ]]; then
		cp -p "$f" "$BACKUP_DIR"/
	fi
done

echo "Backed up regular files from $HOME_DIR to $BACKUP_DIR"

