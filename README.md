# 扬声器除水（网页版）

手机进水后扬声器声音变闷时用的在线工具：播放低频声波，把喇叭网孔里的水珠震出来。
原理和 Apple Watch 的排水功能一样。

**在线使用**：https://freaklee.github.io/water-eject/

## 功能

| 模式 | 频率 | 时长 |
|---|---|---|
| 扬声器除水 | 165 Hz 恒定 | 15 秒 |
| 深度清洁 | 120–480 Hz 三角波扫频 | 25 秒 |
| 声道检测 | 440 Hz 左右交替 | 6 秒 |

## 实现

单个 HTML 文件，无依赖、无构建、无后端。用 Web Audio API 的 `OscillatorNode`
实时合成正弦波，`StereoPannerNode` 做左右声道切换（旧版 WebKit 上自动降级为单声道）。

两个值得注意的实现细节：

- **计时用 `setInterval` 而不是 `requestAnimationFrame`**。rAF 在标签页隐藏后
  不再触发，会导致用户切到后台时声音一直放、永不自动停止。
- **iOS 上 Web Audio 受静音开关控制**，所以页面顶部强调要关掉侧边拨杆——
  这是这类网页最常见的「没声音」原因。

## iOS App

功能相同的原生版本（离线可用、无广告）：
https://apps.apple.com/app/id6793174422

## 许可

MIT
