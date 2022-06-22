import paddle
import paddle.nn as nn

# 继承paddle.nn.Layer类
class Midi_Model(nn.Layer):
    # 重写初始化函数
    # 参数：字符表长度、嵌入层大小、隐藏层大小、解码器层数、处理数字的最大位数
    def __init__(self, char_len, embedding_size=128, hidden_size=128, num_layers=1, batch_size=20):
        super(Midi_Model, self).__init__()
        # 初始化变量
        self.MAXLEN = 1
        self.batch_size = batch_size
        self.hidden_size = hidden_size
        self.char_len = char_len
        self.num_layers=num_layers
        self.embedding_size=embedding_size

        # 嵌入层
        self.emb = nn.Embedding(
            char_len,
            self.embedding_size
        )

        # 编码器
        self.encoder = nn.LSTM(
            input_size=self.embedding_size,
            hidden_size=self.hidden_size,
            num_layers=self.num_layers
        )

        # 解码器
        self.decoder = nn.LSTM(
            input_size=self.hidden_size,
            hidden_size=self.hidden_size,
            num_layers=self.num_layers
        )

        # 全连接层
        self.fc = nn.Linear(
            self.hidden_size,
            char_len
        )

    # 重写模型前向计算函数
    # 参数：输入[None, MAXLEN]、标签[None, DIGITS]
    def forward(self, inputs, labels=None):
        # 嵌入层
        out = self.emb(inputs)

        # 编码器
        out, (_, _) = self.encoder(out)

        # 按时间步切分编码器输出
        out = paddle.split(out, self.MAXLEN, axis=1)

        # 取最后一个时间步的输出并复制batch_size次
        out = paddle.expand(out[-1], [out[-1].shape[0], self.batch_size, self.hidden_size])

        # 解码器
        out, (_, _) = self.decoder(out)

        # 全连接
        out = self.fc(out)

        # 如果标签存在，则计算其损失和准确率
        if labels is not None:
            # 转置解码器输出
            tmp = paddle.transpose(out, [0, 2, 1])

            # 计算交叉熵损失
            loss = nn.functional.cross_entropy(tmp, labels, axis=1)

            # 计算准确率
            acc = paddle.metric.accuracy(paddle.reshape(out, [-1, self.char_len]), paddle.reshape(labels, [-1, 1]))

            # 返回损失和准确率
            return loss, acc

        # 返回输出
        return out


# 继承paddle.nn.Layer类
class Duration_Model(nn.Layer):
    # 重写初始化函数
    # 参数：字符表长度、嵌入层大小、隐藏层大小、解码器层数、处理数字的最大位数
    def __init__(self, char_len, embedding_size=128, hidden_size=64, num_layers=1, batch_size=20):
        super(Duration_Model, self).__init__()
        # 初始化变量
        self.batch_size = batch_size
        self.MAXLEN = 1
        self.hidden_size = hidden_size
        self.char_len = char_len
        self.num_layers=num_layers
        self.embedding_size=embedding_size

        # 嵌入层
        self.emb = nn.Embedding(
            self.char_len,
            self.embedding_size
        )

        # 编码器
        self.encoder = nn.LSTM(
            input_size=embedding_size,
            hidden_size=self.hidden_size,
            num_layers=self.num_layers
        )

        # 解码器
        self.decoder = nn.LSTM(
            input_size=self.hidden_size,
            hidden_size=self.hidden_size,
            num_layers=self.num_layers
        )

        # 全连接层
        self.fc = nn.Linear(
            self.hidden_size,
            self.char_len
        )

    # 重写模型前向计算函数
    # 参数：输入[None, MAXLEN]、标签[None, DIGITS]
    def forward(self, inputs, labels=None):
        # 嵌入层
        out = self.emb(inputs)

        # 编码器
        out, (_, _) = self.encoder(out)

        # 按时间步切分编码器输出
        out = paddle.split(out, self.MAXLEN, axis=1)

        # 取最后一个时间步的输出并复制batch_size次
        out = paddle.expand(out[-1], [out[-1].shape[0], self.batch_size, self.hidden_size])

        # 解码器
        out, (_, _) = self.decoder(out)

        # 全连接
        out = self.fc(out)

        # 如果标签存在，则计算其损失和准确率
        if labels is not None:
            # 转置解码器输出
            tmp = paddle.transpose(out, [0, 2, 1])

            # 计算交叉熵损失
            loss = nn.functional.cross_entropy(tmp, labels, axis=1)

            # 计算准确率
            acc = paddle.metric.accuracy(paddle.reshape(out, [-1, self.char_len]), paddle.reshape(labels, [-1, 1]))

            # 返回损失和准确率
            return loss, acc

        # 返回输出
        return out