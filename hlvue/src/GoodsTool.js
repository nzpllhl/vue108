//自己写一个数据库,存放数据{key:value}
//{商品的id：商品的数量}
let obj = {}//存车商品
obj.savGoods = function (goodsList) {
    //{goodsList:'goodsList'}
    window.localStorage.setItem('goodsList', JSON.stringify(goodsList))
}

//获取所有的商品
obj.getGoodsList = function () {
    return JSON.parse(window.localStorage.getItem('goodsList') || '{}')
}
//删除数据
obj.removeGoods = function (id) {
    let goodsList = this.getGoodsList();
    delete goodsList[id]
    return this.saveGoods(goodsList)
}

//增加商品
obj.add = function (goods) {
    //先获取一下所有的商品
    let goodsList = this.getGoodsList()
    //增加商品的时候用id判断一下，如果同样的商品追+= 
    if (goodsList[goods.id]) {
        //有则追加
        goodsList[goods.id] += goods.num
    } else {
        //如果没有则直接赋值即可
        goodsList[goods.id] = goods.num
    }
    this.savGoods(goodsList);
}

//获取购物车的总数量
obj.getTotalCount = function () {
    //也是获取一下所有的
    let goodsList = this.getGoodsList();
    let values = Object.values(goodsList)
    let sum = 0//购物车小球的总数量 vv   nb4444fbb 
    values.forEach(val => sum += val);
    return sum
}
export default obj;