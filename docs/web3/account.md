# account


## address

链上地址


## 助记词

12 个助记词一个钱包，一个钱包可以生成多个 account

* BIP32 HD(Hierarchical Deterministic 分层确定性)钱包，通过种子来生成主私钥，种子是一串很长的随机数
* BIP39 种子不利于记录，使用算法将其转化为 12 ~ 24 个单词
* BIP44 在 BIP32 和 BIP43 的基础上，增加了币种，他允许处理多币种，多账户

```
m/purpose'/coin_type'/account'/change/address_index

```
## 私钥
64位16进制的字符组成
每一个 account 都只有一个 private key，交易过程中需要 private key 才能完成

## keystore

keystore 是一个 json 对象，account 与 keystore 一一对应

```json
{
  "version": 3,
  "id": "83191a81-aaca-451f-b63d-0c5f3b849289",
  "address": "06f702337909c06c82b09b7a22f0a2f0855d1f68",
  "crypto": {
    "ciphertext": "7d34deae112841fba86e3e6cf08f5398dda323a8e4d29332621534e2c4069e8d",
    "cipherparams": { "iv": "497f4d26997a84d570778eae874b2333" },
    "cipher": "aes-128-ctr",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "salt": "208dd732a27aa4803bb760228dff18515d5313fd085bbce60594a3919ae2d88d",
      "n": 262144,
      "r": 8,
      "p": 1
    },
    "mac": "0062a853de302513c57bfe3108ab493733034bf3cb313326f42cf26ea2619cf9"
  }
}
```
