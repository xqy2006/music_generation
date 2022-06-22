from music21 import *
import re

music_name = input()

stream1 = stream.Stream()

str_s = ''

while True:
    try:
        str_s = input().split(' ')
    except KeyboardInterrupt:
        stream1.write("xml", music_name)
        exit(0)
    if re.match(r'^[A-G]\d$|^[A-G]\d[-]$|^[A-G]\d[#]$|^[A-G][-]\d$|^[A-G][#]\d$',str_s[0]):
        n1 = note.Note(str_s[0])
    elif re.match(r'^#$',str_s[0]):
        n1 = note.Rest()
    else:
        raise ValueError("Please check the syntax! you can input like: 'C4' or 'C4#'.")
    if str_s[1].replace(".",'').isdigit() and str_s[1].count('.') < 2:
        n1.duration = duration.Duration(float(str_s[1]))
    else:
        raise ValueError("The second input wants to receive float!But the type of second is %s."%(type(str_s[1])))
    if len(str_s[2]) == 1:
        n1.addLyric(str_s[2])
    else:
        raise ValueError("The lyric wants to receive a Chinese or '#',but your input is %s"%(str_s[2]))
    stream1.append(n1)    