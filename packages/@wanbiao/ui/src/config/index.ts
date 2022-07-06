export default {
  // 项目信息
  APP: {
    title: "万表二手表",
    wechatId: "wxda27daf7f14e1989",
    desc: "诚信专业的闲置手表交易平台,回收拍卖鉴定,上万表二手表!",
    zfbId: "2019053165406873",
  },
  // im信息
  SDKAppID: {
    development: 1400255460,
    production: 1400254811,
  },
  // 静态资源访问URL
  CDN: {
    origin: {
      development: "https://cdn.wbiaotest.cn",
      production: "https://cdn.wbiao.co",
    },
    path: "/wbshare/m/",
  },
  // 客服
  CUSTOMER:
    "https://downt.wbiao.com/t2d/chat.php?v=2018.09.12&siteid=wx_1000&sellerid=wx_1000&settingid=wx_1000_1558421581882&baseuri=//dl.wbiao.com%2Fjs%2Fb2b%2F&mobile=1&iframechat=0&header=1&rnd=1561364741293",
  // app-source
  APP_SOURCE: "wbauctionapp",
  // 不同平台的统计
  ANALYTICS: {
    baidu: "5062950367a4763e956565e4d827819a", // 百度
    google: "", // 谷歌
    googleTagManager: "", // 谷歌TAG
  },
  // 项目url，即微信JS接口安全域名
  WECHAT_ORIGIN: {
    mall: {
      development: "https://m-test.wbiaotest.cn",
      production: "https://m.wbiao.cn",
    },
    user: {
      development: "http://talent.wbiaotest.cn",
      production: "https://m.wbiao.cn",
    },
  },
  DOMAIN: {
    development: ".wbiaotest.cn",
    production: ".wbiao.cn",
  },
  // 验签
  SECRET_KEY: {
    test: "A6AB94-4535CF-4755-8B19-461383C86E0D", // 测试环境
    production: "vYwtJHeaWL4jFXOunHO-Crp8qoDoLm7q", // 正式环境
  },
  // 登录的域名
  LOGIN: {
    development: "https://m-test.wbiaotest.cn", // 测试环境
    production: "https://m.wbiao.cn", // 正式环境
  },
  // 登录页面路径
  // LOGIN_URL: {
  //   share: '/wbshare/login', // 二手登录
  //   mall: '/member/login' // 商城登录
  // },
  LOGIN_URL: "/wbshare/login",
  // 接口（development测试环境/production正式环境）
  API: {
    seller: {
      development: "http://seller-service.wbiaotest.cn",
      production: "http://seller-service.wbiao.com",
    },
    manage: {
      development: "http://manage-service.wbiaotest.cn",
      production: "http://manage-service.wbiao.com",
    },
    recycle: {
      development: "http://recycle-service.wbiaotest.cn",
      production: "http://recycle-service.wbiao.com",
    },
    payment: {
      development: "http://payment-service.wbiaotest.cn",
      production: "http://payment-service.wbiao.com",
    },
    artisan: {
      development: "http://artisan-service.wbiaotest.cn",
      production: "http://artisan-service.wbiao.com",
    },
    logistics: {
      development: "http://logistics-service.wbiaotest.cn",
      production: "http://logistics-service.wbiao.com",
    },
    member: {
      development: "http://member-service.wbiaotest.cn",
      production: "http://member-service.wbiao.com",
    },
  },
  // 网关API地址
  RIG_API: {
    development: "https://rig-portal.wbiaotest.cn", // 测试环境
    production: "https://rig-portal.wbiao.com", // 正式环境
  },
  // 登录域名
  MU_LOGIN: {
    development: "https://mu.wbiaotest.cn",
    production: "https://mu.wbiao.cn",
  },
  // 域名
  ORIGIN: {
    // 商城
    mall: {
      development: "https://m-test.wbiaotest.cn",
      production: "https://m.wbiao.cn",
    },
    // 万表二手表
    wbshare: {
      development: "https://m-test.wbiaotest.cn/wbshare",
      production: "https://m.wbiao.cn/wbshare",
    },
    // 资讯域名
    information: "https://m.wbiao.com.cn/",
  },
  // 图片信息
  PIC: {
    // 微信 - 分享图标
    wxShareIcon: "https://static.wbiao.co/p/share/m/images/m_share2.png",
    // 默认 - 头像图标
    errorUserAvatar: "https://static.wbiao.co/mobile/wbshare/icon_head.png",
    // 错误页面图标
    errorPage: "https://static.wbiao.co/mobile/wbshare/errorPage.png",
  },
  // oss's Image - 域名
  OSS: {
    static: "https://static.wbiao.co/",
    development: "https://wbiao-test.oss-cn-hangzhou.aliyuncs.com/", // 测试环境
    production: "https://image7.wbiao.co/", // 正式环境
  },
  // 埋点 - 域名
  TRACK: "https://track.wbiao.cn",
  // 万表二手表测试和正式的appId
  WECHATID: {
    development: "wxe79b0f55d9d0ce6d", // 测试环境
    production: "wxda27daf7f14e1989", // 正式环境
  },
  // 下载地址
  Download: {
    scheme: "wbshareapp://", // 唤起协议
    android: "https://a.app.qq.com/o/simple.jsp?pkgname=com.wbiao.wbauction", // android
    appstore: "https://itunes.apple.com/cn/app/id1469495542?mt=8", // ios
    yyb: "https://a.app.qq.com/o/simple.jsp?pkgname=com.wbiao.wbauction", // 应用宝
    tuiguang: "https://a.app.qq.com/o/simple.jsp?pkgname=com.wbiao.wbauction", // 推广下载的地址
    // 万表二手表app 'https://a.app.qq.com/o/simple.jsp?pkgname=com.wbiao.wbauction'
  },
  // 报价分享海报logo二维码
  QuotationQrCode: {
    development: "p/share/mp/images/quotation-test-logo.png",
    production: "mobile/wbshare/quotation-prod-logo.png",
  },
  // im群组应用sdkid
  AVChatRoomSDK: {
    development: 1400379870,
    // production: 1400254811
  },
  // 小程序的appId
  APPID: {
    wxWbshare: "wx85c31869e28d6e54",
    wxWbshareBusiness: "wxf45882c12bf80f44",
    ttWbRecycle: "tt6c5c1ae1f3661c59",
    aliWbRecycle: "2021001184669126",
  },
  DownloadMall: {
    scheme: "wbmallapp://", // 唤起协议
    android: "https://tg.wbiao.cn/promotion/download/wbapp", // android
    appstore: "https://apps.apple.com/cn/app/wbapp/id1354232111", // ios
    yyb: "https://a.app.qq.com/o/simple.jsp?pkgname=com.wbiao.wbapp", // 应用宝
    tuiguang: "http://tg.wbiao.cn/promotion/download/wbapp", // 推广下载的地址
  },
  // 见臻配置链接
  DownloadLuxurypb: {
    scheme: "luxurypb://", // 唤起协议
    android: "https://a.app.qq.com/o/simple.jsp?pkgname=com.wbiao.luxurypb", // android
    appstore: "https://apps.apple.com/cn/app/wbapp/id1561081862", // ios
    yyb: "https://a.app.qq.com/o/simple.jsp?pkgname=com.wbiao.luxurypb", // 应用宝
  },
  passwordLicense: {
    development:
      "VWYyTS84ZFlWQWlOUjRGMXdMSHptczdWeW1IUExxTmZNTTZxQ1J1SDFvTUFFNGdXNHZhWS9wQzZQbHJiVkFld1cvU2RQbDRuOHkxelhCc0swcFdZUlF5U3o1djRXTTlEbE5OdjBGTVNXS3U1VFBuOXdxcUJnZXhmR09oTENTNDF3QVN1QUF5eUU5UW9TUUJHb2tPK3h4cG1XdktZWDUzMVp4WHo4Q2lEeG1rPXsiaWQiOjAsInR5cGUiOiJ0ZXN0IiwicGxhdGZvcm0iOjEwLCJub3RiZWZvcmUiOiIyMDIxMDUwNiIsIm5vdGFmdGVyIjoiMjAyMTA4MDYifQ==",
    production:
      "WmxsRUcxVEN6YmE5VnhWT0p3MUQ1cEFkRkd5RzlVYUFGekNIa0JmUVJzd1lwK29LbkNDL0d6QWF4Zjhza2EzQWRPYTdLcndCZURVVyswRGFaeDhYMUZmRSs5Wnp4bk9yRE0rbW1BQjhhQ2lDbmtGSFp1WWs5ZXVyb0cySFFhaUZVbnNQNGdpSmxmb2pWRGkvVHBOWGRPZEhUUTJNNkNuMkZlZEJHQ1I1d0U4PXsiaWQiOjAsInR5cGUiOiJwcm9kdWN0IiwicGFja2FnZSI6WyIiXSwiYXBwbHluYW1lIjpbIip3Ymlhby5jbiJdLCJwbGF0Zm9ybSI6MTB9",
  },
  passwordrsaPublicKey: {
    development:
      "30818902818100ac7916eeb5cc45b22e8a20ebb2cb11ac6b76678564300b70c3f09f8c0cb92076499556c2d60fa02a78d2d3d94a559ee5f65f5f89a94da88e5cade3bf6a412e4832d7380958fee0c9fe959a1e4c45c8c037a04f693210bb76fa0a3a9dbf3bee803e1365572b03848a7aa2e547257e5a8461073fd15b68b381f5bd76ec7fbc4d230203010001",
    production:
      "3082010a0282010100b219d36d00538fe607dfb5d366d6fd4205ba70710cf65a9f192b36193a5ecc6504ca30f3a97b594be744e4480a410220882b9b16f08ca780f05872c4297160bdf76f327e085634dd0b217681e5a55a005c3efb8834a71dfb268b816acce59143eba474f86acc9f86dc5af287e380b9c709ac4018597b621f5c08ccbecce3687a0d81c86d7ef3acc1eb8e46da52788607c7571313b476c50512e9eeab51829d23723d12b6d51816f3ccc7d37c66a6e92939ae5fe9f1b43fd0516b6fff72e3b09eb9c3b241dff81cbf2b8b3160ce0caf2ac705b2786abeac8a7c704664ef3bac8cd206c598b662582076f743893087416aff2ea05dca231b95133290e79ed6505d0203010001",
  },
};
