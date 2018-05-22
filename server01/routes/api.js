var express = require('express');
var router = express.Router();
var request = require('request');

var countryList = null;// 汇率种类数据
var currencyObj = {} // 实时汇率数据

const appKey = 'fcfc3e8ec3786e71dd638de39e301d0b';

router.get('/getList', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    if (countryList == null) {
        request.get('http://op.juhe.cn/onebox/exchange/list?key=' + appKey, (err, resp, body) => {
            countryList = body;
            res.send(countryList);
            countryList.state = '来自本地';
        })
    } else {
        res.send(countryList);
    }
})

router.get('/currency', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    var from = req.query['from']
    var to = req.query['to']
    if (from === to) {
        res.send('传入相同货币！');
    }
    
    if (currencyObj[from+to] == null) {
        getCurrency(from, to).then((data)=> {
            var obj1 = JSON.parse(data);
            obj1.result.splice(1, 1);
            console.log(obj1)
            var obj2 = JSON.parse(data);
            obj2.result.splice(0, 1);
            console.log(obj2)
            currencyObj[from + to] = obj1
            currencyObj[to + from] = obj2
            res.send(currencyObj[to + from]);

            currencyObj[from + to].state = '来自本地';
            currencyObj[to + from].state = '来自本地';
        }).catch((err) => {
            res.send('error');
            console.log('请求实时汇率出错')
        });
    } else {
        res.send(currencyObj[from + to]);
    }
})

// 转换数据格式，把前台传的数据从对象格式转化为字符串格式。
function parseUrl (objs) {
    var str = '?';
    var obj = typeof objs === 'object'? objs : {};

    for(var i in obj) {
        str += i + '=' + obj[i] + '&'
    }
    return str.replace(/\&$/, '');
}

// 提取封装请求实时汇率的函数
function getCurrency(from, to) {
    return new Promise((resolve, reject) => {
        request.get('http://op.juhe.cn/onebox/exchange/currency?key=' + appKey + '&from=' + from + '&to=' + to, (err, resp, body) => {
            resolve(body);
        })
    })
}

// 批量获取汇率数据
function getAllCurr (cunturyArr) {
    var arr = [];
    // 两次循环，实际要执行 n(n-1)/2 次，3828，显然不可取
    for (var i = 0, len = cunturyArr.length; i < len; i++) {
        var item1 = cunturyArr[i];
        for (var j = 0; j < len - i; j++) {
            item2 = cunturyArr[j];
            arr.push(getCurrency(item1.code, item2.code));
        }
    }

    return Promise.all(arr);
}

// 互换数组位置方法
function record(arr, i = 0, n = 1) {
    var temp = arr[i], narr = arr;
    narr[i] = narr[n];
    narr[n] = temp;
    return narr;
}

module.exports = router;