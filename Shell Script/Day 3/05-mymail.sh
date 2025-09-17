#!/usr/bin
# mymail: send a mail to all users using a body file mtemplate

set -euo pipefail

TEMPLATE_FILE=${1:-mtemplate}
SUBJECT=${2:-"System notice"}

if [[ ! -f "$TEMPLATE_FILE" ]]; then
	echo "Template file '$TEMPLATE_FILE' not found. Create it and re-run." >&2
	exit 1
fi

if ! command -v mail >/dev/null 2>&1 && ! command -v mailx >/dev/null 2>&1; then
	echo "No 'mail' or 'mailx' command found. Install a mail client to send emails." >&2
	exit 1
fi

MAIL_CMD=$(command -v mailx || command -v mail)

# Iterate users from /etc/passwd (skip system users with nologin/false)
while IFS=: read -r user _ uid gid gecos home shell; do
	[[ -z "$user" ]] && continue
	if [[ "$shell" == */nologin || "$shell" == */false || "$uid" -lt 1000 ]]; then
		continue
	fi
	# Send email to username@localhost as a simple default
	addr="$user@localhost"
	"$MAIL_CMD" -s "$SUBJECT" "$addr" < "$TEMPLATE_FILE" || echo "Failed to mail $addr" >&2
done < /etc/passwd

echo "Mail dispatch attempted to all regular users."

