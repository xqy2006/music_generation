from music21 import note,converter
import numpy as np
import os
import json
import fractions

def Reader(DIGITS,path = './work/data'):
    dur_dic = {}
    def read_data():
        for file in os.listdir(path):
            lyrics = []
            midis = []
            durations = []
            xml = converter.parseFile(os.path.join(path,file))
            #print(dir(stream.Score()))
            for i, note in enumerate(xml.recurse().notesAndRests):
                if i%DIGITS == 0:
                    lyrics.append([])
                    midis.append([])
                    durations.append([])
                lyric = note._getLyric()
                if lyric == None:
                    lyric = '#'
                lyrics[i//DIGITS].append(ord(lyric))
                try:
                    midis[i//DIGITS].append(note.pitch.midi)
                except:
                    midis[i//DIGITS].append(0)
                durations[i//DIGITS].append(note.duration.quarterLength)
                if type(note.duration.quarterLength) == fractions.Fraction and float(note.duration.quarterLength) not in list(dur_dic.values()):
                        dur_dic[len(dur_dic)] = float(note.duration.quarterLength)
                elif type(note.duration.quarterLength) != fractions.Fraction and note.duration.quarterLength not in list(dur_dic.values()):
                    dur_dic[len(dur_dic)] = note.duration.quarterLength
            yield [midis,durations,lyrics]
        with open('dur_dic.json','w') as f:
            f.write(json.dumps(dur_dic))
    return read_data