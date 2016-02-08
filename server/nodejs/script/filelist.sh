cd /home/nis/Desktop/compilerproject/server/nodejs/$1
find . -maxdepth 2 -type f -iregex '.*\(c\|cpp\|exe\)' -printf '%f\n'
