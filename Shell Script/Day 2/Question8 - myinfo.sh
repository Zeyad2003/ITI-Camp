# 8.  Create a script called myinfo where: 
# a.  It asks the user about his/her logname. 
# b.  It print full info about files and directories in his/her home directory 
# c.  Copy his/her files and directories as much as you can in /tmp directory. 
# d.  Gets his current processes status.
echo "Enter your login name:"
read logname
echo "Your login name is: $logname"

echo "Listing files in home directory of $logname:"
ls -l /home/$logname

echo "Copying files to /tmp..."
cp -r /home/$logname/* /tmp/ 2>/dev/null

echo "Current processes for $logname:"
ps -u $logname
