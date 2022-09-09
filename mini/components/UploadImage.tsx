import React, {useCallback, useState, ReactNode} from 'react'
import Taro from '@tarojs/taro'
import {View, Image, Block} from '@tarojs/components'
import {ZPX} from '../constants/constants'

import SVG_DELETE from './icons/tip_error.svg'

import './widget.css'

interface UploadImageProps {
  /** 每个图片的大小 */
  size?: string
  /** 每个图片的margin */
  margin?: string
  /** 圆角 */
  radius?: string
  /** 是否禁用 */
  disable?: boolean
  /** 线上图片地址 */
  imgList?: string[]
  /** 本地图片地址， */
  pathList?: string[]
  /** 上传成功后，的返回。onChange(imgUrls, localPaths) 默认返回线上和本地地址。 */
  onChange?: Function
  /** 最多上传多少张，默认9张 */
  num?: number //最多上传多少张
  /** 上传图片的地址 */
  uploadUrl?: string
  /** 上传方法的 header  */
  header?: any
  /** 上传时，文件类型名 默认 file */
  uploadName?: string
  /** 是否开启压缩 */
  compressed?: boolean
  /** 图片最大，多少KB */
  maxKb?: number   // 图片最大

  /** 上传图片时，按钮中间的图标组件 */
  Icon?: ReactNode

  /** 上传显示的 文本字体颜色 */
  color?: string
  /** 上传按钮背景色 */
  bgColor?: string
}




const upload = (url: string, filePath: string, uploadName: string, header: any) => {
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: url,
      name: uploadName,
      header: header,
      filePath: filePath,
      success: (res) => {
        let imgData = JSON.parse(res.data)
        imgData.path = filePath
        resolve(imgData)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}


function UploadImage (props: UploadImageProps) {
  const {disable=false, uploadUrl='', size='200 200', margin='0 25 25 0', header, color='#8c8c8c', bgColor='#e6e6e6', uploadName='file', Icon, imgList=[], pathList=[], onChange=()=>{}, num=9, compressed=true, maxKb, radius='0'} = props

  const [loading, setLoading] = useState(false)
  
  /**
   * 上传图片
   */
  const selectImg = useCallback(() => {
    Taro.chooseImage({
      count: 1,
      sizeType: [compressed ? 'compressed' : 'original'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0]
        let tempFile = res.tempFiles[0]
        if(maxKb){
          if(tempFile.size > maxKb * 1024){
            return Taro.showToast({title: `图片不能超过 ${maxKb}kb`, icon: 'none'})
          }
        }

        upload(uploadUrl, tempFilePath, uploadName, header).then((res: any) => {
          setLoading(false)
          let imgData = res
          if(imgData.url && imgData.path){
            let tempImgs = [...imgList]
            let tempPaths = [...pathList]
            tempImgs.push(imgData.url)
            tempPaths.push(imgData.path)
            onChange(tempImgs, tempPaths)
          }
        })
      }
    })
  }, [uploadUrl, imgList, header, uploadName])



  function deleteImg(index){
    let tempImgs = [...imgList]
    let tempPaths = [...pathList]
    tempImgs.splice(index, 1)
    tempPaths.splice(index, 1)
    onChange(tempImgs, tempPaths)
  }

  function preview(url){
    Taro.previewImage({
      current: url,
      urls: imgList
    })
  }

  return (
    <View className='_upload_image'>
      {
        disable ? 
        <Block>
          {
            imgList.map((item, index) => (
              <View 
                className='_upload_image_item'
                key={item}
                style={{
                  borderRadius: radius ? (radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
                }}
              >
                <Image 
                  className='_upload_image_i _upload_image_animate_show' 
                  style={{
                    animationDelay: index * 0.08+'s',
                  }}
                  onClick={() => {preview(item)}} 
                  mode='aspectFill' 
                  src={item} 
                />
              </View>
            ))
          }
        </Block>
        :
        <Block>
          {
            imgList.map((item, index) => (
              <View 
                className='_upload_image_item'
                key={item} 
                style={{
                  margin: margin ? (margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0',
                  borderRadius: radius ? (radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
                }}
              >
                <Image 
                  className='_upload_image_i _upload_image_animate_show' 
                  style={{
                    animationDelay: index * 0.08+'s',
                    borderRadius: radius ? (radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX
                  }}
                  onClick={() => {preview(item)}} 
                  mode='aspectFill' 
                  src={item} 
                />
                <Image onClick={() => {deleteImg(index)}} className='_upload_image_delete_img' src={SVG_DELETE}></Image>
              </View>
            ))
          }
          {
            imgList.length < num &&
            <View className='_upload_image_add_all' style={{marginRight: '0rpx', borderRadius: radius ? (radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX}}>
              <View 
                className='_upload_image_upload _upload_image_animate_show'
                style={{
                  backgroundColor: bgColor, 
                  borderRadius: radius ? (radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX
                }}
                onClick={() => {
                  if(loading) return
                  selectImg()
                }}
              >
                <View 
                  className='_upload_image_add _upload_image_animate_font_size_show'
                  style={{
                    animationDelay: imgList.length * 0.08+'s',
                    color: color
                  }}
                >
                  {loading ? '上传中...' : Icon}
                </View>
              </View>
            </View>
          }
        </Block>
      }
    </View>
  )
}


export default UploadImage