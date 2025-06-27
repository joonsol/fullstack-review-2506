import React, { useRef } from 'react'
import "@splidejs/react-splide/css";

import { heroContents } from '../../Util/heroContents'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import useGsapAnimation from "../../hooks/useGsapAnimation";
import { gsap } from "gsap";
import './Hero.scss'
const Hero = () => {

    const tWrapRef = useRef([])

    const slideChange = (splide) => {
        const activeIndex = splide.index
        tWrapRef.current.forEach((ref, index) => {
            // const bg = ref.querySelector(".bg");
            const elements = ref.querySelectorAll("h2, p,button");
            if (index === activeIndex) {
                // if (bg) {
                //     gsap.fromTo(
                //         bg,
                //         { opacity: 0 },
                //         { opacity: 1, duration: 0.5 } // bg는 opacity만 변경
                //     );
                // }
                if (elements) {
                    gsap.fromTo(
                        elements,
                        { opacity: 0, y: 50 },
                        { opacity: 1, y: 0, duration: .5, stagger: 0.2 },
                    )
                }
            }
            else {
                // if (bg) {
                //     gsap.set(bg, { opacity: 0 }); // bg 초기화
                // }
                if (elements) {
                    gsap.set(elements, { opacity: 0, y: 50 }); // h2와 p 초기화
                }
            }

        })
    }
    const infoRef = useGsapAnimation(
        {
            from: { opacity: 0, y: 50 },
            to: { opacity: 1, y: 0, duration: 1 },
        },
        {
            start: "top 80%", // 트리거 시작 위치
            end: "bottom 60%", // 트리거 종료 위치
            toggleActions: "play none none none", // 애니메이션 트리거 액션
        }
    );

    return (
        <section className='hero'>
            <Splide
                options={{
                    type: "loop", // 무한 반복
                    autoplay: false, // 자동 재생
                    interval: 10000, // 슬라이드 전환 간격 (ms)
                    pagination: true, // 하단 점 네비게이션
                    arrows: true, // 이전/다음 화살표 표시
                }}
                onMoved={slideChange} // 슬라이드 이동 이벤트 핸들러
                onMounted={slideChange} // 초기 활성화 슬라이드 설정
            >
                {
                    heroContents.map((item, index) => (
                        <SplideSlide
                            key={index}
                            style={{ backgroundImage: `url('${item.image}')` }}
                        >
                            <div className='inner'>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                            </div>

                        </SplideSlide>
                    ))
                }
            </Splide>
        </section>
    )
}

export default Hero