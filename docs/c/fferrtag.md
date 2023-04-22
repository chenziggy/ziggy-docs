# FFERRTAG

## 诱因

B 站视频进度条，拖动可以显示时间轴上的画面，其原理是客户端会预加载，由媒体服务器处理好的时间轴画面的雪碧图（Sprite Sheet），通过进度条控制整个雪碧图 background-position。实现方法非常优雅，且难度不大

## 启发

可以在浏览器生成雪碧图吗？当然可以，利用 ffmpeg + wasm，输入视频文件，输出图片

但在实际应用中并不现实，问题在于没有一个流媒体网站，会让客户在一开始就加载完整的视频文件，都是通过推流

既然视频播放没有用武之地，那就上传视频来试试，最终决定输出一个 demo，上传视频拖动进度条显示时间轴画面

## wasm

是一种可以在现代 Web 浏览器中运行的低级字节码，可以作为编译目标语言，Wasm 可以用多种语言编写，例如 C/C++、Rust、Go、Java 等

## ffmpeg

ffmpeg 是一款开源免费跨平台的音视频处理工具和库，可以实现视频的解码、编码、转换、处理等功能

### 错误处理

ffmpeg 的错误处理让人眼前一亮，以前我在开发嵌入式代码时，为什么就没想到呢。
在调用 ffmpeg 函数过程中，如果报错，函数返回负数，那这个负数代表什么意思，它又从何而来呢？

```C
#define FFERRTAG(a, b, c, d) (-(int)MKTAG(a, b, c, d))

#define MKTAG(a, b, c, d) ((uint32_t)(a) | ((uint32_t)(b) << 8) | \
                           ((uint32_t)(c) << 16) | ((uint32_t)(d) << 24))
```

error.h 定义了这样两个宏`MKTAG` `FFERRTAG`
`MKTAG`入参 a、b、c 和 d 是四个字符，MKTAG 将这些字符按照给定的顺序（a、b、c、d）组合成一个 32 位的整数值。
`FFERRTAG` 转化为负数

```C
#define AVERROR_INVALIDDATA        FFERRTAG( 'I','N','D','A')
///< Invalid data found when processing input
```
