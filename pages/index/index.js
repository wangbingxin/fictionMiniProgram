//index.js
//获取应用实例
const app = getApp()

import { request } from '../../utils/util'
import { getRecommend, getClickRank, getSubscribeRank, getNewRank } from '../../config/api'

Page({
  data: {
    tabNames:['点击榜','订阅榜','新书榜'],
    current: 0,
    loopImgs: [],
    moduleOneData: [],
    moduleTwoData: [],
    moudleTwoFirst: {},
    moduleThreeData: [],
    moduleFourData: [],
    moudleFourFirst: {},
    rankList: []
  },
  //事件处理函数
  toBook: function () {
    console.log(getCurrentPages())
    wx.navigateTo({
      url: '../book/book'
    })
  },
  onLoad: function () {
    this.getIndexData()
    this.getClick()
  },
  switchTab(e){
    let index=e.target.dataset.index
    if(this.data.current!=index){
      if(index==0){
        this.getClick()
      } else if (index == 1){
        this.getSubscribe()
      }else if(index==2){
        this.getNew()
      }
    }
    
  },
  // 获取首页接口数据
  getIndexData() {
    // 获取轮播图
    request(getRecommend, {
      sex: 1,
      template_name: 'top'
    }).then(res => {
      this.setData({
        loopImgs: res.data
      })
    })
    // 获取主编力荐
    request(getRecommend, {
      sex: 1,
      template_name: 'recommend'
    }).then(res => {
      this.setData({
        moduleOneData: res.data
      })
    })
    // 获取热门畅销
    request(getRecommend, {
      sex: 1,
      template_name: 'hot'
    }).then(res => {
      this.setData({
        moduleTwoData: res.data.slice(1),
        moudleTwoFirst: res.data[0]
      })
    })
    // 获取短篇推荐
    request(getRecommend, {
      sex: 1,
      template_name: 'short'
    }).then(res => {
      this.setData({
        moduleThreeData: res.data
      })
    })
    // 获取新书推荐
    request(getRecommend, {
      sex: 1,
      template_name: 'new'
    }).then(res => {
      this.setData({
        moduleFourData: res.data.slice(1),
        moudleFourFirst: res.data[0]
      })
    })
  },
  // 获取点击榜
  getClick(){
    request(getClickRank, {
      sex: 1
    }).then(res => {
      this.setData({
        rankList: res.data,
        current:0
      })
    })
  },
  // 获取订阅榜
  getSubscribe() {
    request(getSubscribeRank, {
      sex: 1
    }).then(res => {
      this.setData({
        rankList: res.data,
        current: 1
      })
    })
  },
  // 获取新书榜
  getNew() {
    request(getNewRank, {
      sex: 1
    }).then(res => {
      this.setData({
        rankList: res.data,
        current: 2
      })
    })
  }
})
