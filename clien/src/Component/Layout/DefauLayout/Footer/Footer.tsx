import React from 'react'
import imgLogo from "../../../../assets/img/imageLogo.webp"
import imageLogoText from "../../../../assets/img/imageLogoText.webp"
import imgFaceBook from "../../../../assets/img/imgFaceBook.webp"
import imgEmail from "../../../../assets/img/imageEmail.webp"
import imgGooglePlay from "../../../../assets/img/imageGooglePlay.webp"
import imgAppStore from "../../../../assets/img/imageAppStore.webp"
import "./Footer.scss"
function Footer(): React.ReactNode {
  return (
    <div className="container-footer my-[80px] mx-[128px] flex justify-between">
      <div className="flex items-center flex-col h-16 md:h-12  md:mb-6 pt-2 mt-4 mb-7">
        <div className="flex items-center h-full mb-6 ">
          <div className="w-12 h-12 mr-3 " >
            <img src={imgLogo} alt="" className='' />
          </div>
          <div className="w-36 h-full flex items-center">
            <img src={imageLogoText} alt="" className='' />
          </div>
        </div>
        <p className="w-[200px] ">Vừa chơi vừa học tiếng Anh ngay với </p>
        <p className="w-[200px]"><b>DinoEnglish:</b>  App Học tiếng Anh miễn phí cho tất cả mọi người</p>
      </div>
      <div className="w-full px-0 mb-8 lg:mb-0 md:w-1/2 md:px-6 lg:w-1/4">
        <h1 className="text-2xl font-bold md:pt-2 mb-4 md:mb-7">Chính Sách </h1>
        <p className=""> Chính sách bảo mật </p>
      </div>
      <div className="w-full px-0 mb-8 lg:mb-0 md:w-1/2 md:px-6 lg:w-1/4">
        <h1 className="text-2xl font-bold md:pt-2 mb-4 md:mb-7">Liện Hệ</h1>
        <p className="mb-3">Kết nối với chúng tôi</p>
        <div className="flex gap-3">
          <img src={imgFaceBook} alt="" className="w-11 h-11" />
          <img src={imgEmail} alt="" className="w-11 h-11" />
        </div>
      </div>
      <div className="w-full px-0 mb-8 lg:mb-0 md:w-1/2 md:px-6 lg:w-1/4">
        <h1 className="text-2xl font-bold md:pt-2 mb-4 md:mb-7">Download</h1>
        <div className="">
          <img src={imgGooglePlay} alt="" className="w-[165px] mb-4" />
          <img src={imgAppStore} alt="" className="w-[165px]" />
        </div>

      </div>
    </div>
  )
}

export default Footer