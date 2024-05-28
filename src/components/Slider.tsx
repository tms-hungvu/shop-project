import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
export default function Slider(){
    return ( <div className="app__slider">
         <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        navigation={true}
        autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <Image unoptimized  src="https://e0.365dm.com/23/04/2048x1152/skysports-harry-maguire-man-itd_6120687.jpg?20230413231347" width={100} height={100} alt=""/>
        </SwiperSlide>
        <SwiperSlide>
           <Image unoptimized  src="https://assets.goal.com/images/v3/blt30f37f3147915da3/257271a709473778c35bb259b3b3bf88f3a548fe.jpg?auto=webp&format=pjpg&width=3840&quality=60" width={100} height={100} alt=""/>
        </SwiperSlide>
        <SwiperSlide>
           <Image unoptimized  src="https://i.ebayimg.com/images/g/MXcAAOSwaqBgsl9N/s-l1200.webp" width={100} height={100} alt=""/>
        </SwiperSlide>
        
      </Swiper>
    </div>)
}