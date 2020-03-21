// ==UserScript==
// @icon            https://media.forgecdn.net/avatars/130/458/636460205549127215.png
// @name            cf模组下载助手
// @namespace       [url=mailto:1649991905@qq.com]1649991905@qq.com[/url]
// @author          纪华裕
// @description     curseforge模组快速下载
// @match           *://www.curseforge.com/minecraft/*
// @require         http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @version         0.0.1
// @grant           GM_addStyle
// @updateURL
// ==/UserScript==


var findurl = (str) => {
    const regex = /https:\/\/www\.curseforge\.com\/minecraft\/.+\/([0-9]+)/gm;
    let m;
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        return m[1];
    }
}
var findurl2 = (str) => {
    const regex = /https:\/\/edge\.forgecdn\.net\/(.+)/gm;
    let m;
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        return m[1];
    }
};

(async function () {
    'use strict';
    var addon = $('body > div.flex.flex-col.min-h-full.min-h-screen > main > div.z-0 > div.mx-auto.container.pb-5 > section > aside > div.my-4 > div > div:nth-child(1) > div.flex.flex-col.mb-3 > div:nth-child(1) > span:nth-child(2)')
    let addonid = addon[0].innerText;
    var url = $(".truncate");
    console.log(url)

    if (url) {
        for (let i = 0; i < url.length; i++) {
            let fileid = findurl(url[i].href);
            let url1 =await (await fetch(`https://cors-anywhere.herokuapp.com/https://addons-ecs.forgesvc.net/api/v2/addon/${addonid}/file/${fileid}/download-url`)).text()
            console.log(url1)
            url1 = "http://cf.mirror.jihuayu.site/"+findurl2(url1);
            let  j = `
                <div class="cf-recentfiles-credits-wrapper ml-auto my-auto">
                <a href="${url1}" class="button button--icon-only button--sidebar">
                    <span class="button__text">
                        <svg class="icon icon-fixed-width icon-margin" viewBox="0 0 20 20" width="16" height="16"><use xlink:href="/Content/2-0-7375-30488/Skins/CurseForge/images/twitch/Action/Download.svg#Action/Download"></use></svg>
                    </span>
                </a>
                </div>
`
            $('.cf-recentfiles-credits-wrapper').html(j);
        }
    }
})();

var videoTool = {
    //获取文件名
    getFileName: function (url, rule_start, rule_end) {
        var start = url.lastIndexOf(rule_start) + 1;
        var end = url.lastIndexOf(rule_end);
        return url.substring(start, end);
    },
    //弹出下载框
    download: function (videoUrl, name) {
        var content = "file content!";
        var data = new Blob([content], {
            type: "text/plain;charset=UTF-8"
        });
        var anchor = document.createElement("a");
        anchor.href = videoUrl;
        anchor.download = name;
        anchor.click();
        window.URL.revokeObjectURL(data);
    }
};
