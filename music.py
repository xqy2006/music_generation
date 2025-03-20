import zipfile
 
f = zipfile.ZipFile("./Midi_Model/best_model.zip",'r') # 压缩文件位置
for file in f.namelist():
    f.extract(file,"./Midi_Model/")               # 解压位置
f.close()
f = zipfile.ZipFile("./Midi_Model/final_model.zip",'r') # 压缩文件位置
for file in f.namelist():
    f.extract(file,"./Midi_Model/")               # 解压位置
f.close()
import sys
input = sys.argv[3]
import os
import json
from music21 import *
import base64
import paddle
import paddle.nn as nn
import numpy as np
from Reader import Reader
import Seq2Seq
from binascii import b2a_hex

batch_size = 10
train_reader = Reader(batch_size, './work/data')
import json
import time
# 初始化log写入器

# 模型参数设置
embedding_size = 256
hidden_size = 256
num_layers = 1

# 训练参数设置
epoch_num = 5000
learning_rate = 1e-5
log_iter = 200

# 定义一些所需变量
global_step = 0
log_step = 0
max_acc = 0

midi_model = Seq2Seq.Midi_Model(
    char_len=0x9FFF,  # 基本汉字的Unicode码范围为4E00-9FA5,这里设置0x9FFF长，基本够用
    embedding_size=embedding_size,
    hidden_size=hidden_size,
    num_layers=num_layers,
    batch_size=batch_size)
dur_model = Seq2Seq.Duration_Model(
    char_len=200,  # midi范围一般在100左右,这里设置200长，基本够用
    embedding_size=embedding_size,
    hidden_size=hidden_size,
    num_layers=num_layers,
    batch_size=batch_size)
midi_model.set_state_dict(paddle.load('Midi_Model/final_model'))
dur_model.set_state_dict(paddle.load('Duration_Model/final_model'))
input_lyrics = input
print(input_lyrics)
lyrics = []
for i, lyric in enumerate(input_lyrics.replace('\n', '')):
    if i % batch_size == 0:
        lyrics.append([])
    lyrics[i // batch_size].append(ord(lyric))
while len(lyrics[-1]) % batch_size != 0:
    lyrics[-1].append(ord('#'))
print(lyrics)
lyrics = paddle.to_tensor(lyrics)
print(lyrics)
params_dict = paddle.load('Midi_Model/best_model')
midi_model.set_dict(params_dict)

# 设置为评估模式
midi_model.eval()

# 模型推理
out = midi_model(lyrics)

# 结果转换
results = []
for _ in np.argmax(out.numpy(), -1).reshape(-1):
    results.append(_)

midis = []
dur_dic = {}
with open('dur_dic.json', 'r') as f:
    dur_str = f.readline()
    dur_dic = json.loads(dur_str)
for i, midi in enumerate(results):
    if i % batch_size == 0:
        midis.append([])
    midis[i // batch_size].append(midi) if midi <= 200 else midis[i // batch_size].append(0)
while len(midis[-1]) % batch_size != 0:
    midis[-1].append(0)
midis = paddle.to_tensor(midis)

params_dict = paddle.load('Duration_Model/best_model')
dur_model.set_dict(params_dict)

# 设置为评估模式
dur_model.eval()

# 模型推理
# out = nn.Softmax(dur_model(midis))
out = dur_model(midis)

# 结果转换
durations = []
for _ in np.argmax(out.numpy(), -1).reshape(-1):
    durations.append(_)

dur_dic = {}
with open('dur_dic.json', 'r') as f:
    dur_str = f.readline()
    dur_dic = json.loads(dur_str)
    print(dur_dic)

stream1 = stream.Stream()
for i, lyric in enumerate(input_lyrics.replace('\n', '')):
    if results[i] != 0:
        n1 = note.Note(results[i])
    else:
        n1 = note.Rest()
    n1.addLyric(lyric)
    n1.duration = duration.Duration(dur_dic[str(durations[i])])
    stream1.append(n1)
import random
name = ''
stream1.write("xml", './result/music/' + sys.argv[4] + ".xml")
stream1.write('midi', './result/music/' + sys.argv[4] + '.midi')
output = input + '.midi'
print(output)

