#!/usr/bin
# chkmail: check for new mails every 10 seconds in /var/mail/username

USER_NAME=${1:-$(id -un)}
MAIL_FILE=${2:-/var/mail/$USER_NAME}
INTERVAL=${INTERVAL:-10}

if [[ ! -e "$MAIL_FILE" ]]; then
	echo "Mail file not found: $MAIL_FILE" >&2
	exit 1
fi

echo "Monitoring $MAIL_FILE every ${INTERVAL}s. Press Ctrl+C to stop."
last_size=$(stat -c%s "$MAIL_FILE" 2>/dev/null || wc -c < "$MAIL_FILE")

while true; do
	sleep "$INTERVAL"
	size=$(stat -c%s "$MAIL_FILE" 2>/dev/null || wc -c < "$MAIL_FILE")
	if (( size > last_size )); then
		echo "New mail arrived ($(date))."
	fi
	last_size=$size
done

