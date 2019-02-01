const cheerio = require('cheerio');


const text = `



<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="Content-Language" content="zh-CN">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="referrer" content="always"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    <title>开源资讯 - 开源中国</title>
            <meta name="keywords" content="开源,OSC,开源软件,开源硬件,开源网站,开源社区,java开源,perl开源,python开源,ruby开源,php开源,开源项目,开源代码"/>
                <meta name="description" content="开源中国 www.oschina.net 是目前中国最大的开源技术社区。我们传播开源的理念，推广开源项目，为 IT 开发者提供了一个发现、使用、并交流开源技术的平台。目前开源中国社区已收录近五万款开源软件。"/>
        <link rel="stylesheet" type="text/css" href="https://static.oschina.net/new-osc/js/utils/semantic-ui/semantic.min.css?t=1542620879000"/>
                <link type="text/css" rel="stylesheet" href="https://static.oschina.net/new-osc/dist/css/web.2361601f.css">        <script type="text/javascript">window.__STATIC_DOMAIN = "https://static.oschina.net";</script>
    <script src="https://static.oschina.net/new-osc/js/utils/jquery.min.js"></script>
    <link rel="shortcut icon" type="image/x-icon" href="https://static.oschina.net/new-osc/img/favicon.ico"/>
    <link rel="alternate" type="application/rss+xml" title="最新开源项目" href="https://www.oschina.net/project/rss"/>
    <link rel="alternate" type="application/rss+xml" title="最新开源资讯" href="https://www.oschina.net/news/rss"/>
    <link rel="alternate" type="application/rss+xml" title="最新问题列表" href="https://www.oschina.net/question/rss"/>
    <link rel="alternate" type="application/rss+xml" title="最新翻译列表" href="https://www.oschina.net/translate/rss"/>
    <link rel="alternate" type="application/rss+xml" title="最新博客列表" href="https://www.oschina.net/blog/rss"/>
    <link rel="alternate" type="application/rss+xml" title="推荐博客列表" href="https://www.oschina.net/blog/rss?show=more"/>
    <link rel="alternate" type="application/rss+xml" title="推荐软件列表" href="https://www.oschina.net/project/rss?show=recomms"/>
    <link rel="alternate" type="application/rss+xml" title="最新代码分享列表" href="https://www.oschina.net/code/rss"/>
    <link rel="alternate" type="application/rss+xml" title="开源中国 - 源码列表" href="https://www.oschina.net/code/source_rss"/>
</head>
<body>
        <val data-name="space_user_url" data-value=""></val>      <val data-name="g_user_url" data-value="https://my.oschina.net/KidBei"></val>      <val data-name="api_prefix" data-value=""></val>      <val data-name="g_user_code" data-value="5pqq2BsG1dx7PkLFRGwWL0Q7sBT1gKUPnodpoImM"></val>     <val data-name="g_user_id" data-value="257479"></val>     <val data-name="g_user" data-value="net.oschina.core.beans.User@6c98ef6f"></val>     <val data-name="login_page" data-value="https://www.oschina.net/home/login?goto_page=https%3A%2F%2Fwww.oschina.net%2Fnews%2Fproject"></val>     
                                                                    <val data-name="g_unread_msg_total_count" data-value="0"></val>
                <val data-name="g_unread_msg_fans_count" data-value="0"></val>
        <val data-name="g_unread_msg_fans_tpl" data-value="<a class='item message-item' href='https://my.oschina.net/KidBei/followers'>{{fansCount}} 位新粉丝</a>"></val>
                <val data-name="g_unread_msg_private_count" data-value="0"></val>
        <val data-name="g_unread_msg_private_tpl" data-value="<a class='item message-item' href='https://my.oschina.net/KidBei/admin/inbox'>{{privateMsgCount}} 条新私信</a>"></val>
                <val data-name="g_unread_msg_reply_count" data-value="0"></val>
        <val data-name="g_unread_msg_reply_tpl" data-value="<a class='item message-item' href='https://my.oschina.net/KidBei?tab=activity&scope=reply'>{{repliesCount}} 条新评论</a>"></val>
                <val data-name="g_unread_msg_ref_count" data-value="0"></val>
        <val data-name="g_unread_msg_ref_tpl" data-value="<a class='item message-item' href='https://my.oschina.net/KidBei?tab=activity&scope=atme'>{{refMeCount}} 条提到我</a>"></val>
    
                <val data-name="weixinAppId" data-value="wx880def15e694b905"></val>
        <val data-name="weixinTimestamp" data-value="1549008571166"></val>
        <val data-name="weixinNonceStr" data-value="d1236116-7bf3-4817-a86b-ec74a93c3052"></val>
        <val data-name="weixinSignature" data-value="7f8b72ce9ff49e371f9d320d59b04cbce2f84c8a"></val>
        <val data-name="weixinShareUrl" data-value="https://www.oschina.net/news/project"></val>                             
            <val data-name="is_detail_page" data-value="false"></val>

            <div class="ui right sidebar vertical menu" id="userSidebar">
        <div class="item">
                                <div class="osc-avatar large-portrait _80x80 ui tiny centered circular avatar image current-user-avatar" title="kidbei" data-user-id="257479">
            <img src="https://static.oschina.net/uploads/user/128/257479_200.png?t=1421985784000" alt="kidbei" title="kidbei"/>
        </div>
                        <h3 class="ui centered header">kidbei</h3>
                                </div>
        <a href="https://my.oschina.net/KidBei" class="item"><i class="home icon grey"></i>个人主页</a>
        <a href="https://www.oschina.net/question/ask" class="item"><i class="question icon grey"></i>发帖提问</a>
        <a href="https://my.oschina.net/KidBei/blog/write" class="item"><i class="edit icon grey"></i>写博客</a>
        <a href="https://my.oschina.net/KidBei/favorites" class="item"><i class="star icon grey"></i>我的收藏</a>
        <a href="https://my.oschina.net/KidBei/admin/publish" class="item"><i class="plus icon grey"></i>投递新闻/软件</a>
        <a href="https://my.oschina.net/KidBei/admin/profile" class="item"><i class="user icon grey"></i>个人资料修改</a>
        <a class="item logout-btn"><i class="sign out icon grey"></i>退出</a>
                                                                                                                                                                                                                    </div>
    
        <div class="ui left inverted sidebar vertical menu" id="mobileNavSidebar">
        <a href="https://www.oschina.net/project" class="item project">开源软件</a>
        <a href="https://www.oschina.net/question" class="item question"">问答</a>
        <a href="https://www.oschina.net/tweets" class="item tweet">动弹</a>
        <a href="https://www.oschina.net/blog" class="item blog">博客</a>
        <a href="https://www.oschina.net/translate" class="item translate">翻译</a>
        <a href="https://www.oschina.net/news" class="item news active">资讯</a>
        <a href="https://gitee.com/?from=osc-index" class="item gitee" target="_blank">码云</a>
        <a href="https://zb.oschina.net/" class="item" target="_blank">众包</a>
        <a href="https://www.oschina.net/event/ych" class="item meetup">源创会</a>
        <a href="https://www.oschina.net/event" class="item">活动</a>
        <a href="https://job.oschina.net/" class="item" target="_blank">求职/招聘</a>
        <a href="https://www.oschina.net/question/topic/masteronline" class="item">高手问答</a>
        <a href="https://www.oschina.net/question/topic/osc-interview" class="item">开源访谈</a>
        <a href="https://my.oschina.net/editorial-story" class="item">周刊</a>
        <a href="https://www.oschina.net/company" class="item">公司开源导航页</a>
    </div>
        <div class="ui right inverted sidebar vertical menu" id="mobileUserSidebar">
                    <div class="item">
                                    <div class="osc-avatar large-portrait _80x80 ui tiny centered circular image avatar-img current-user-avatar" title="kidbei" data-user-id="257479">
            <img src="https://static.oschina.net/uploads/user/128/257479_200.png?t=1421985784000" alt="kidbei" title="kidbei"/>
        </div>
                            <h3 class="ui centered header">kidbei</h3>
                                            </div>
            <a href="https://my.oschina.net/KidBei" class="item"><i class="home icon"></i>个人主页</a>
            <a href="https://www.oschina.net/question/ask" class="item"><i class="question icon"></i>发帖提问</a>
            <a href="https://my.oschina.net/KidBei/blog/write" class="item"><i class="edit icon"></i>写博客</a>
            <a href="https://my.oschina.net/KidBei/favorites" class="item"><i class="star icon"></i>我的收藏</a>
            <a href="https://my.oschina.net/KidBei/admin/publish" class="item"><i class="plus icon"></i>投递新闻/软件</a>
            <a href="https://my.oschina.net/KidBei/admin/profile" class="item"><i class="user icon"></i>个人资料修改</a>
            <a class="item logout-btn"><i class="sign out icon"></i>退出</a>
            </div>

        <div class="pusher ">
                <div class="ui secondary inverted fixed menu" id="headerNavMenu">
            <a class="item logo" href="https://www.oschina.net" title="开源中国"><img src="https://static.oschina.net/new-osc/img/logo.svg" alt="开源中国"></a>
                                                <form action="https://www.oschina.net/search" class="item search-item">
                <div class="ui icon input">
                    <input type="hidden" name="scope" value="news">
                    <input placeholder="大家都在搜...." id="keyword" name="q" size="24" value="" type="text"/>
                    <i class="search link icon"></i>
                </div>
                <div class="results"></div>
            </form>
            <div class="item download-item">
                <a class="ui primary button" id="btnDownloadApp" href="https://www.oschina.net/app" target="_blank">下载APP</a>
            </div>
            <div class="ui popup top left transition hidden" id="btnDownloadAppContent">
                <h3 class="header">开源中国 App —— <br/>关注技术领域的头条文章</h3>
                <p>聚合全网技术文章，根据你的阅读喜好进行个性推荐</p>
                <img width="200" src='https://static.oschina.net/new-osc/img/osc_app_download_qrcode.png?t=1451964198000' alt="下载APP"/>
            </div>
            <div class="ui secondary text menu" id="menuList">
                <a href="https://www.oschina.net/project" class="item project">开源软件</a>
                <a href="https://www.oschina.net/question" class="item question">问答</a>
                <a href="https://www.oschina.net/tweets" class="item tweet">动弹</a>
                <a href="https://www.oschina.net/blog" class="item blog">博客</a>
                <a href="https://www.oschina.net/translate" class="item translate">翻译</a>
                <a href="https://www.oschina.net/news" class="item news active">资讯</a>
                <a href="https://gitee.com/?from=osc-index" class="item gitee" target="_blank">码云<span class="floating ui red label giteetip">代码托管</span></a>
                <a href="https://zb.oschina.net/" class="item" target="_blank">众包</a>
                <a href="https://www.oschina.net/event" class="item event">活动</a>
            </div>
            <div class="ui dropdown item" id="moreMenu">
                更多 <i class="dropdown icon"></i>
                <div class="menu">
                    <a href="https://www.oschina.net/event/ych" class="item meetup"><i class="world icon"></i>源创会</a>
                    <a href="https://job.oschina.net/" class="item" target="_blank"><i class="address card outline icon"></i>求职/招聘</a>
                    <a href="https://www.oschina.net/question/topic/masteronline" class="item"><i class="spy icon"></i>高手问答</a>
                    <a href="https://www.oschina.net/question/topic/osc-interview" class="item"><i class="coffee icon"></i>开源访谈</a>
                    <a href="https://my.oschina.net/editorial-story" class="item"><i class="calendar outline icon"></i>周刊</a>
                    <a href="https://www.oschina.net/company" class="item"><i class="building outline icon"></i>公司开源导航页</a>
                </div>
            </div>
            <div class="right menu">
                                                        <div class="ui icon dropdown item" id="message">
                        <i class="alarm icon"></i>
                                                <div class="ui red circular mini label total-count">0</div>
                                                <div class="menu">
                            <div class="header message-header"> 暂没有未读消息 </div>
                            <a class="item " style='display: none'></a>
                            <div class="message-list"></div>
                            <div class="header action clearfix">
                                <span class="go-inbox"><a href="https://my.oschina.net/KidBei/admin/inbox">消息中心</a></span>
                                <span class="mark-read-all"><a href="javascript:;">全部标记为已读</a></span>
                            </div>
                        </div>
                    </div>
                    <a class="ui dropdown item toggle-user-sidebar">
                                            <div class="osc-avatar small-portrait _28x28 ui avatar image current-user-avatar" title="kidbei" data-user-id="257479">
            <img src="https://static.oschina.net/uploads/user/128/257479_50.png?t=1421985784000" alt="kidbei" title="kidbei"/>
        </div>
                                    <i class="caret right icon"></i>
                    </a>
                            </div>
        </div>
                <div class="ui secondary inverted fixed menu" id="mobileHeaderNavMenu">
            <a class="icon item toggle-mobile-nav-sidebar">
                <i class="large content icon"></i>
            </a>
            <div class="logo back-to-top-toggle"><img src="https://static.oschina.net/new-osc/img/logo.svg" alt="开源中国"></div>
            <a class="icon item toggle-mobile-user-sidebar">
                                                        <div class="osc-avatar small-portrait _28x28 ui avatar image current-user-avatar" title="kidbei" data-user-id="257479">
            <img src="https://static.oschina.net/uploads/user/128/257479_50.png?t=1421985784000" alt="kidbei" title="kidbei"/>
        </div>
                                        </a>
        </div>
                <div id="mainScreen">
            <div class="ui container">
                

                
 
<x-foo-define data-define="web-news-index"></x-foo-define> 
<div class="ui internally grid web-news">
    <div class="row">
        <div class="sixteen wide column">
                        


    <div class="ui three column stackable grid top-recommend-news">
                                        <div class="column card-wrap">
                <a class="ui fluid card" href="https://www.oschina.net/news/103781/2018-oschina-new-opensource-software-cn-top30" target="_blank">
                    <div class="image">
                        <img alt="年度特辑 | 开源中国 2018 年度榜单之国产新秀榜" src="https://static.oschina.net/uploads/img/201901/22102555_TJc2.jpg"/>
                    </div>
                    <div class="content">
                        <div class="header">年度特辑 | 开源中国 2018 年度榜单之国产新秀榜</div>
                    </div>
                </a>
            </div>
                                <div class="column card-wrap">
                <a class="ui fluid card" href="https://www.oschina.net/news/103670/deepin-15-9-released" target="_blank">
                    <div class="image">
                        <img alt="深度操作系统 V15.9 —— 跬步千里，厚积薄发" src="https://static.oschina.net/uploads/img/201901/22103351_BUDa.jpeg"/>
                    </div>
                    <div class="content">
                        <div class="header">深度操作系统 V15.9 —— 跬步千里，厚积薄发</div>
                    </div>
                </a>
            </div>
                                <div class="column card-wrap">
                <a class="ui fluid card" href="https://www.oschina.net/news/103704/how-much-faster-is-java-11" target="_blank">
                    <div class="image">
                        <img alt="Java 11 究竟比 8 快了多少？看看这个基准测试" src="https://static.oschina.net/uploads/img/201901/22102916_1nW1.jpg"/>
                    </div>
                    <div class="content">
                        <div class="header">Java 11 究竟比 8 快了多少？看看这个基准测试</div>
                    </div>
                </a>
            </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="twelve wide computer eleven wide tablet sixteen wide mobile column">
                        <div class="scroll-tab hidden-scroll">
                <div class="ui green pointing secondary massive menu news-tab">
                    <a class=" item" data-tab="newsList">最新</a>
                    <a class=" item" data-tab="genericNewsList">综合资讯</a>
                    <a class=" active  item" data-tab="projectNewsList">软件更新资讯</a>
                    <a class=" item" data-tab="industryNewsList">行业资讯</a>
                    <a class=" item" data-tab="programmingLanguageNewsList">编程语言资讯</a>
                    <div class="right menu small">
                                                    <a class="item" href="https://my.oschina.net/KidBei/admin/publish" target="_blank"><i class="add icon"></i>投递新闻</a>
                                            </div>
                </div>
            </div>
            <div class="ui basic segment  tab article-list" data-tab="newsList" id="newsList">
                


     

    <div class="ui very relaxed items list-container news-list-container">
                                                        
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104143/jfinal-undertow-1-5-released" target="_blank" title="JFinal Undertow 1.5 发布，稳定、可靠服役于生产环境">JFinal Undertow 1.5 发布，稳定、可靠服役于生产环境</a></h3>
        <div class="description">
            <p class="line-clamp">jfinal-undertow 用于开发、部署由 jfinal 开发的 web 项目。独创 HotSwapClassLoader + HotSwapWatcher 以 319 行代码极简实现热加载开发与部署。 经过几个版本的迭代，jfinal undertow 已稳...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/jfinal" target="_blank">JFinal</a></div>
                <div class="item">8分钟前</div>
                <div class="item"><a href="https://www.oschina.net/news/104143/jfinal-undertow-1-5-released#comments" target="_blank"><i class="comment outline icon"></i> 1</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104142/jfinal-weixin-2-3-released" target="_blank" title="JFinal Weixin 2.3 发布，支持微信小程序开发">JFinal Weixin 2.3 发布，支持微信小程序开发</a></h3>
        <div class="description">
            <p class="line-clamp">jfinal weixin 项目早在五年前就发布了第一个版本，是老牌的微信公众号开发 SDK，已稳定、可靠服役多年。因为极简设计、良好的开发体验，所以深受开发者的喜爱。 五年来 jfinal weixin 一直紧...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/jfinal" target="_blank">JFinal</a></div>
                <div class="item">今天 15:05</div>
                <div class="item"><a href="https://www.oschina.net/news/104142/jfinal-weixin-2-3-released#comments" target="_blank"><i class="comment outline icon"></i> 2</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104141/enjoy-3-6-released" target="_blank" title="Enjoy 3.6 发布，Java 开发者专用超轻量级模板引擎">Enjoy 3.6 发布，Java 开发者专用超轻量级模板引擎</a></h3>
        <div class="description">
            <p class="line-clamp">Enjoy Template Engine 采用独创的 DKFF (Dynamic Key Feature Forward) 词法分析算法以及独创的DLRD (Double Layer Recursive Descent) 语法分析算法，极大减少了代码量，降低了学习成本，并...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/jfinal" target="_blank">JFinal</a></div>
                <div class="item">今天 14:38</div>
                <div class="item"><a href="https://www.oschina.net/news/104141/enjoy-3-6-released#comments" target="_blank"><i class="comment outline icon"></i> 2</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104140/jetty-server-2019-1-released" target="_blank" title="jetty server 2019.1 发布">jetty server 2019.1 发布</a></h3>
        <div class="description">
            <p class="line-clamp">为了加快启动速度，提升开发体验，早在 2012 年就已推出 jetty server 项目。该项目稳定可靠一直用了七年时间。为了照顾 JDK 6、JDK 7 的开发者一直没有升到 jetty 最新版本。 本次发布 jett...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/jfinal" target="_blank">JFinal</a></div>
                <div class="item">今天 14:11</div>
                <div class="item"><a href="https://www.oschina.net/news/104140/jetty-server-2019-1-released#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104138/jpress-v-2-0-rc-1-released" target="_blank" title="JPress v2.0-rc.1 发布，插件功能放出">JPress v2.0-rc.1 发布，插件功能放出</a></h3>
        <div class="description">
            <p class="line-clamp">JPress v2.0-rc.1 是基于 JPress v1.0.5 上升级而来，主要是更新如下功能： 新增：插件的支持 新增：文章搜索的支持 升级：JFinal 到 v3.6 最新版本 升级：Jboot 到 v2.0-rc.4 最新版本 虽然...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/yangfuhai" target="_blank">理工男海哥</a></div>
                <div class="item">今天 12:39</div>
                <div class="item"><a href="https://www.oschina.net/news/104138/jpress-v-2-0-rc-1-released#comments" target="_blank"><i class="comment outline icon"></i> 2</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104137/jpress-1-0-5-released" target="_blank" title="JPress v1.0.5 优化发布，修复细节问题">JPress v1.0.5 优化发布，修复细节问题</a></h3>
        <div class="description">
            <p class="line-clamp">JPress 一个类似 WordPress 的产品，使用Java开发。 特点 模板 模板安装 模板卸载 在线编辑（删除模板、修改模板、上传模板） 完善的开发文档 极致的开发体验 用户 独立登录和注册入口 独立的...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/yangfuhai" target="_blank">理工男海哥</a></div>
                <div class="item">今天 12:36</div>
                <div class="item"><a href="https://www.oschina.net/news/104137/jpress-1-0-5-released#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104136/jboot-v-2-0-rc-4-released" target="_blank" title="Jboot v2.0-rc.4 发布，提高开发体验">Jboot v2.0-rc.4 发布，提高开发体验</a></h3>
        <div class="description">
            <p class="line-clamp">Jboot v2.0-rc.4 发布了，这一个版本，完全可以用在商业项目上了，若没有太多问题，修复细节和完善文档后，春节之后将会发布 JBoot 2.0 正式版，理论上不再会新增功能和API调整。 此版本已经...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/yangfuhai" target="_blank">理工男海哥</a></div>
                <div class="item">今天 12:34</div>
                <div class="item"><a href="https://www.oschina.net/news/104136/jboot-v-2-0-rc-4-released#comments" target="_blank"><i class="comment outline icon"></i> 2</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://my.oschina.net/cccyb/blog/3007580" target="_blank" title="每日一博 | 自我剖析，坚持有多难">每日一博 | 自我剖析，坚持有多难</a></h3>
        <div class="description">
            <p class="line-clamp">2018年初的时候给自己设了个小目标，完成一个开源微服务框架(Aooms)的开发工作并配套完成系列博客，截至2019年1月，代码部分倒还完成的可以，博客后期完全没有跟上，今天想着明天写，明天想着...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 08:17</div>
                <div class="item"><a href="https://my.oschina.net/cccyb/blog/3007580#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/translate/extending-eclipse-che-7-to-use-vs-code-extensions" target="_blank" title="Eclipse Che 7 支持 VS Code 扩展">Eclipse Che 7 支持 VS Code 扩展</a></h3>
        <div class="description">
            <p class="line-clamp">Eclipse Che 社区近期正在开发让 Eclipse Theia 成为 Eclipse Che 7 的默认 IDE。我们给 Eclipse Theia 增加了一个插件模型，该插件模型兼容 Visual Studio Code (VS Code) 扩展。Che 7 用户...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 08:14</div>
                <div class="item"><a href="https://www.oschina.net/translate/extending-eclipse-che-7-to-use-vs-code-extensions#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/translate/extending-eclipse-che-7-to-use-vs-code-extensions" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/eclipse-che_8fR0N.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104133/google-vpn-apple-back-door-data-collection" target="_blank" title="谷歌被曝出滥用苹果后门收集用户数据">谷歌被曝出滥用苹果后门收集用户数据</a></h3>
        <div class="description">
            <p class="line-clamp">在 Facebook VPN 丑闻之后，有人透露，谷歌也正在利用同样的苹果后门来收集 13岁以上的用户数据。与 Facebook Research 应用一样，谷歌的 Screenwise Meter 应用也在使用 Apple 企业证书，该...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 08:11</div>
                <div class="item"><a href="https://www.oschina.net/news/104133/google-vpn-apple-back-door-data-collection#comments" target="_blank"><i class="comment outline icon"></i> 11</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104132/gnome-screencaster-app-promises-wifi-display-miracast-support" target="_blank" title="GNOME Screencaster 将支持 Miracast P2P 传输">GNOME Screencaster 将支持 Miracast P2P 传输</a></h3>
        <div class="description">
            <p class="line-clamp">虽然 GNOME 桌面目前已经支持将显示内容传输到 Chromecast、AirPlay 和 Miracast，例如VLC。但是，由于 Miracast 不支持 H.264 或 H.265 因此，Benjamin Berg 一直在尝试使用新的应用程序来解...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 08:10</div>
                <div class="item"><a href="https://www.oschina.net/news/104132/gnome-screencaster-app-promises-wifi-display-miracast-support#comments" target="_blank"><i class="comment outline icon"></i> 2</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104132/gnome-screencaster-app-promises-wifi-display-miracast-support" target="_blank">
            <img src="https://static.oschina.net/img/logo/gnome.gif" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://gitee.com/cloudopt/cloudopt-next" target="_blank" title="码云推荐 | 基于 Kotlin、Vertx 的轻量级的微服务框架">码云推荐 | 基于 Kotlin、Vertx 的轻量级的微服务框架</a></h3>
        <div class="description">
            <p class="line-clamp">Cloudopt Next是基于Kotlin、Vertx的一个面向下一代的极其轻量级的微服务框架，您可以处理Url的解析，数据的封装,Json的输出等等，从根本上减少开发时间、提升开发体验。Cloudopt Next吸收了...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 08:08</div>
                <div class="item"><a href="https://gitee.com/cloudopt/cloudopt-next#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="/p/thinkverb" target="_blank" title="ThinkVerb —— 基于 CoreAnimation 的动画库">ThinkVerb —— 基于 CoreAnimation 的动画库</a></h3>
        <div class="description">
            <p class="line-clamp">ThinkVerb 是一组基于 CoreAnimation 的 API，相比与直接使用 CoreAnimation，ThinkVerb 通过链式语法进行编程，并且自管理 CAAnimation，你无需自己手动创建任何 CAAnimation 并将其添加到视...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 08:07</div>
                <div class="item"><a href="/p/thinkverb#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="/p/thinkverb" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/thinkverb_GgQhh.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104129/android-apps-with-millions-of-installs-push-porn-ads" target="_blank" title="百万下载量的 Android 应用后台收集用户信息">百万下载量的 Android 应用后台收集用户信息</a></h3>
        <div class="description">
            <p class="line-clamp">近期，Trend Micro 分析师 Lorin Wu 发现，数十款调用 Android 摄像头的移动应用程序（有些在 Google Play Store 中已经有100 多万安装量），在提供恶意广告和虚假的软件更新提醒。同时在应用...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 08:01</div>
                <div class="item"><a href="https://www.oschina.net/news/104129/android-apps-with-millions-of-installs-push-porn-ads#comments" target="_blank"><i class="comment outline icon"></i> 4</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104129/android-apps-with-millions-of-installs-push-porn-ads" target="_blank">
            <img src="https://static.oschina.net/img/logo/android.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104128/google-chrome-will-support-another-key-windows-10-feature" target="_blank" title="谷歌将使用 Windows 10 混合显示设备实现 Web VR">谷歌将使用 Windows 10 混合显示设备实现 Web VR</a></h3>
        <div class="description">
            <p class="line-clamp">Google 正在考虑使用微软的 Windows 虚拟现实设备，实现基于 Chrome 的 Web VR 功能。 这意味着用户可以使用 Windows 混合现实设备浏览 Chrome 网页，目前这些功能还处于早期阶段。 根据 9 ...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 07:55</div>
                <div class="item"><a href="https://www.oschina.net/news/104128/google-chrome-will-support-another-key-windows-10-feature#comments" target="_blank"><i class="comment outline icon"></i> 1</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104128/google-chrome-will-support-another-key-windows-10-feature" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/chrome_pMaeM.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://my.oschina.net/xxiaobian/blog/3007988" target="_blank" title="OSChina 周五乱弹 —— 有一个朝代红薯不能去">OSChina 周五乱弹 —— 有一个朝代红薯不能去</a></h3>
        <div class="description">
            <p class="line-clamp">#寒门状元之死#全是编的，完全为了10W+的阅读这下可以检查一下自己的朋友圈里有多少被蒙蔽的人民群众了。</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 07:53</div>
                <div class="item"><a href="https://my.oschina.net/xxiaobian/blog/3007988#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104126/didi-open-source-publishes-its-first-annual-report" target="_blank" title="滴滴开源首次发布年度报告">滴滴开源首次发布年度报告</a></h3>
        <div class="description">
            <p class="line-clamp">2018年是滴滴开源飞速崛起的一年，滴滴开源项目由2017年的4个增长到目前的12个，总Star数突破1.6万，Fork数有2千多个，PR总数超过300个，共多达65个贡献者参与到滴滴开源项目中。开源项目种类...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 07:47</div>
                <div class="item"><a href="https://www.oschina.net/news/104126/didi-open-source-publishes-its-first-annual-report#comments" target="_blank"><i class="comment outline icon"></i> 3</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104125/webstorm-2018-3-4-released" target="_blank" title="WebStorm 2018.3.4 发布，JavaScript IDE">WebStorm 2018.3.4 发布，JavaScript IDE</a></h3>
        <div class="description">
            <p class="line-clamp">WebStorm 2018.3.4 发布了，WebStorm 是 JetBrains 推出的一款商业 JavaScript 开发工具，这款功能强大的 IDE 专用来进行现代的 JavaScript 开发。 此版本主要更新内容如下： 解决了在 Type...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">今天 05:25</div>
                <div class="item"><a href="https://www.oschina.net/news/104125/webstorm-2018-3-4-released#comments" target="_blank"><i class="comment outline icon"></i> 2</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104125/webstorm-2018-3-4-released" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/webstorm_DE1xI.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104124/pycharm-2019-1-eap-2-released" target="_blank" title="PyCharm 2019.1 EAP 2 发布，SSH 解释器支持 Sudo">PyCharm 2019.1 EAP 2 发布，SSH 解释器支持 Sudo</a></h3>
        <div class="description">
            <p class="line-clamp">PyCharm 2019.1 EAP 2 发布了，PyCharm 是由 JetBrains 打造的一款 Python IDE。PyCharm 除了拥有一般 IDE 具备的功能，还提供了一些很好的功能用于 Django 开发，同时支持 Google App Engin...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">今天 05:18</div>
                <div class="item"><a href="https://www.oschina.net/news/104124/pycharm-2019-1-eap-2-released#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104124/pycharm-2019-1-eap-2-released" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/pycharm_m51QX.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104123/mapbox-gl-js-0-53-0-beta-1-released" target="_blank" title="Mapbox GL JS 0.53.0 beta 1 发布，WEB GIS 开发框架 ">Mapbox GL JS 0.53.0 beta 1 发布，WEB GIS 开发框架 </a></h3>
        <div class="description">
            <p class="line-clamp">WEB GIS 开发框架 Mapbox GL JS v0.53.0 beta 1 发布了。 Mapbox GL JS 是一个 JavaScript 库，使用 WebGL 渲染交互式矢量瓦片地图和栅格瓦片地图。WebGL 渲染意味着高性能，MapboxGL 能够渲...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">今天 05:05</div>
                <div class="item"><a href="https://www.oschina.net/news/104123/mapbox-gl-js-0-53-0-beta-1-released#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
            </div>
    <div class="page-load-status">
        <p class="infinite-scroll-request">
            <i class="ui active small inline loader"></i>
        </p>
        <p class="infinite-scroll-last">没有更多内容</p>
        <p class="infinite-scroll-error">加载失败，请刷新页面</p>
    </div>
    <a class="ui fluid button load-more-button" style="display: none">加载更多</a>
                <p class="pagination">
            <a class="all-pagination pagination__next" style="display: none" href="/news/widgets/_news_index_all_list?p=2&type=ajax">下一页</a>
        </p>
                </div>
            <div class="ui basic segment  tab article-list" data-tab="genericNewsList" id="genericNewsList">
                


     

    <div class="ui very relaxed items list-container news-list-container">
                                            
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://my.oschina.net/cccyb/blog/3007580" target="_blank" title="每日一博 | 自我剖析，坚持有多难">每日一博 | 自我剖析，坚持有多难</a></h3>
        <div class="description">
            <p class="line-clamp">2018年初的时候给自己设了个小目标，完成一个开源微服务框架(Aooms)的开发工作并配套完成系列博客，截至2019年1月，代码部分倒还完成的可以，博客后期完全没有跟上，今天想着明天写，明天想着...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 08:17</div>
                <div class="item"><a href="https://my.oschina.net/cccyb/blog/3007580#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/translate/extending-eclipse-che-7-to-use-vs-code-extensions" target="_blank" title="Eclipse Che 7 支持 VS Code 扩展">Eclipse Che 7 支持 VS Code 扩展</a></h3>
        <div class="description">
            <p class="line-clamp">Eclipse Che 社区近期正在开发让 Eclipse Theia 成为 Eclipse Che 7 的默认 IDE。我们给 Eclipse Theia 增加了一个插件模型，该插件模型兼容 Visual Studio Code (VS Code) 扩展。Che 7 用户...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 08:14</div>
                <div class="item"><a href="https://www.oschina.net/translate/extending-eclipse-che-7-to-use-vs-code-extensions#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/translate/extending-eclipse-che-7-to-use-vs-code-extensions" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/eclipse-che_8fR0N.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104133/google-vpn-apple-back-door-data-collection" target="_blank" title="谷歌被曝出滥用苹果后门收集用户数据">谷歌被曝出滥用苹果后门收集用户数据</a></h3>
        <div class="description">
            <p class="line-clamp">在 Facebook VPN 丑闻之后，有人透露，谷歌也正在利用同样的苹果后门来收集 13岁以上的用户数据。与 Facebook Research 应用一样，谷歌的 Screenwise Meter 应用也在使用 Apple 企业证书，该...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 08:11</div>
                <div class="item"><a href="https://www.oschina.net/news/104133/google-vpn-apple-back-door-data-collection#comments" target="_blank"><i class="comment outline icon"></i> 11</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104132/gnome-screencaster-app-promises-wifi-display-miracast-support" target="_blank" title="GNOME Screencaster 将支持 Miracast P2P 传输">GNOME Screencaster 将支持 Miracast P2P 传输</a></h3>
        <div class="description">
            <p class="line-clamp">虽然 GNOME 桌面目前已经支持将显示内容传输到 Chromecast、AirPlay 和 Miracast，例如VLC。但是，由于 Miracast 不支持 H.264 或 H.265 因此，Benjamin Berg 一直在尝试使用新的应用程序来解...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 08:10</div>
                <div class="item"><a href="https://www.oschina.net/news/104132/gnome-screencaster-app-promises-wifi-display-miracast-support#comments" target="_blank"><i class="comment outline icon"></i> 2</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104132/gnome-screencaster-app-promises-wifi-display-miracast-support" target="_blank">
            <img src="https://static.oschina.net/img/logo/gnome.gif" data-img-render>
        </a>
    </div>
                                                
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://gitee.com/cloudopt/cloudopt-next" target="_blank" title="码云推荐 | 基于 Kotlin、Vertx 的轻量级的微服务框架">码云推荐 | 基于 Kotlin、Vertx 的轻量级的微服务框架</a></h3>
        <div class="description">
            <p class="line-clamp">Cloudopt Next是基于Kotlin、Vertx的一个面向下一代的极其轻量级的微服务框架，您可以处理Url的解析，数据的封装,Json的输出等等，从根本上减少开发时间、提升开发体验。Cloudopt Next吸收了...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 08:08</div>
                <div class="item"><a href="https://gitee.com/cloudopt/cloudopt-next#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="/p/thinkverb" target="_blank" title="ThinkVerb —— 基于 CoreAnimation 的动画库">ThinkVerb —— 基于 CoreAnimation 的动画库</a></h3>
        <div class="description">
            <p class="line-clamp">ThinkVerb 是一组基于 CoreAnimation 的 API，相比与直接使用 CoreAnimation，ThinkVerb 通过链式语法进行编程，并且自管理 CAAnimation，你无需自己手动创建任何 CAAnimation 并将其添加到视...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 08:07</div>
                <div class="item"><a href="/p/thinkverb#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="/p/thinkverb" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/thinkverb_GgQhh.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104129/android-apps-with-millions-of-installs-push-porn-ads" target="_blank" title="百万下载量的 Android 应用后台收集用户信息">百万下载量的 Android 应用后台收集用户信息</a></h3>
        <div class="description">
            <p class="line-clamp">近期，Trend Micro 分析师 Lorin Wu 发现，数十款调用 Android 摄像头的移动应用程序（有些在 Google Play Store 中已经有100 多万安装量），在提供恶意广告和虚假的软件更新提醒。同时在应用...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 08:01</div>
                <div class="item"><a href="https://www.oschina.net/news/104129/android-apps-with-millions-of-installs-push-porn-ads#comments" target="_blank"><i class="comment outline icon"></i> 4</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104129/android-apps-with-millions-of-installs-push-porn-ads" target="_blank">
            <img src="https://static.oschina.net/img/logo/android.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104128/google-chrome-will-support-another-key-windows-10-feature" target="_blank" title="谷歌将使用 Windows 10 混合显示设备实现 Web VR">谷歌将使用 Windows 10 混合显示设备实现 Web VR</a></h3>
        <div class="description">
            <p class="line-clamp">Google 正在考虑使用微软的 Windows 虚拟现实设备，实现基于 Chrome 的 Web VR 功能。 这意味着用户可以使用 Windows 混合现实设备浏览 Chrome 网页，目前这些功能还处于早期阶段。 根据 9 ...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 07:55</div>
                <div class="item"><a href="https://www.oschina.net/news/104128/google-chrome-will-support-another-key-windows-10-feature#comments" target="_blank"><i class="comment outline icon"></i> 1</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104128/google-chrome-will-support-another-key-windows-10-feature" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/chrome_pMaeM.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://my.oschina.net/xxiaobian/blog/3007988" target="_blank" title="OSChina 周五乱弹 —— 有一个朝代红薯不能去">OSChina 周五乱弹 —— 有一个朝代红薯不能去</a></h3>
        <div class="description">
            <p class="line-clamp">#寒门状元之死#全是编的，完全为了10W+的阅读这下可以检查一下自己的朋友圈里有多少被蒙蔽的人民群众了。</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 07:53</div>
                <div class="item"><a href="https://my.oschina.net/xxiaobian/blog/3007988#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104126/didi-open-source-publishes-its-first-annual-report" target="_blank" title="滴滴开源首次发布年度报告">滴滴开源首次发布年度报告</a></h3>
        <div class="description">
            <p class="line-clamp">2018年是滴滴开源飞速崛起的一年，滴滴开源项目由2017年的4个增长到目前的12个，总Star数突破1.6万，Fork数有2千多个，PR总数超过300个，共多达65个贡献者参与到滴滴开源项目中。开源项目种类...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">今天 07:47</div>
                <div class="item"><a href="https://www.oschina.net/news/104126/didi-open-source-publishes-its-first-annual-report#comments" target="_blank"><i class="comment outline icon"></i> 3</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104112/kkfileview-year-end-faq" target="_blank" title="kkfileView 使用问题年终答疑篇">kkfileView 使用问题年终答疑篇</a></h3>
        <div class="description">
            <p class="line-clamp">前言 首先非常感谢社区同仁对 kkfileview 项目的关注，kkfileview 开源一年多以来，收获了两千六百多个赞以及获得码云最有价值项目GVP，这离不开大家的贡献和关注。同时，kkfileview 的设计模...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/keking" target="_blank">凯京技术团队</a></div>
                <div class="item">昨天 16:19</div>
                <div class="item"><a href="https://www.oschina.net/news/104112/kkfileview-year-end-faq#comments" target="_blank"><i class="comment outline icon"></i> 1</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104107/open-source-means-okay" target="_blank" title="开源就意味着好吗？AMD 驱动烂 VS AMD 驱动不烂">开源就意味着好吗？AMD 驱动烂 VS AMD 驱动不烂</a></h3>
        <div class="description">
            <p class="line-clamp">这里讨论的驱动是开源驱动或 Linux、BSD 上的驱动，与 Windows 不太相干，不涉及 Windows 下驱动使用体验。 首先说明一下 AMD 的 Linux 驱动模式：Linux 驱动会分为开源驱动(Gallium3D)和闭源...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">昨天 08:25</div>
                <div class="item"><a href="https://www.oschina.net/news/104107/open-source-means-okay#comments" target="_blank"><i class="comment outline icon"></i> 20</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://my.oschina.net/u/4062427/blog/3007382" target="_blank" title="每日一博 | 硬盘性能的几大误解 - 从共识算法开谈">每日一博 | 硬盘性能的几大误解 - 从共识算法开谈</a></h3>
        <div class="description">
            <p class="line-clamp">三周前，我开源了自己写的共识库Dragonboat ，在反馈里发现一些用户对硬盘性能有不少基础性误解，但仔细想来这些坑自己一样踏过。本文从一个软件工程师角度，分享一路走来踏过的几个硬盘性能...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">昨天 08:18</div>
                <div class="item"><a href="https://my.oschina.net/u/4062427/blog/3007382#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104105/apple-swift-5-update-ios-12-2" target="_blank" title="Swift 5 将进一步减小 iOS 应用安装包大小">Swift 5 将进一步减小 iOS 应用安装包大小</a></h3>
        <div class="description">
            <p class="line-clamp">10年来，苹果开发者生态系统的最大变化是引入了 Swift 语言。在今年的 WWDC 上，我们将会看到另外一个巨大更新：在 Mac 上将支持导入第三方 UIKit 。 Swift 在2014年 WWDC 上宣布的。目前版本...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">昨天 08:16</div>
                <div class="item"><a href="https://www.oschina.net/news/104105/apple-swift-5-update-ios-12-2#comments" target="_blank"><i class="comment outline icon"></i> 8</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104105/apple-swift-5-update-ios-12-2" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/swift-lang_ABKjp.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104104/ubuntu-18-04-lts-to-patch-11-flaws" target="_blank" title="Ubuntu 18.04 修复 Linux 内核的 11 个漏洞">Ubuntu 18.04 修复 Linux 内核的 11 个漏洞</a></h3>
        <div class="description">
            <p class="line-clamp">Canonical 修复 Ubuntu 18.4 LTS Linux 内核的安全性问题，漏洞影响 Ubuntu 和其所有的衍生版本，例如：Kubuntu、Lubuntu、Ubuntu GNOME、Ubuntu Budgie、Ubuntu Kylin和Ubuntu Studio，以及...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">昨天 08:15</div>
                <div class="item"><a href="https://www.oschina.net/news/104104/ubuntu-18-04-lts-to-patch-11-flaws#comments" target="_blank"><i class="comment outline icon"></i> 7</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104104/ubuntu-18-04-lts-to-patch-11-flaws" target="_blank">
            <img src="https://static.oschina.net/img/logo/ubuntu.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://gitee.com/weghst/duic" target="_blank" title="码云推荐 | duic —— 使用 kotlin  开发的配置中心">码云推荐 | duic —— 使用 kotlin  开发的配置中心</a></h3>
        <div class="description">
            <p class="line-clamp">duic 是采用 kotlin 与 spring-webflux 开发的配置中心。通过 HTTP 的方式获取配置信息，可管理任何语言、应用的配置。设计目标是统一不同应用的配置管理方式，打造更人性化的配置编辑方式，...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">昨天 08:14</div>
                <div class="item"><a href="https://gitee.com/weghst/duic#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://gitee.com/weghst/duic" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/duic_rXaxP.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="/p/aresdb" target="_blank" title="AresDB —— 基于 GPU 运算的实时分析存储和查询引擎">AresDB —— 基于 GPU 运算的实时分析存储和查询引擎</a></h3>
        <div class="description">
            <p class="line-clamp">AresDB 是 Uber 开源的一个基于 GPU 运算的实时分析存储引擎和查询引擎。具备低查询延迟、高数据刷新率和高效内存和磁盘存储管理。AresDB 要求 CUDA Toolkit 的支持。需要接受 CUDA 最终用户...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">昨天 08:09</div>
                <div class="item"><a href="/p/aresdb#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="/p/aresdb" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/aresdb_oOReX.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104100/olive-video-editor" target="_blank" title="Olive 视频剪辑软件开源，Linux 上的 Final Cut Pro">Olive 视频剪辑软件开源，Linux 上的 Final Cut Pro</a></h3>
        <div class="description">
            <p class="line-clamp">Olive 是一个正在开发中的开源视频剪辑器。旨在提供一个免费的，替代高端专业视频剪辑软件。 根据 Linux 上的视频剪辑软件列表，你会发现，大多数的 Linux 上的“专业级”视频剪辑软件，例如...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">昨天 08:07</div>
                <div class="item"><a href="https://www.oschina.net/news/104100/olive-video-editor#comments" target="_blank"><i class="comment outline icon"></i> 1</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104099/oogle-chrome-72-s-code-injection-blocking-detailed" target="_blank" title="Chrome 72 禁止第三方程序代码注入">Chrome 72 禁止第三方程序代码注入</a></h3>
        <div class="description">
            <p class="line-clamp">Chrome 72 的重要改进是优化浏览器应用的稳定性。尽可能减少浏览器崩溃的可能性。 目前全球 65% 的电脑都在运行这 Chrome，这使得 Google 不得不重视浏览器崩溃问题，随着 Chrome 72 发布，浏...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">昨天 08:06</div>
                <div class="item"><a href="https://www.oschina.net/news/104099/oogle-chrome-72-s-code-injection-blocking-detailed#comments" target="_blank"><i class="comment outline icon"></i> 8</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104099/oogle-chrome-72-s-code-injection-blocking-detailed" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/chrome_pMaeM.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://my.oschina.net/xxiaobian/blog/3007655" target="_blank" title="OSChina 周四乱弹 —— 开个程序门诊？">OSChina 周四乱弹 —— 开个程序门诊？</a></h3>
        <div class="description">
            <p class="line-clamp">下班，准备收拾东西，然后回家咯!</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">昨天 08:05</div>
                <div class="item"><a href="https://my.oschina.net/xxiaobian/blog/3007655#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
            </div>
    <div class="page-load-status">
        <p class="infinite-scroll-request">
            <i class="ui active small inline loader"></i>
        </p>
        <p class="infinite-scroll-last">没有更多内容</p>
        <p class="infinite-scroll-error">加载失败，请刷新页面</p>
    </div>
    <a class="ui fluid button load-more-button" style="display: none">加载更多</a>
                <p class="pagination">
            <a class="generic-pagination pagination__next" style="display: none" href="/news/widgets/_news_index_generic_list?p=2&type=ajax">下一页</a>
        </p>
                </div>
            <div class="ui basic segment  active  tab article-list" data-tab="projectNewsList" id="projectNewsList">
                


     

    <div class="ui very relaxed items list-container news-list-container">
                                            
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104143/jfinal-undertow-1-5-released" target="_blank" title="JFinal Undertow 1.5 发布，稳定、可靠服役于生产环境">JFinal Undertow 1.5 发布，稳定、可靠服役于生产环境</a></h3>
        <div class="description">
            <p class="line-clamp">jfinal-undertow 用于开发、部署由 jfinal 开发的 web 项目。独创 HotSwapClassLoader + HotSwapWatcher 以 319 行代码极简实现热加载开发与部署。 经过几个版本的迭代，jfinal undertow 已稳...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/jfinal" target="_blank">JFinal</a></div>
                <div class="item">8分钟前</div>
                <div class="item"><a href="https://www.oschina.net/news/104143/jfinal-undertow-1-5-released#comments" target="_blank"><i class="comment outline icon"></i> 1</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104142/jfinal-weixin-2-3-released" target="_blank" title="JFinal Weixin 2.3 发布，支持微信小程序开发">JFinal Weixin 2.3 发布，支持微信小程序开发</a></h3>
        <div class="description">
            <p class="line-clamp">jfinal weixin 项目早在五年前就发布了第一个版本，是老牌的微信公众号开发 SDK，已稳定、可靠服役多年。因为极简设计、良好的开发体验，所以深受开发者的喜爱。 五年来 jfinal weixin 一直紧...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/jfinal" target="_blank">JFinal</a></div>
                <div class="item">今天 15:05</div>
                <div class="item"><a href="https://www.oschina.net/news/104142/jfinal-weixin-2-3-released#comments" target="_blank"><i class="comment outline icon"></i> 2</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104141/enjoy-3-6-released" target="_blank" title="Enjoy 3.6 发布，Java 开发者专用超轻量级模板引擎">Enjoy 3.6 发布，Java 开发者专用超轻量级模板引擎</a></h3>
        <div class="description">
            <p class="line-clamp">Enjoy Template Engine 采用独创的 DKFF (Dynamic Key Feature Forward) 词法分析算法以及独创的DLRD (Double Layer Recursive Descent) 语法分析算法，极大减少了代码量，降低了学习成本，并...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/jfinal" target="_blank">JFinal</a></div>
                <div class="item">今天 14:38</div>
                <div class="item"><a href="https://www.oschina.net/news/104141/enjoy-3-6-released#comments" target="_blank"><i class="comment outline icon"></i> 2</a></div>
            </div>
        </div>
    </div>
        </div>
                                                
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104140/jetty-server-2019-1-released" target="_blank" title="jetty server 2019.1 发布">jetty server 2019.1 发布</a></h3>
        <div class="description">
            <p class="line-clamp">为了加快启动速度，提升开发体验，早在 2012 年就已推出 jetty server 项目。该项目稳定可靠一直用了七年时间。为了照顾 JDK 6、JDK 7 的开发者一直没有升到 jetty 最新版本。 本次发布 jett...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/jfinal" target="_blank">JFinal</a></div>
                <div class="item">今天 14:11</div>
                <div class="item"><a href="https://www.oschina.net/news/104140/jetty-server-2019-1-released#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104138/jpress-v-2-0-rc-1-released" target="_blank" title="JPress v2.0-rc.1 发布，插件功能放出">JPress v2.0-rc.1 发布，插件功能放出</a></h3>
        <div class="description">
            <p class="line-clamp">JPress v2.0-rc.1 是基于 JPress v1.0.5 上升级而来，主要是更新如下功能： 新增：插件的支持 新增：文章搜索的支持 升级：JFinal 到 v3.6 最新版本 升级：Jboot 到 v2.0-rc.4 最新版本 虽然...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/yangfuhai" target="_blank">理工男海哥</a></div>
                <div class="item">今天 12:39</div>
                <div class="item"><a href="https://www.oschina.net/news/104138/jpress-v-2-0-rc-1-released#comments" target="_blank"><i class="comment outline icon"></i> 2</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104137/jpress-1-0-5-released" target="_blank" title="JPress v1.0.5 优化发布，修复细节问题">JPress v1.0.5 优化发布，修复细节问题</a></h3>
        <div class="description">
            <p class="line-clamp">JPress 一个类似 WordPress 的产品，使用Java开发。 特点 模板 模板安装 模板卸载 在线编辑（删除模板、修改模板、上传模板） 完善的开发文档 极致的开发体验 用户 独立登录和注册入口 独立的...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/yangfuhai" target="_blank">理工男海哥</a></div>
                <div class="item">今天 12:36</div>
                <div class="item"><a href="https://www.oschina.net/news/104137/jpress-1-0-5-released#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104136/jboot-v-2-0-rc-4-released" target="_blank" title="Jboot v2.0-rc.4 发布，提高开发体验">Jboot v2.0-rc.4 发布，提高开发体验</a></h3>
        <div class="description">
            <p class="line-clamp">Jboot v2.0-rc.4 发布了，这一个版本，完全可以用在商业项目上了，若没有太多问题，修复细节和完善文档后，春节之后将会发布 JBoot 2.0 正式版，理论上不再会新增功能和API调整。 此版本已经...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/yangfuhai" target="_blank">理工男海哥</a></div>
                <div class="item">今天 12:34</div>
                <div class="item"><a href="https://www.oschina.net/news/104136/jboot-v-2-0-rc-4-released#comments" target="_blank"><i class="comment outline icon"></i> 2</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104125/webstorm-2018-3-4-released" target="_blank" title="WebStorm 2018.3.4 发布，JavaScript IDE">WebStorm 2018.3.4 发布，JavaScript IDE</a></h3>
        <div class="description">
            <p class="line-clamp">WebStorm 2018.3.4 发布了，WebStorm 是 JetBrains 推出的一款商业 JavaScript 开发工具，这款功能强大的 IDE 专用来进行现代的 JavaScript 开发。 此版本主要更新内容如下： 解决了在 Type...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">今天 05:25</div>
                <div class="item"><a href="https://www.oschina.net/news/104125/webstorm-2018-3-4-released#comments" target="_blank"><i class="comment outline icon"></i> 2</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104125/webstorm-2018-3-4-released" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/webstorm_DE1xI.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104124/pycharm-2019-1-eap-2-released" target="_blank" title="PyCharm 2019.1 EAP 2 发布，SSH 解释器支持 Sudo">PyCharm 2019.1 EAP 2 发布，SSH 解释器支持 Sudo</a></h3>
        <div class="description">
            <p class="line-clamp">PyCharm 2019.1 EAP 2 发布了，PyCharm 是由 JetBrains 打造的一款 Python IDE。PyCharm 除了拥有一般 IDE 具备的功能，还提供了一些很好的功能用于 Django 开发，同时支持 Google App Engin...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">今天 05:18</div>
                <div class="item"><a href="https://www.oschina.net/news/104124/pycharm-2019-1-eap-2-released#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104124/pycharm-2019-1-eap-2-released" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/pycharm_m51QX.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104123/mapbox-gl-js-0-53-0-beta-1-released" target="_blank" title="Mapbox GL JS 0.53.0 beta 1 发布，WEB GIS 开发框架 ">Mapbox GL JS 0.53.0 beta 1 发布，WEB GIS 开发框架 </a></h3>
        <div class="description">
            <p class="line-clamp">WEB GIS 开发框架 Mapbox GL JS v0.53.0 beta 1 发布了。 Mapbox GL JS 是一个 JavaScript 库，使用 WebGL 渲染交互式矢量瓦片地图和栅格瓦片地图。WebGL 渲染意味着高性能，MapboxGL 能够渲...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">今天 05:05</div>
                <div class="item"><a href="https://www.oschina.net/news/104123/mapbox-gl-js-0-53-0-beta-1-released#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104122/opnsense-19-1-released" target="_blank" title="OPNsense 19.1 发布，基于 FreeBSD 的防火墙和路由平台">OPNsense 19.1 发布，基于 FreeBSD 的防火墙和路由平台</a></h3>
        <div class="description">
            <p class="line-clamp">OPNsense 19.1 发布了，OPNsense 是一个易于构建的防火墙和路由平台，基于 FreeBSD，其带有大多数商业防火墙的特性，提供功能完整却易用的 GUI 管理界面。 19.1 版本代号 Inspiring Iguana，...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">今天 04:58</div>
                <div class="item"><a href="https://www.oschina.net/news/104122/opnsense-19-1-released#comments" target="_blank"><i class="comment outline icon"></i> 2</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104122/opnsense-19-1-released" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/opnsense_qJM3j.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104121/goa-1-4-1-released" target="_blank" title="goa 1.4.1 发布，Go 微服务与 REST API 框架">goa 1.4.1 发布，Go 微服务与 REST API 框架</a></h3>
        <div class="description">
            <p class="line-clamp">goa 1.4.1 发布了，goa 是一个使用独特的设计优先原则在 Go 中构建微服务和 REST API 的框架。 此版本更新内容如下： swagger.yaml 使用 yaml.Unmarshal for goagen/gen_swagger/generator....</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">今天 04:46</div>
                <div class="item"><a href="https://www.oschina.net/news/104121/goa-1-4-1-released#comments" target="_blank"><i class="comment outline icon"></i> 2</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104120/android-studio-3-3-released" target="_blank" title="Android Studio 3.3 稳定版发布">Android Studio 3.3 稳定版发布</a></h3>
        <div class="description">
            <p class="line-clamp">Android Studio 3.3 稳定版发布了，此版本更关注基础功能的改进，而非重大新特性。 上个稳定版发布以来，Android Studio 共解决了超过 200 个用户提交的问题，主要更新内容包括： 为 Naviga...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">今天 04:44</div>
                <div class="item"><a href="https://www.oschina.net/news/104120/android-studio-3-3-released#comments" target="_blank"><i class="comment outline icon"></i> 2</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104120/android-studio-3-3-released" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/android-studio_G2N0F.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104119/fastlane-2-115-0-released" target="_blank" title="Fastlane 2.115.0 发布，跨移动端自动化流程工具">Fastlane 2.115.0 发布，跨移动端自动化流程工具</a></h3>
        <div class="description">
            <p class="line-clamp">Fastlane 2.115.0 发布了，Fastlane 是一个针对 iOS 和 Android 全方位开发自动化流程的工具。利用目前支持的工具可以做包含自动化和可持续化构建的每个环节，比如单元测试、截图、分发渠道、...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">今天 04:25</div>
                <div class="item"><a href="https://www.oschina.net/news/104119/fastlane-2-115-0-released#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104119/fastlane-2-115-0-released" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/fastlane_L2DaY.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104117/bouyei-netfactory-updated" target="_blank" title="Bouyei.NetFactory 支持 websocket">Bouyei.NetFactory 支持 websocket</a></h3>
        <div class="description">
            <p class="line-clamp">高性能TCP、UDP通信服务客户端库 1、修复服务端可能的异常崩溃问题。 2、增加WebSocket服务端和客户端支持。 3、调整接口接收事件支持直接返回字符串。 4、修改接收数据事件方式使用偏移量缓...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/bouyei" target="_blank">bouyeijiang</a></div>
                <div class="item">今天 00:17</div>
                <div class="item"><a href="https://www.oschina.net/news/104117/bouyei-netfactory-updated#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104116/gogs-0-11-86-released" target="_blank" title="Gogs 0.11.86 发布，自助 Git 托管服务">Gogs 0.11.86 发布，自助 Git 托管服务</a></h3>
        <div class="description">
            <p class="line-clamp">Gogs 0.11.86 发布了，包含安全更新，建议升级。 Bug 修复 Linux 下 Firefox 显示问题 #5299 使用外部工单系统时出现非预期的工单索引解析错误 #5551 [安全] 远程代码执行和潜在的拒绝服务攻...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/Obahua" target="_blank">无闻</a></div>
                <div class="item">昨天 23:18</div>
                <div class="item"><a href="https://www.oschina.net/news/104116/gogs-0-11-86-released#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104116/gogs-0-11-86-released" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/gogs_lDTmx.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104115/zstack-3-3-0-released" target="_blank" title="ZStack3.3.0 发布！新增 ZWatch 报警消息优化、vCenter 纳管资源池等多项功能">ZStack3.3.0 发布！新增 ZWatch 报警消息优化、vCenter 纳管资源池等多项功能</a></h3>
        <div class="description">
            <p class="line-clamp">1.ZWatch报警消息优化 报警消息收敛 报警消息新增已读未读状态提醒 2.vCenter纳管资源池 3.创建三层网络支持自定义DHCP IP 4.云主机加载多个ISO优化 5.V2V迁移服务增强 6.跨存储迁移优化 7....</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/2448318" target="_blank">ZStack社区版</a></div>
                <div class="item">昨天 21:54</div>
                <div class="item"><a href="https://www.oschina.net/news/104115/zstack-3-3-0-released#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104115/zstack-3-3-0-released" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/zstack_7uZwj.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104114/rsuite-3-7-5-released" target="_blank" title="React Suite 3.7.5 版本更新，React UI 库">React Suite 3.7.5 版本更新，React UI 库</a></h3>
        <div class="description">
            <p class="line-clamp">感谢大家对 React Suite 的关注与支持，这是今年春节前的最后一次更新，在这里祝大家新年快乐，事事顺心。 React Suite 是一套 React 组件库，为后台产品而生。 文档: https://rsuite.gitee....</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/simonguo" target="_blank">漆工</a></div>
                <div class="item">昨天 19:07</div>
                <div class="item"><a href="https://www.oschina.net/news/104114/rsuite-3-7-5-released#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/104114/rsuite-3-7-5-released" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/rsuite_zqQCL.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104113/ng-notadd-0-17-0-released" target="_blank" title="ng-notadd 0.17.0 发布，自带截图组件 ">ng-notadd 0.17.0 发布，自带截图组件 </a></h3>
        <div class="description">
            <p class="line-clamp">新功能 支持截图生成 技术栈 Typescript Angular Material2 rxjs Graphql 相关链接 项目地址 DEMO ng-notadd-mock-server Quick start     git clone https://github.com/notadd/ng-no...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/zhdong" target="_blank">左华栋</a></div>
                <div class="item">昨天 17:26</div>
                <div class="item"><a href="https://www.oschina.net/news/104113/ng-notadd-0-17-0-released#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/104111/dbchm-v-1-7-released" target="_blank" title="数据库文档生成工具 DBCHM v1.7 发布">数据库文档生成工具 DBCHM v1.7 发布</a></h3>
        <div class="description">
            <p class="line-clamp">DBCHM - 最简单、最实用的数据库表列批注维护工具 DBCHM v1.7 主要功能 新增 对 DB2 数据的支持 支持导出的文档类型：chm、word、excel、pdf、XML。 DBCHM效果展示： 1 数据库连接管理 2 表名...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/lztkdr" target="_blank">lzktdr</a></div>
                <div class="item">昨天 14:43</div>
                <div class="item"><a href="https://www.oschina.net/news/104111/dbchm-v-1-7-released#comments" target="_blank"><i class="comment outline icon"></i> 1</a></div>
            </div>
        </div>
    </div>
        </div>
            </div>
    <div class="page-load-status">
        <p class="infinite-scroll-request">
            <i class="ui active small inline loader"></i>
        </p>
        <p class="infinite-scroll-last">没有更多内容</p>
        <p class="infinite-scroll-error">加载失败，请刷新页面</p>
    </div>
    <a class="ui fluid button load-more-button" style="display: none">加载更多</a>
                <p class="pagination">
            <a class="project-pagination pagination__next" style="display: none" href="/news/widgets/_news_index_project_list?p=2&type=ajax">下一页</a>
        </p>
                </div>
            <div class="ui basic segment  tab article-list" data-tab="industryNewsList" id="industryNewsList">
                


     

    <div class="ui very relaxed items list-container news-list-container">
                                            
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103854/french-data-protection-watchdog-fines-google-57-million" target="_blank" title="谷歌被法国数据保护监管机构开出5000万欧元罚单">谷歌被法国数据保护监管机构开出5000万欧元罚单</a></h3>
        <div class="description">
            <p class="line-clamp">1月22日，法国监管机构对 Google 开出了首笔 GDPR 罚款，金额达5000万欧元（约5700万美元）。 这是自2018年《通用数据保护条例》（GDPR）法规生效以来首次对美国科技巨头实施的重大处罚。而处...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/4062684" target="_blank">段段段落</a></div>
                <div class="item">01/23 07:41</div>
                <div class="item"><a href="https://www.oschina.net/news/103854/french-data-protection-watchdog-fines-google-57-million#comments" target="_blank"><i class="comment outline icon"></i> 4</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103756/hacker-news-2018" target="_blank" title="Hacker News 2018 年度报告出炉">Hacker News 2018 年度报告出炉</a></h3>
        <div class="description">
            <p class="line-clamp">在介绍 Hacker News 2018 的年度报告之前，我们先来简单的了解一下这个网站。从名字不难看出，这是一个面向 Hacker（引申至广义的开发者）提供资讯的网站。总的来说，可以将 Hacker News 看做...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/hardbone" target="_blank">局长</a></div>
                <div class="item">01/20 08:05</div>
                <div class="item"><a href="https://www.oschina.net/news/103756/hacker-news-2018#comments" target="_blank"><i class="comment outline icon"></i> 1</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103735/twitter-fixes-bug-exposing-private-tweets" target="_blank" title="推特修复私人推文曝光 bug，漏洞已存在安卓客户端四年">推特修复私人推文曝光 bug，漏洞已存在安卓客户端四年</a></h3>
        <div class="description">
            <p class="line-clamp">推特官方近日宣布，对账户设置做了某些操作的安卓客户端用户，被保护推文可能已经暴露了超过四年。简单来说，就是部分人可见的推特会变得全部人可见。 bug 在2014年末就已存在 安卓用户开启了...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/4062684" target="_blank">段段段落</a></div>
                <div class="item">01/19 08:15</div>
                <div class="item"><a href="https://www.oschina.net/news/103735/twitter-fixes-bug-exposing-private-tweets#comments" target="_blank"><i class="comment outline icon"></i> 6</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103633/announcing-fdb-record-layer" target="_blank" title="FoundationDB Record Layer 宣布开源，提供关系数据库功能">FoundationDB Record Layer 宣布开源，提供关系数据库功能</a></h3>
        <div class="description">
            <p class="line-clamp">昨日，FoundationDB 数据库宣布开源 FoundationDB Record Layer。既然提到了“层(layer)”这个概念，我们不妨在这里简单说一下 FoundationDB 和层之间的渊源 。“层(layer)”源于 Foundation...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/hardbone" target="_blank">局长</a></div>
                <div class="item">01/16 07:53</div>
                <div class="item"><a href="https://www.oschina.net/news/103633/announcing-fdb-record-layer#comments" target="_blank"><i class="comment outline icon"></i> 3</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/103633/announcing-fdb-record-layer" target="_blank">
            <img src="https://static.oschina.net/img/logo/FoundationDB.gif" data-img-render>
        </a>
    </div>
                                                
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103501/aws-launched-documentdb" target="_blank" title="拒向 MongoDB 妥协，AWS 推出替代品 DocumentDB">拒向 MongoDB 妥协，AWS 推出替代品 DocumentDB</a></h3>
        <div class="description">
            <p class="line-clamp">AWS 昨日宣布推出 DocumentDB ，这是一个与 MongoDB API 兼容的新数据库产品。AWS 将 DocumentDB 描述为“一个快速、可扩展且高度可用的文档数据库，旨在与你现有的 MongoDB 应用和工具兼容”...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">01/11 07:54</div>
                <div class="item"><a href="https://www.oschina.net/news/103501/aws-launched-documentdb#comments" target="_blank"><i class="comment outline icon"></i> 36</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/103501/aws-launched-documentdb" target="_blank">
            <img src="https://static.oschina.net/img/logo/mongodb.gif" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103470/pkuseg-open-sourced" target="_blank" title="准确率创新高，北大开源中文分词工具包 pkuseg">准确率创新高，北大开源中文分词工具包 pkuseg</a></h3>
        <div class="description">
            <p class="line-clamp">北京大学近日开源了一个全新的中文分词工具包 pkuseg ，相比于现有的同类开源工具，pkuseg 大幅提高了分词的准确率。 pkuseg 由北大语言计算与机器学习研究组研制推出，具备如下特性： 高分词...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">01/10 08:00</div>
                <div class="item"><a href="https://www.oschina.net/news/103470/pkuseg-open-sourced#comments" target="_blank"><i class="comment outline icon"></i> 12</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103438/alibaba-with-data-artisans" target="_blank" title="阿里收购 Apache Flink 商业公司 Data Artisans">阿里收购 Apache Flink 商业公司 Data Artisans</a></h3>
        <div class="description">
            <p class="line-clamp">1月8日，德国媒体 tech.eu 报道称，阿里巴巴以 9000 万欧元的价格收购了位于柏林的创业公司 Data Artisans 。Data Artisans 由开源流处理框架 Apache Flink 的核心团队组建，专为企业提供高吞...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">01/09 08:06</div>
                <div class="item"><a href="https://www.oschina.net/news/103438/alibaba-with-data-artisans#comments" target="_blank"><i class="comment outline icon"></i> 4</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/103438/alibaba-with-data-artisans" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/apache-flink_5RKGb.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103348/hyundai-joins-agl-lf" target="_blank" title="现代汽车加入 Linux 基金会和 AGL 车载系统标准平台">现代汽车加入 Linux 基金会和 AGL 车载系统标准平台</a></h3>
        <div class="description">
            <p class="line-clamp">1月4日，现代汽车宣布已加入 Linux 基金会和其旗下的非营利协作平台 Automotive Grade Linux（AGL），现代汽车公司副总裁兼信息娱乐技术中心负责人 Paul Choo 表示：“开放式协同合作对我们实...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">01/06 08:01</div>
                <div class="item"><a href="https://www.oschina.net/news/103348/hyundai-joins-agl-lf#comments" target="_blank"><i class="comment outline icon"></i> 1</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/103348/hyundai-joins-agl-lf" target="_blank">
            <img src="https://static.oschina.net/img/logo/linux.gif" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103263/microsofts-venture-capital-arm-m12-invests-in-bakkt" target="_blank" title="微软参投开源数字资产管理平台 Bakkt，首轮融资过亿美元">微软参投开源数字资产管理平台 Bakkt，首轮融资过亿美元</a></h3>
        <div class="description">
            <p class="line-clamp">据外媒报道，微软旗下风险投资部门 M12，刚刚参与了对开源数字资产管理平台 Bakkt 的 1.825 亿美元融资。 Bakkt 旨在建立一个开放性的全球网络，以便任何人都能轻松、安全、高效地购买、出售...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/hardbone" target="_blank">局长</a></div>
                <div class="item">01/03 08:09</div>
                <div class="item"><a href="https://www.oschina.net/news/103263/microsofts-venture-capital-arm-m12-invests-in-bakkt#comments" target="_blank"><i class="comment outline icon"></i> 1</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103124/12306-account-network-leaked" target="_blank" title="铁路 12306 网站否认发生用户信息泄漏">铁路 12306 网站否认发生用户信息泄漏</a></h3>
        <div class="description">
            <p class="line-clamp">有人在中文暗网交易网站 deepmix5e3vptpr2.onion（访问需要经过 Tor 且需要注册）发帖出售 12306 网站用户数据，数据包含了 60 万账户和 410 万联系人，包括了用户 ID、手机号、密码、身份证...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">2018/12/28 18:55</div>
                <div class="item"><a href="https://www.oschina.net/news/103124/12306-account-network-leaked#comments" target="_blank"><i class="comment outline icon"></i> 21</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102971/tf-ranking-released" target="_blank" title="谷歌开源 TF-Ranking，排序学习的可扩展 TensorFlow 库">谷歌开源 TF-Ranking，排序学习的可扩展 TensorFlow 库</a></h3>
        <div class="description">
            <p class="line-clamp">日前，谷歌 AI 发布了最新成果 TF-Ranking，它是一个专门针对排序学习（learning-to-rank）应用的可扩展 TensorFlow 库。TF-Ranking 快速且易用，并能创建高质量的排序模型，对构建 web 搜索...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">2018/12/24 08:08</div>
                <div class="item"><a href="https://www.oschina.net/news/102971/tf-ranking-released#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102888/facebook-opensource-deepfocus" target="_blank" title="Facebook 开源 DeepFocus，实现更逼真的 VR 图像">Facebook 开源 DeepFocus，实现更逼真的 VR 图像</a></h3>
        <div class="description">
            <p class="line-clamp">Facebook 开源了一种基于 AI 可实现更逼真 VR 图像的系统 DeepFocus。 DeepFocus 可与高级原型头戴设备配合使用，实时渲染模糊和各种焦距。例如，当有头戴支持 DeepFocus 的设备观看附近的物...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">2018/12/21 07:59</div>
                <div class="item"><a href="https://www.oschina.net/news/102888/facebook-opensource-deepfocus#comments" target="_blank"><i class="comment outline icon"></i> 0</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102855/ms-opensource-trill" target="_blank" title="微软开源数据处理引擎 Trill，每天可分析万亿次事件">微软开源数据处理引擎 Trill，每天可分析万亿次事件</a></h3>
        <div class="description">
            <p class="line-clamp">微软近日开源了数据处理引擎 Trill，它每天能够分析万亿次事件。 项目地址：https://github.com/Microsoft/trill 当下每毫秒处理大量数据正成为一种常见的业务需求，此次微软开源的 Trill，据...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">2018/12/20 08:10</div>
                <div class="item"><a href="https://www.oschina.net/news/102855/ms-opensource-trill#comments" target="_blank"><i class="comment outline icon"></i> 7</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102827/3gpp-5g-delay" target="_blank" title="突发！5G 标准进程延后 3 个月">突发！5G 标准进程延后 3 个月</a></h3>
        <div class="description">
            <p class="line-clamp">据可靠情报，在前两天于意大利举行的3GPP会议上，3GPP扔出重磅炸弹：R15 Late Drop冻结时间推迟3个月。 该计划推迟或将影响后续的R16版本冻结时间，也将可能导致推迟后续5G服务推出时间。 3G...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">2018/12/19 07:53</div>
                <div class="item"><a href="https://www.oschina.net/news/102827/3gpp-5g-delay#comments" target="_blank"><i class="comment outline icon"></i> 18</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102795/ucberkeley-riselab-opensource-confluo" target="_blank" title="伯克利开源 Confluo，吞吐量是 Kafka 的 4 到 10 倍">伯克利开源 Confluo，吞吐量是 Kafka 的 4 到 10 倍</a></h3>
        <div class="description">
            <p class="line-clamp">近日伯克利 RISE Lab 开源了一个多数据流实时分布式分析系统 Confluo，它既是一个网络监控和诊断框架，也可以作为时序数据库和发布订阅消息系统。 源码地址：https://github.com/ucbrise/co...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">2018/12/18 08:25</div>
                <div class="item"><a href="https://www.oschina.net/news/102795/ucberkeley-riselab-opensource-confluo#comments" target="_blank"><i class="comment outline icon"></i> 103</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/102795/ucberkeley-riselab-opensource-confluo" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/confluo_dmwQm.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102756/tars-the-best-original-oss-2018" target="_blank" title="TARS 斩获 2018 年最佳原创开源软件奖">TARS 斩获 2018 年最佳原创开源软件奖</a></h3>
        <div class="description">
            <p class="line-clamp">最近在开源中国举办的开源年终盛典上，开源项目 TARS 获得了年度最佳原创开源软件奖。 谈到微服务，人们往往会提起Spring Cloud和Service Mesh。 目前带服务治理的微服务框架中，Spring Clou...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/osadmin" target="_blank">oschina</a></div>
                <div class="item">2018/12/17 08:12</div>
                <div class="item"><a href="https://www.oschina.net/news/102756/tars-the-best-original-oss-2018#comments" target="_blank"><i class="comment outline icon"></i> 9</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102732/tencent-join-the-oin" target="_blank" title="腾讯加入专利保护社区 OIN">腾讯加入专利保护社区 OIN</a></h3>
        <div class="description">
            <p class="line-clamp">14日，腾讯宣布加入专利保护社区 OIN 。 OIN 是史上最大的专利保护社区，支持开源软件关键元素 Linux 的自由开发环境，OIN 专利许可和会员的专利交叉许可对所有 OIN 社区会员免费开放。核心技...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">2018/12/16 08:13</div>
                <div class="item"><a href="https://www.oschina.net/news/102732/tencent-join-the-oin#comments" target="_blank"><i class="comment outline icon"></i> 5</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102714/google-opensource-jax" target="_blank" title="谷歌开源 TensorFlow 的简化库 JAX">谷歌开源 TensorFlow 的简化库 JAX</a></h3>
        <div class="description">
            <p class="line-clamp">谷歌开源了一个 TensorFlow 的简化库 JAX。 JAX 结合了 Autograd 和 XLA，专门用于高性能机器学习研究。 凭借 Autograd，JAX 可以求导循环、分支、递归和闭包函数，并且它可以进行三阶求导。...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">2018/12/15 08:04</div>
                <div class="item"><a href="https://www.oschina.net/news/102714/google-opensource-jax#comments" target="_blank"><i class="comment outline icon"></i> 1</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/102714/google-opensource-jax" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/jax_GKZpF.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102616/didi-opensource-mpx" target="_blank" title="滴滴开源小程序框架 Mpx ，致力于提高小程序开发体验">滴滴开源小程序框架 Mpx ，致力于提高小程序开发体验</a></h3>
        <div class="description">
            <p class="line-clamp">滴滴 WebApp 团队近日宣布开源 Mpx ，这是一款致力于提高小程序开发体验的增强型小程序框架。通过 Mpx ，开发者能够以最先进的 web 开发体验 (Vue + Webpack) 来开发生产性能深度优化的小程序...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">2018/12/12 08:35</div>
                <div class="item"><a href="https://www.oschina.net/news/102616/didi-opensource-mpx#comments" target="_blank"><i class="comment outline icon"></i> 12</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/102616/didi-opensource-mpx" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/mpx_kfPK9.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102615/etcd-joined-cncf" target="_blank" title="key-value 存储系统 etcd 加入 CNCF 沙箱孵化器">key-value 存储系统 etcd 加入 CNCF 沙箱孵化器</a></h3>
        <div class="description">
            <p class="line-clamp">在周二举行的 CNCF KubeCon + CloudNativeCon North America 2018 大会上，CNCF 透露 etcd 已加入 CNCF 沙箱孵化器。 etcd 是一个分布式一致性键值存储系统，用于共享配置和服务发现，专注于...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">2018/12/12 08:35</div>
                <div class="item"><a href="https://www.oschina.net/news/102615/etcd-joined-cncf#comments" target="_blank"><i class="comment outline icon"></i> 5</a></div>
            </div>
        </div>
    </div>
        </div>
            </div>
    <div class="page-load-status">
        <p class="infinite-scroll-request">
            <i class="ui active small inline loader"></i>
        </p>
        <p class="infinite-scroll-last">没有更多内容</p>
        <p class="infinite-scroll-error">加载失败，请刷新页面</p>
    </div>
    <a class="ui fluid button load-more-button" style="display: none">加载更多</a>
                <p class="pagination">
            <a class="industry-pagination pagination__next" style="display: none" href="/news/widgets/_news_index_industry_list?p=2&type=ajax">下一页</a>
        </p>
                </div>
            <div class="ui basic segment  tab article-list" data-tab="programmingLanguageNewsList" id="programmingLanguageNewsList">
                


     

    <div class="ui very relaxed items list-container news-list-container">
                                                        
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103824/java8-update-charge" target="_blank" title="2019年1月已到，Java 8 要收费了吗？">2019年1月已到，Java 8 要收费了吗？</a></h3>
        <div class="description">
            <p class="line-clamp">根据此前开源中国发起的 Java 版本使用调查，国内的 Java 主力版本仍是 Java 8，有近 70% 的用户表示仍在使用 Java 8。所以对于「Java 8 是否要收费」这个问题，十分有必要阐述清楚，以消除不...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/hardbone" target="_blank">局长</a></div>
                <div class="item">01/22 08:31</div>
                <div class="item"><a href="https://www.oschina.net/news/103824/java8-update-charge#comments" target="_blank"><i class="comment outline icon"></i> 72</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/103824/java8-update-charge" target="_blank">
            <img src="https://static.oschina.net/img/logo/java.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103441/typescript-roadmap-2019" target="_blank" title="TypeScript 2019 路线图：更效率，更易用！">TypeScript 2019 路线图：更效率，更易用！</a></h3>
        <div class="description">
            <p class="line-clamp">TypeScript 开发团队刚刚发布了 TypeScript 2019 上半年的发展路线图。2019年1月至6月，开发团队将重点关注以下目标： 覆盖更多 JS 开发者 提高生产力 改善用户体验 提高社区参与度 完善基础...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">01/09 08:10</div>
                <div class="item"><a href="https://www.oschina.net/news/103441/typescript-roadmap-2019#comments" target="_blank"><i class="comment outline icon"></i> 12</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/103441/typescript-roadmap-2019" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/typescript_NRQf1.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103411/jdk12-new-jep-list" target="_blank" title="Java 12 将于3月19日发布，8 个最终 JEP 一览">Java 12 将于3月19日发布，8 个最终 JEP 一览</a></h3>
        <div class="description">
            <p class="line-clamp">JDK 12 已于2018年12月进入 Rampdown Phase One 阶段，这意味着该版本所有新的功能特性被冻结，不会再加入更多的 JEP 。该阶段将持续一个月，主要修复 P1-P3 级错误。JDK 12 定于2019年3月1...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">01/08 08:35</div>
                <div class="item"><a href="https://www.oschina.net/news/103411/jdk12-new-jep-list#comments" target="_blank"><i class="comment outline icon"></i> 51</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/103411/jdk12-new-jep-list" target="_blank">
            <img src="https://static.oschina.net/img/logo/java.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103409/red-language-2019-roadmap" target="_blank" title="Red 编程语言 2019 开发计划：全速前进！">Red 编程语言 2019 开发计划：全速前进！</a></h3>
        <div class="description">
            <p class="line-clamp">Red 编程语言开发团队昨日发布了一篇 “Full steam ahead” 的文章，对其 2018 年的发展进行了总结，并概述了其 2019 年开发计划。 文中写道，2018 对 Red 编程语言来说是艰难的一年，像过山...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">01/08 08:31</div>
                <div class="item"><a href="https://www.oschina.net/news/103409/red-language-2019-roadmap#comments" target="_blank"><i class="comment outline icon"></i> 11</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/103409/red-language-2019-roadmap" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/redlang_5lXhC.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103355/tiobe-program-language-2018" target="_blank" title="8 年后重登王座，Python 再度成为 TIOBE 年度编程语言">8 年后重登王座，Python 再度成为 TIOBE 年度编程语言</a></h3>
        <div class="description">
            <p class="line-clamp">全球知名的编程语言流行度排行榜网站 TIOBE 于昨日宣布：Python 成为 2018 年度编程语言，理由如下： 2018 年，Python 语言上升了 3.62％ ，其次是 Visual Basic .NET（+3.20%） 和 Java（+...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">01/06 08:11</div>
                <div class="item"><a href="https://www.oschina.net/news/103355/tiobe-program-language-2018#comments" target="_blank"><i class="comment outline icon"></i> 34</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/103355/tiobe-program-language-2018" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/python_wqlVN.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103353/php-5-6-end-of-life" target="_blank" title="PHP 5.6 已结束安全支持，你升级到 PHP 7 系列了吗？">PHP 5.6 已结束安全支持，你升级到 PHP 7 系列了吗？</a></h3>
        <div class="description">
            <p class="line-clamp">PHP 官网近日更新了版本支持列表，自2019年1月1日起，PHP 5.6 已不再受官方支持，使用 PHP 5.6 版本的网站将不再收到安全漏洞或错误更新。此外，PHP 7.0 也已于2018年12月1日结束安全支持。 ...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">01/06 08:06</div>
                <div class="item"><a href="https://www.oschina.net/news/103353/php-5-6-end-of-life#comments" target="_blank"><i class="comment outline icon"></i> 20</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/103353/php-5-6-end-of-life" target="_blank">
            <img src="https://static.oschina.net/img/logo/php.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/103330/project-drop-python2-support" target="_blank" title="迁移潮来袭！数十个项目宣布即将停止支持 Python 2">迁移潮来袭！数十个项目宣布即将停止支持 Python 2</a></h3>
        <div class="description">
            <p class="line-clamp">之前我们曾报道过 Python 2.7 将于 2020 年退休的消息，随着该时间节点的临近，已陆续有一大批 Python 项目宣布将在 2020 年之前放弃对 Python 2.7 的支持，包括 pandas、Zulip、IPython、N...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">01/05 07:56</div>
                <div class="item"><a href="https://www.oschina.net/news/103330/project-drop-python2-support#comments" target="_blank"><i class="comment outline icon"></i> 7</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/103330/project-drop-python2-support" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/python_wqlVN.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102915/python-programming-language-gets-new-governance-model" target="_blank" title="Python 编程语言实行尽可能成熟、稳定的新管理模式">Python 编程语言实行尽可能成熟、稳定的新管理模式</a></h3>
        <div class="description">
            <p class="line-clamp">在创始人和首席执行官 Guido van Rossum 辞去 BDFL 后，Python 软件基金会已经确定了 Python 的新管理模式。 新管理模型将依赖于一个由五人组成的指导委员会来建立标准实践，以便为 Python 引...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                <div class="item">2018/12/22 07:32</div>
                <div class="item"><a href="https://www.oschina.net/news/102915/python-programming-language-gets-new-governance-model#comments" target="_blank"><i class="comment outline icon"></i> 3</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/102915/python-programming-language-gets-new-governance-model" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/python_wqlVN.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102889/8-reasons-python-sucks" target="_blank" title="Python 太糟糕了？开发者总结了 8 大原因">Python 太糟糕了？开发者总结了 8 大原因</a></h3>
        <div class="description">
            <p class="line-clamp">有开发者发文表达了他觉得 Python 不行的 8 大原因。 作者对每一项“缺点”都进行了分析，全文洋洋洒洒，概括起来 8 个原因分别是： 1、版本不兼容 Python 3 与 Python 2 不完全兼容。作者以...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">2018/12/21 08:00</div>
                <div class="item"><a href="https://www.oschina.net/news/102889/8-reasons-python-sucks#comments" target="_blank"><i class="comment outline icon"></i> 70</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/102889/8-reasons-python-sucks" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/python_wqlVN.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102830/python-governance-vote-results" target="_blank" title="PEP 8016 获胜，成为新的 Python 社区治理方案">PEP 8016 获胜，成为新的 Python 社区治理方案</a></h3>
        <div class="description">
            <p class="line-clamp">随着 Python 之父 Guido van Rossum 逐步卸任 BDFL，Python（CPython）的未来之路牵动了万千开发者的心。没了首领，Python 今后的发展会怎么样？社区将如何运作？谁来领导 Python 这门语言和...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">2018/12/19 07:58</div>
                <div class="item"><a href="https://www.oschina.net/news/102830/python-governance-vote-results#comments" target="_blank"><i class="comment outline icon"></i> 8</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/102830/python-governance-vote-results" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/python_wqlVN.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102547/pypl-dec-language-index" target="_blank" title="Python 成功上位，正逐渐与 Java 拉开差距">Python 成功上位，正逐渐与 Java 拉开差距</a></h3>
        <div class="description">
            <p class="line-clamp">在前几天发布的 TIOBE 12 月编程语言榜中，Python 以 8.376% 的份额挤下 C++ 重回季军位置。 而在另一个非常流行的参考指标 PYPL 编程语言指数榜中，Python 有着更为优秀的成绩。自今年 5 月...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">2018/12/10 08:04</div>
                <div class="item"><a href="https://www.oschina.net/news/102547/pypl-dec-language-index#comments" target="_blank"><i class="comment outline icon"></i> 73</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/102547/pypl-dec-language-index" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/python_wqlVN.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102290/go2-here-we-come" target="_blank" title="Go 语言的下一个大版本：Go 2.0 被安排上了！">Go 语言的下一个大版本：Go 2.0 被安排上了！</a></h3>
        <div class="description">
            <p class="line-clamp">今年 8 月 Go 开发团队公布了 Go 2.0 的设计草案，包括错误处理和泛型这两大主题。现在备受瞩目的 Go 2.0 又有了新动向 —— 昨日 Go 开发团队在其官方博客表示，Go 2 已经被安排上了！目前 ...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/hardbone" target="_blank">局长</a></div>
                <div class="item">2018/12/01 08:08</div>
                <div class="item"><a href="https://www.oschina.net/news/102290/go2-here-we-come#comments" target="_blank"><i class="comment outline icon"></i> 31</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/102290/go2-here-we-come" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/go_uuLn3.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102289/a-new-look-for-rust-lang-org" target="_blank" title="Rust 全新官网已上线测试，这样的风格你喜欢吗？">Rust 全新官网已上线测试，这样的风格你喜欢吗？</a></h3>
        <div class="description">
            <p class="line-clamp">是的，Rust 那个万年不变的“极简主义”风格官网要改版了，目前 beta 版已上线测试，https://beta.rust-lang.org/ —— 大家可以点击这里体验三分钟。 可以看到，新版的官网采用了全新的视觉...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/hardbone" target="_blank">局长</a></div>
                <div class="item">2018/12/01 08:08</div>
                <div class="item"><a href="https://www.oschina.net/news/102289/a-new-look-for-rust-lang-org#comments" target="_blank"><i class="comment outline icon"></i> 9</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/102289/a-new-look-for-rust-lang-org" target="_blank">
            <img src="https://static.oschina.net/img/logo/rust.gif" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102119/jcp-2018-alibaba-elected-ratified-seats" target="_blank" title="阿里巴巴连任 Java 全球管理组织席位">阿里巴巴连任 Java 全球管理组织席位</a></h3>
        <div class="description">
            <p class="line-clamp">11 月 23 日，阿里巴巴宣布连任 Java 全球管理组织 JCP 最高执行委员会委员，任期从 2018 年 12 月 4 号开始，为期两年。 阿里表示，这意味将有更多中国开发者的声音被引入 Java 规范的制定中...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">2018/11/26 08:05</div>
                <div class="item"><a href="https://www.oschina.net/news/102119/jcp-2018-alibaba-elected-ratified-seats#comments" target="_blank"><i class="comment outline icon"></i> 14</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/102119/jcp-2018-alibaba-elected-ratified-seats" target="_blank">
            <img src="https://static.oschina.net/img/logo/java.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102013/calibre-wont-convert-to-python3" target="_blank" title="不兼容惹的祸，Calibre 作者拒绝迁移至 Python 3">不兼容惹的祸，Calibre 作者拒绝迁移至 Python 3</a></h3>
        <div class="description">
            <p class="line-clamp">开源电子书管理器 Calibre 的作者 Kavid Goyal 近日公开了自己在 2017 年对用户要求升级至 Python 3 的回应，以表明 Calibre 不会直接迁移至 Python 3 的态度。 2017年8月，有用户提交反馈称...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">2018/11/22 08:21</div>
                <div class="item"><a href="https://www.oschina.net/news/102013/calibre-wont-convert-to-python3#comments" target="_blank"><i class="comment outline icon"></i> 13</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/102013/calibre-wont-convert-to-python3" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/calibre_MTjz4.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/102011/welcoming-women-pythons-founder" target="_blank" title="不再管事的 Python 之父，最近在做些什么？">不再管事的 Python 之父，最近在做些什么？</a></h3>
        <div class="description">
            <p class="line-clamp">今年7月，Python 创始人 Guido van Rossum 宣布完全脱离决策层，不再担任 Python 社区的 BDFL 。Guido 的退出，让许多 Python 爱好者感到遗憾，但对于他本人而言，似乎是一种解脱。 据福布斯...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">2018/11/22 08:19</div>
                <div class="item"><a href="https://www.oschina.net/news/102011/welcoming-women-pythons-founder#comments" target="_blank"><i class="comment outline icon"></i> 21</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/102011/welcoming-women-pythons-founder" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/python_wqlVN.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/101979/python-be-official-language" target="_blank" title="Python 或将成为法国高中的官方编程教学语言">Python 或将成为法国高中的官方编程教学语言</a></h3>
        <div class="description">
            <p class="line-clamp">Python 或将成为法国高中的官方编程教学语言，这将带来几十万甚至几百万的新用户。此消息来自 Nina ，她是微软云开发的倡导者（Cloud Developer Advocate）、资深软件开发者、pythonista（P...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">2018/11/21 08:14</div>
                <div class="item"><a href="https://www.oschina.net/news/101979/python-be-official-language#comments" target="_blank"><i class="comment outline icon"></i> 18</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/101979/python-be-official-language" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/python_wqlVN.png" data-img-render>
        </a>
    </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/101976/lisp-became-gods-programming-language" target="_blank" title="Lisp 是怎么成为上帝的编程语言的">Lisp 是怎么成为上帝的编程语言的</a></h3>
        <div class="description">
            <p class="line-clamp">本文来自：Linux 中国 LCTT https://linux.cn/article-10255-1.html 译者： Northurland 编译自：https://twobithistory.org/2018/10/14/lisp.html 作者： Two-bit History 当程序员们谈论各...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/mrtudou" target="_blank">王练</a></div>
                <div class="item">2018/11/21 08:10</div>
                <div class="item"><a href="https://www.oschina.net/news/101976/lisp-became-gods-programming-language#comments" target="_blank"><i class="comment outline icon"></i> 27</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/101798/amazon-corretto" target="_blank" title="Java 免费！亚马逊开源 Java SE 发行版的直接替代品 Corretto">Java 免费！亚马逊开源 Java SE 发行版的直接替代品 Corretto</a></h3>
        <div class="description">
            <p class="line-clamp">14 日亚马逊发文宣布 Amazon Corretto 的预览版，这是一个免费的、跨平台生产就绪的 OpenJDK 发行版。 这是亚马逊继前不久重申对 Amazon Linux 中的 Java 进行长期支持后，其对 Java 用户提供...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                <div class="item">2018/11/15 06:14</div>
                <div class="item"><a href="https://www.oschina.net/news/101798/amazon-corretto#comments" target="_blank"><i class="comment outline icon"></i> 31</a></div>
            </div>
        </div>
    </div>
        </div>
                                    
<div class="item news-item">
    <div class="content">
        <h3 class="header"><a href="https://www.oschina.net/news/101715/go-is-9-years-old" target="_blank" title="Go 语言开源发布 9 周年！社区贡献指数创新高">Go 语言开源发布 9 周年！社区贡献指数创新高</a></h3>
        <div class="description">
            <p class="line-clamp">11月10日，Go 语言刚过完它9岁的生日。Go 社区发表了一篇博客记录了它一年的成长，并有多项数据显示，Go 语言受到了广大开发者的喜欢。部分数据如下： 喜爱程度 Stack Overflow 的 2018 年开...</p>
        </div>
        <div class="extra">
            <div class="ui horizontal list">
                <div class="item"><a href="https://my.oschina.net/u/2903254" target="_blank">达尔文</a></div>
                <div class="item">2018/11/12 08:15</div>
                <div class="item"><a href="https://www.oschina.net/news/101715/go-is-9-years-old#comments" target="_blank"><i class="comment outline icon"></i> 9</a></div>
            </div>
        </div>
    </div>
                <a class="ui small image" href="https://www.oschina.net/news/101715/go-is-9-years-old" target="_blank">
            <img src="https://static.oschina.net/uploads/logo/go_uuLn3.png" data-img-render>
        </a>
    </div>
            </div>
    <div class="page-load-status">
        <p class="infinite-scroll-request">
            <i class="ui active small inline loader"></i>
        </p>
        <p class="infinite-scroll-last">没有更多内容</p>
        <p class="infinite-scroll-error">加载失败，请刷新页面</p>
    </div>
    <a class="ui fluid button load-more-button" style="display: none">加载更多</a>
                <p class="pagination">
            <a class="programming-language-pagination pagination__next" style="display: none" href="/news/widgets/_news_index_programming_language_list?p=2&type=ajax">下一页</a>
        </p>
                </div>
        </div>
        <div class="four wide computer five wide tablet sixteen wide mobile column sidebar news-sidebar" style="padding-top:15px;">
            
    <div class="section articles-list">
        <div class="ui items">
            <h3 class="ui header">热门资讯</h3>
                                                <div class="item">
                        <div class="content">
                            <a class="header" href="https://www.oschina.net/news/103996/introduce-polarphp">polarphp 0.0.1 alpha 发布：全新 PHP 运行时环境</a>
                            <div class="extra">
                                <div class="ui horizontal mini list">
                                    <div class="item"><a href="https://my.oschina.net/polarphp" target="_blank">polarphp</a></div>
                                    <div class="item">01/28 06:52</div>
                                    <div class="item"><a href="https://www.oschina.net/news/103996/introduce-polarphp#comments" target="_blank"><i class="comment outline icon"></i> 51 评论</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                                                                <div class="item">
                        <div class="content">
                            <a class="header" href="https://www.oschina.net/news/103946/google-asks-court-to-end-oracle-suit">Google 的最后努力 ：请求最高法院撤回 88 亿罚单</a>
                            <div class="extra">
                                <div class="ui horizontal mini list">
                                    <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                                    <div class="item">01/26 07:51</div>
                                    <div class="item"><a href="https://www.oschina.net/news/103946/google-asks-court-to-end-oracle-suit#comments" target="_blank"><i class="comment outline icon"></i> 79 评论</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                                                                <div class="item">
                        <div class="content">
                            <a class="header" href="https://www.oschina.net/news/104016/ali-blink-officially-open-source">阿里 Blink 正式开源，重要优化点解读</a>
                            <div class="extra">
                                <div class="ui horizontal mini list">
                                    <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                                    <div class="item">01/28 08:49</div>
                                    <div class="item"><a href="https://www.oschina.net/news/104016/ali-blink-officially-open-source#comments" target="_blank"><i class="comment outline icon"></i> 16 评论</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                                                                <div class="item">
                        <div class="content">
                            <a class="header" href="https://www.oschina.net/news/103958/spring-tools-4-1-1-released">Spring Tools 4.1.1 发布，针对 Spring 应用的开发环境</a>
                            <div class="extra">
                                <div class="ui horizontal mini list">
                                    <div class="item"><a href="https://my.oschina.net/hardbone" target="_blank">局长</a></div>
                                    <div class="item">01/26 08:34</div>
                                    <div class="item"><a href="https://www.oschina.net/news/103958/spring-tools-4-1-1-released#comments" target="_blank"><i class="comment outline icon"></i> 13 评论</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                                                                <div class="item">
                        <div class="content">
                            <a class="header" href="https://www.oschina.net/news/104031/virtualbox-6-0-4-released">VirtualBox 6.0.4 发布，支持上海兆芯 CPU</a>
                            <div class="extra">
                                <div class="ui horizontal mini list">
                                    <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                                    <div class="item">01/29 07:18</div>
                                    <div class="item"><a href="https://www.oschina.net/news/104031/virtualbox-6-0-4-released#comments" target="_blank"><i class="comment outline icon"></i> 8 评论</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                                                                <div class="item">
                        <div class="content">
                            <a class="header" href="https://www.oschina.net/news/104046/didi-open-sourced-chameleon">滴滴开源跨平台统一 MVVM 框架 Chameleon</a>
                            <div class="extra">
                                <div class="ui horizontal mini list">
                                    <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                                    <div class="item">01/29 08:25</div>
                                    <div class="item"><a href="https://www.oschina.net/news/104046/didi-open-sourced-chameleon#comments" target="_blank"><i class="comment outline icon"></i> 12 评论</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                                                                <div class="item">
                        <div class="content">
                            <a class="header" href="https://www.oschina.net/news/104043/mozilla-should-give-up-on-firefox-and-go-with-chromium">微软工程师认为 Mozilla 也应该拥抱 Chromium</a>
                            <div class="extra">
                                <div class="ui horizontal mini list">
                                    <div class="item"><a href="https://my.oschina.net/hardbone" target="_blank">局长</a></div>
                                    <div class="item">01/29 08:20</div>
                                    <div class="item"><a href="https://www.oschina.net/news/104043/mozilla-should-give-up-on-firefox-and-go-with-chromium#comments" target="_blank"><i class="comment outline icon"></i> 40 评论</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                                                                <div class="item">
                        <div class="content">
                            <a class="header" href="https://www.oschina.net/news/104042/yodaos-node-js-operate-system">YodaOS: 一个属于 Node.js 社区的操作系统</a>
                            <div class="extra">
                                <div class="ui horizontal mini list">
                                    <div class="item"><a href="https://my.oschina.net/chengsixgold" target="_blank">程六金</a></div>
                                    <div class="item">01/29 08:14</div>
                                    <div class="item"><a href="https://www.oschina.net/news/104042/yodaos-node-js-operate-system#comments" target="_blank"><i class="comment outline icon"></i> 8 评论</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                                                                <div class="item">
                        <div class="content">
                            <a class="header" href="https://www.oschina.net/news/104085/hunt-framework-2-0-0-released">Hunt framework 2.0.0 发布，简单且高性能的 Web 服务框架</a>
                            <div class="extra">
                                <div class="ui horizontal mini list">
                                    <div class="item"><a href="https://my.oschina.net/jiaqing" target="_blank">冰力</a></div>
                                    <div class="item">前天 17:12</div>
                                    <div class="item"><a href="https://www.oschina.net/news/104085/hunt-framework-2-0-0-released#comments" target="_blank"><i class="comment outline icon"></i> 11 评论</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                                                                <div class="item">
                        <div class="content">
                            <a class="header" href="https://www.oschina.net/news/104076/dot-net-core-3-preview-2-released">.NET Core 3 Preview 2 发布，C# 8 更强大的模式匹配</a>
                            <div class="extra">
                                <div class="ui horizontal mini list">
                                    <div class="item"><a href="https://my.oschina.net/u/3820517" target="_blank">h4cd</a></div>
                                    <div class="item">前天 08:18</div>
                                    <div class="item"><a href="https://www.oschina.net/news/104076/dot-net-core-3-preview-2-released#comments" target="_blank"><i class="comment outline icon"></i> 41 评论</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                                    </div>
    </div>

    <div class="section wonderful-comments">
        <h3 class="ui header">精彩评论</h3>
        <div class="ui feed">
                                                                        <div class="event">
                            <div class="label">
                                <a href="https://my.oschina.net/u/730092" title="光的交响乐" target="_blank">
                                                        <div class="osc-avatar small-portrait _35x35" title="光的交响乐" data-user-id="730092">
            <img src="https://oscimg.oschina.net/oscnet/up-e2d554c28a731b14c7ed06b58c927e15.jpg!/both/50x50?t=1420778724000" alt="光的交响乐" title="光的交响乐"/>
        </div>
                                            </a>
                            </div>
                            <div class="content">
                                <div class="summary">
                                    <a class="user">光的交响乐</a>
                                    <div class="date"></div>
                                </div>
                                <div class="extra text" data-emoji-render>
                                    苹果将推出 Swift 2.0 编程语言，应用容量将变小 oschina 2015/05/24 19
                                </div>
                                <div class="meta">
                                    <a href="https://www.oschina.net/news/104105/apple-swift-5-update-ios-12-2">Swift 5 将进一步减小 iOS 应用安装包大小</a>
                                </div>
                            </div>
                        </div>
                                                                                                            <div class="event">
                            <div class="label">
                                <a href="https://my.oschina.net/u/4060171" title="OSC_OlsyZw" target="_blank">
                                                        <div class="osc-avatar small-portrait _35x35" title="OSC_OlsyZw" data-user-id="4060171">
            <span class="text-portrait" style="background: #f39c12">O</span>
        </div>
                                            </a>
                            </div>
                            <div class="content">
                                <div class="summary">
                                    <a class="user">OSC_OlsyZw</a>
                                    <div class="date"></div>
                                </div>
                                <div class="extra text" data-emoji-render>
                                    从入门到再次入门。不仅swift之间还兼容，我们和swift也不兼容。
                                </div>
                                <div class="meta">
                                    <a href="https://www.oschina.net/news/104105/apple-swift-5-update-ios-12-2">Swift 5 将进一步减小 iOS 应用安装包大小</a>
                                </div>
                            </div>
                        </div>
                                                                                                            <div class="event">
                            <div class="label">
                                <a href="https://my.oschina.net/u/3119338" title="polly-wowo" target="_blank">
                                                        <div class="osc-avatar small-portrait _35x35" title="polly-wowo" data-user-id="3119338">
            <img src="https://static.oschina.net/uploads/user/1559/3119338_50.jpg?t=1481158739000" alt="polly-wowo" title="polly-wowo"/>
        </div>
                                            </a>
                            </div>
                            <div class="content">
                                <div class="summary">
                                    <a class="user">polly-wowo</a>
                                    <div class="date"></div>
                                </div>
                                <div class="extra text" data-emoji-render>
                                    每天工作在text界面的我，惊得是目瞪口呆
                                </div>
                                <div class="meta">
                                    <a href="https://www.oschina.net/news/104107/open-source-means-okay">开源就意味着好吗？AMD 驱动烂 VS AMD 驱动不烂</a>
                                </div>
                            </div>
                        </div>
                                                                                                            <div class="event">
                            <div class="label">
                                <a href="https://my.oschina.net/eechen" title="eechen" target="_blank">
                                                        <div class="osc-avatar small-portrait _35x35" title="eechen" data-user-id="561214">
            <img src="https://static.oschina.net/uploads/user/280/561214_50.jpeg?t=1474368642000" alt="eechen" title="eechen"/>
        </div>
                                            </a>
                            </div>
                            <div class="content">
                                <div class="summary">
                                    <a class="user">eechen</a>
                                    <div class="date"></div>
                                </div>
                                <div class="extra text" data-emoji-render>
                                    希望这门语言的语法糖越多越好,反正我又不用,脑壳疼的又不是我.
                                </div>
                                <div class="meta">
                                    <a href="https://www.oschina.net/news/104076/dot-net-core-3-preview-2-released">.NET Core 3 Preview 2 发布，C# 8 更强大的模式匹配</a>
                                </div>
                            </div>
                        </div>
                                                                                                            <div class="event">
                            <div class="label">
                                <a href="https://my.oschina.net/u/3952994" title="yozoco" target="_blank">
                                                        <div class="osc-avatar small-portrait _35x35" title="yozoco" data-user-id="3952994">
            <span class="text-portrait" style="background: #c0392b">y</span>
        </div>
                                            </a>
                            </div>
                            <div class="content">
                                <div class="summary">
                                    <a class="user">yozoco</a>
                                    <div class="date"></div>
                                </div>
                                <div class="extra text" data-emoji-render>
                                    应该叫复杂臃肿，速度慢的框架
                                </div>
                                <div class="meta">
                                    <a href="https://www.oschina.net/news/104062/laravel-5-7-24-released">Laravel 5.7.24 发布，简洁优雅的 PHP 开发框架</a>
                                </div>
                            </div>
                        </div>
                                                                                                            <div class="event">
                            <div class="label">
                                <a href="https://my.oschina.net/fenying" title="全体人员" target="_blank">
                                                        <div class="osc-avatar small-portrait _35x35" title="全体人员" data-user-id="1779409">
            <img src="https://static.oschina.net/uploads/user/889/1779409_50.jpg?t=1501767998000" alt="全体人员" title="全体人员"/>
        </div>
                                            </a>
                            </div>
                            <div class="content">
                                <div class="summary">
                                    <a class="user">全体人员</a>
                                    <div class="date"></div>
                                </div>
                                <div class="extra text" data-emoji-render>
                                    机器码走起？
                                </div>
                                <div class="meta">
                                    <a href="https://www.oschina.net/news/104076/dot-net-core-3-preview-2-released">.NET Core 3 Preview 2 发布，C# 8 更强大的模式匹配</a>
                                </div>
                            </div>
                        </div>
                                                                                                            <div class="event">
                            <div class="label">
                                <a href="https://my.oschina.net/keepwan" title="keep_wan" target="_blank">
                                                        <div class="osc-avatar small-portrait _35x35" title="keep_wan" data-user-id="2861476">
            <span class="text-portrait" style="background: #9b59b6">k</span>
        </div>
                                            </a>
                            </div>
                            <div class="content">
                                <div class="summary">
                                    <a class="user">keep_wan</a>
                                    <div class="date"></div>
                                </div>
                                <div class="extra text" data-emoji-render>
                                    照你这么说汇编语法糖不多。学习成本也不高。 高级语言不都是语法糖。问题是没语法糖的语言你驾驭的了吗
                                </div>
                                <div class="meta">
                                    <a href="https://www.oschina.net/news/104076/dot-net-core-3-preview-2-released">.NET Core 3 Preview 2 发布，C# 8 更强大的模式匹配</a>
                                </div>
                            </div>
                        </div>
                                                                                                            <div class="event">
                            <div class="label">
                                <a href="https://my.oschina.net/u/3181526" title="Jason909" target="_blank">
                                                        <div class="osc-avatar small-portrait _35x35" title="Jason909" data-user-id="3181526">
            <span class="text-portrait" style="background: #f1c40f">J</span>
        </div>
                                            </a>
                            </div>
                            <div class="content">
                                <div class="summary">
                                    <a class="user">Jason909</a>
                                    <div class="date"></div>
                                </div>
                                <div class="extra text" data-emoji-render>
                                    标准束缚发现？我没看错吧？现在让火狐放弃gecko，等哪天谷歌内核不行了，能从石头里蹦出一个替代品？这跟读书的时候不准谈恋爱，毕业了催着结婚有什么区别？
                                </div>
                                <div class="meta">
                                    <a href="https://www.oschina.net/news/104043/mozilla-should-give-up-on-firefox-and-go-with-chromium">微软工程师认为 Mozilla 也应该拥抱 Chromium</a>
                                </div>
                            </div>
                        </div>
                                                                                                            <div class="event">
                            <div class="label">
                                <a href="https://my.oschina.net/qw3670" title="韦小仇" target="_blank">
                                                        <div class="osc-avatar small-portrait _35x35" title="韦小仇" data-user-id="3284390">
            <img src="https://static.oschina.net/uploads/user/1642/3284390_50.jpeg?t=1487568736000" alt="韦小仇" title="韦小仇"/>
        </div>
                                            </a>
                            </div>
                            <div class="content">
                                <div class="summary">
                                    <a class="user">韦小仇</a>
                                    <div class="date"></div>
                                </div>
                                <div class="extra text" data-emoji-render>
                                    上海兆芯 是 台湾威盛电子 和 上海国资委 成立的合资公司，台湾威盛在1999年收购了Cyrix，而Cyrix与AMD一起，在IBM如日中天的那个时代曾经共同获得过intel的x86指令集授权（说到x86授权，其实这部分授权早就已经到期，美国联邦贸易委员会出于反垄断目的，延长了这部分授权直到2018年4月。所以技术上来说，上海兆芯的CPU可以兼容2018年4月之前的intel x86指令集）。所以上海兆芯可以合法生产x86（或者说兼容x86指令集的）处理器。当然要严格说起来就比较复杂了，比如该CPU具体的性能如何？2018年4月之后出现的新指令集怎么兼容？子公司能否无条件继承母公司的专利权？这些都不好说
                                </div>
                                <div class="meta">
                                    <a href="https://www.oschina.net/news/104031/virtualbox-6-0-4-released">VirtualBox 6.0.4 发布，支持上海兆芯 CPU</a>
                                </div>
                            </div>
                        </div>
                                                                                                            <div class="event">
                            <div class="label">
                                <a href="https://my.oschina.net/raindroid" title="五毛程序员" target="_blank">
                                                        <div class="osc-avatar small-portrait _35x35" title="五毛程序员" data-user-id="1781451">
            <img src="https://oscimg.oschina.net/oscnet/up-rfctp5tv7ss60m6ykfkw8opgt54jb2p6.jpg!/both/50x50?t=1534440233000" alt="五毛程序员" title="五毛程序员"/>
        </div>
                                            </a>
                            </div>
                            <div class="content">
                                <div class="summary">
                                    <a class="user">五毛程序员</a>
                                    <div class="date"></div>
                                </div>
                                <div class="extra text" data-emoji-render>
                                    皇军让我给您带个话儿，只要你能够投降皇军，xxx
                                </div>
                                <div class="meta">
                                    <a href="https://www.oschina.net/news/104043/mozilla-should-give-up-on-firefox-and-go-with-chromium">微软工程师认为 Mozilla 也应该拥抱 Chromium</a>
                                </div>
                            </div>
                        </div>
                                                        </div>
    </div>
        </div>
    </div>
</div>

<link rel="stylesheet" href="https://static.oschina.net/new-osc/css/swiper-4.1.0.min.css"/>

                        <div name="channel_index_footer"  data-traceid="channel_index"
                 data-tracepid="channel_index_footer" >
                <style>
    .float-adbox {display:none;position:fixed;left:15px;bottom:15px;z-index: 10001;}
    .float-adbox .float-people {width: 180px;}
    .float-adbox .close-left {position:absolute;top:10px;left:10px;cursor:pointer;}
</style>
<div class='float-adbox'>
    <a href='https://gitee.com/gitee-stars/13?from=osc-gj' target='_blank'>
        <img alt="13_float_left_people" class="float-people" src="https://oscimg.oschina.net/oscnet/86fd87c8d49b94194d2873ab971b6d1a168.jpg" />
        <img alt="13_float_left_close" class="close-left" src="https://oscimg.oschina.net/oscnet/969618cc4eaaff952fc3d03a00d6e85cfdf.jpg" />
    </a>
</div>
<!-- <script src="https://www.oschina.net/public/bower_components/jquery/dist/jquery.min.js"></script> -->
<script src="https://www.oschina.net/uploads/js.cookie.min.js"></script>
<script>
    (function () {
        function loadScript(src, callback) {
            var script = document.createElement('script'),
                head = document.getElementsByTagName('head')[0];
            script.type = 'text/javascript';
            script.charset = 'UTF-8';
            script.src = src;
            if (script.addEventListener) {
                script.addEventListener('load', function () {
                    callback();
                }, false);
            } else if (script.attachEvent) {
                script.attachEvent('onreadystatechange', function () {
                    var target = window.event.srcElement;
                    if (target.readyState == 'loaded') {
                        callback();
                    }
                });
            }
            head.appendChild(script);
        }
        function loadAd() {
            var leftPeople = $('.float-adbox');
            var cookieName = 'visit-gitee-stars-bts-13-190108';
            var isVisit = Cookies.get(cookieName);
            if (isVisit == 1) {
                leftPeople.hide();
            } else {
                leftPeople.show();
            }
            $('.close-left').on('click', function (e) {
                e.preventDefault();
                Cookies.set(cookieName, 1, { expires: 90, path: '/' });
                leftPeople.slideUp();
            });
        }
        if (window.jQuery) {
            loadAd();
        } else {
            loadScript('https://www.oschina.net/public/bower_components/jquery/dist/jquery.min.js', function () {
                loadAd();
            });
        }
    })();
</script>

            </div>
                
            </div>
        </div>

                <div id="footer" class="ui vertical footer segment mb-hide">
    <div class="ui container">
        <div class="ui grid">
            <div class="eight wide mobile four wide tablet four wide computer column">
                <h4 class="ui header">开源中国社区</h4>
                <div class="ui link list">
                    <a class="item" href="https://www.oschina.net/home/aboutosc" target="_blank">关于我们</a>
                    <a class="item" href="https://www.oschina.net/home/aboutosc" target="_blank">联系我们</a>
                    <a class="item" href="https://www.oschina.net/home/aboutosc#partners#" target="_blank">合作伙伴</a>
                    <a class="item" href="https://www.oschina.net/openapi" target="_blank">Open API</a>
                </div>
            </div>
            <div class="eight wide mobile four wide tablet four wide computer column">
                <h4 class="ui header">在线工具</h4>
                <div class="ui link list">
                    <a class="item" href="https://gitee.com/?from=osc-bottom" target="_blank">码云 Gitee.com</a>
                    <a class="item" href="https://gitee.com/enterprises?from=osc-bottom" target="_blank">企业研发管理</a>
                    <a class="item" href="https://copycat.gitee.com/?from=osc-bottom" target="_blank">CopyCat-代码克隆检测</a>
                    <a class="item" href="https://tool.oschina.net" target="_blank">实用在线工具</a>
                </div>
            </div>
            <div class="center aligned eight wide mobile two wide tablet two wide computer column">
                <h4 class="ui header">微信公众号</h4>
                <img src="https://static.oschina.net/new-osc/img/wechat_qrcode.jpg?t=1484694603000" alt="微信公众号"/>
            </div>
            <div class="center aligned eight wide mobile six wide tablet six wide computer column">
                <h3 class="ui header">开源中国 APP</h3>
                <p>聚合全网技术文章，根据你的阅读喜好进行个性推荐</p>
                <a href="https://www.oschina.net/app" target="_blank" class="ui large primary button">下载 APP</a>
            </div>
        </div>
    </div>
</div>
<div id="copyright">
    <div class="ui container">
        <div class="ui clearing basic segment">
            <div class="ui left floated horizontal link list">
                <div class="item">©开源中国(OSChina.NET)</div>
                <div class="item mb-hide">工信部</div>
                <a class="item mb-hide" href="http://www.copu.org.cn/" target="_blank" title="开源软件推进联盟">开源软件推进联盟</a>
                <div class="item mb-hide">指定官方社区</div>
            </div>
            <div class="ui right floated horizontal link list">
                <div class="item mb-hide">深圳市奥思网络科技有限公司版权所有</div>
                <a href="http://www.miitbeian.gov.cn/" target="_blank" class="item">粤ICP备12009483号-3</a>
            </div>
        </div>
    </div>
</div>    </div>
                                                        <div class="back-to-top back-to-top-toggle">
        <div class="icon"><img src="https://static.oschina.net/new-osc/img/icon/back-to-top.svg" alt="返回顶部"></div>
        <div class="text">顶部</div>
    </div>

        <script src="https://static.oschina.net/new-osc/js/utils/semantic-ui/semantic.min.js?t=1535098162000"></script>
    <script src="https://static.oschina.net/new-osc/js/utils/jweixin-1.2.0.js"></script>
                <script type="text/javascript" src="https://static.oschina.net/new-osc/dist/js/web.43bfe643.js"></script>                <script>
    (function(){
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https'){
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        }
        else{
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    })();
</script>
<script>
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?a411c4d1664dd70048ee98afe7b28f0b";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>
    </body>
</html>
<!-- Generated by oschina (init:2[ms],page:156[ms],ip:39.155.219.126) //-->
`;


const $ = cheerio.load(text);
$('#projectNewsList .news-item').each((i, el) => {
    console.log('##', $(el).find('.header a').attr('href'));
})