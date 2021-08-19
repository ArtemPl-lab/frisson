import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import DesktopOnly from './DesktopOnly'
import Header from './Header'
import bgAbout from './assets/img/bg-about-var.png'
import aboutPhones from './assets/img/about-phones.png'
import aboutPhone1 from './assets/img/about-phone-1.png'
import aboutPhone2 from './assets/img/about-phone-2.png'
import aboutPhone3 from './assets/img/about-phone-3.png'

import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'

SwiperCore.use([Navigation, Pagination])

const AboutAlt = () => {

    const prevRef = useRef(null)
    const nextRef = useRef(null)
    const scrollRef = useRef()

    const scrollDown = () => {
        const top = scrollRef.current.offsetTop
        window.scrollTo({ top: top, behavior: 'smooth' })
    }

    return (
        <>
            <Header />
            <section id="about" className="alt">
                <div className="container">
                    <div className="upper">
                        <div className="row">
                            <div className="col col-md-7">
                                <div className="title">
                                    <h1>Frisson — это приложение для любителей активного образа жизни</h1>
                                    <p>Наши пользователи любят активно провести время. Да, они точно не сидят на диване перед телеком.</p>
                                    <p>Мы создали приложение для тех, кто ищет активный отдых и тех, кто его организует.</p>
                                </div>
                                <div className="down" onClick={scrollDown}>
                                    <p>Как это работает</p>
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.53033 13.4697C8.23744 13.1768 7.76256 13.1768 7.46967 13.4697C7.17678 13.7626 7.17678 14.2374 7.46967 14.5303L11.4697 18.5303C11.7626 18.8232 12.2374 18.8232 12.5303 18.5303L16.5303 14.5303C16.8232 14.2374 16.8232 13.7626 16.5303 13.4697C16.2374 13.1768 15.7626 13.1768 15.4697 13.4697L12.75 16.1893L12.75 6.5C12.75 6.08579 12.4142 5.75 12 5.75C11.5858 5.75 11.25 6.08579 11.25 6.5L11.25 16.1893L8.53033 13.4697Z" fill="#0E2F56" />
                                    </svg>
                                </div>
                            </div>
                            <div className="col col-md-5">
                                <div className="image">
                                    <img src={bgAbout} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sliderContainer" ref={scrollRef}>
                        <Swiper
                            id="slider"
                            className="aboutSlider"
                            speed={800}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current
                            }}
                            pagination={{
                                el: '.pagination',
                                type: 'custom',
                                renderCustom: (_, current, total) => current + '/' + total
                            }}
                            onBeforeInit={swiper => {
                                swiper.params.navigation.prevEl = prevRef.current
                                swiper.params.navigation.nextEl = nextRef.current
                            }}
                        >
                            <SwiperSlide>
                                <div className="item">
                                    <div className="row">
                                        <div className="col col-md-6">
                                            <div className="text">
                                                <h3>Вас найдут те пользователи, <br /> которым вы реально интересны</h3>
                                                <p>Наше приложение предназначено именно для людей готовых проводить время активно. В нашей экосистеме вы не будете конкурировать с кинотеатрами и смотровыми площадками для зевак.</p>
                                                <p>Только целевой пользователь, готовый отрываться на полную катушку.</p>
                                            </div>
                                        </div>
                                        <div className="col col-md-6">
                                            <div className="image first">
                                                <img src={aboutPhones} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item">
                                    <div className="row">
                                        <div className="col col-md-6">
                                            <div className="text">
                                                <h3>Даём возможность заявить о себе</h3>
                                                <p>Добавьте фотографии и видео. Опишите все свои особенности и преимущества.</p>
                                                <p>Больше точной информации о вас — больше клиентов.</p>
                                            </div>
                                        </div>
                                        <div className="col col-md-6">
                                            <div className="image">
                                                <img src={aboutPhone1} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item">
                                    <div className="row">
                                        <div className="col col-md-6">
                                            <div className="text">
                                                <h3>Мы гордимся отзывами в нашем приложении, и следим за ними</h3>
                                                <p>Мы стараемся лично посетить каждого организатора зарегистрированного в нашем приложении. Оставляем честные, непредвзятые отзывы от имени Frisson.</p>
                                                <p>Мы дорожим своей репутацией и вашей репутацией.</p>
                                            </div>
                                        </div>
                                        <div className="col col-md-6">
                                            <div className="image">
                                                <img src={aboutPhone2} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item">
                                    <div className="row">
                                        <div className="col col-md-6">
                                            <div className="text">
                                                <h3>Опишите свои услуги и расскажите про акции и подарки</h3>
                                                <p>Предоставляем возможность поработать вашим маркетолагам. Сделайте заманчивое предложение, пользователи это оценят.</p>
                                            </div>
                                        </div>
                                        <div className="col col-md-6">
                                            <div className="image">
                                                <img src={aboutPhone3} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item">
                                    <div className="row">
                                        <div className="col col-md-6">
                                            <div className="text">
                                                <h3>Мы знаем, вы достойны того, чтобы о вас узнало больше людей!</h3>
                                                <p>Присоединяйтесь к Frisson. Будем активничать вместе.</p>
                                                <Link to="/manager/register" className="button red">Регистрация</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <div className="pagination"></div>
                            <div className="nav">
                                <div className="navBtn" id="prev" ref={prevRef}>
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M28.0607 14.9393C28.6464 15.5251 28.6464 16.4749 28.0607 17.0607L21.1213 24L28.0607 30.9393C28.6464 31.5251 28.6464 32.4749 28.0607 33.0607C27.4749 33.6464 26.5251 33.6464 25.9393 33.0607L17.9393 25.0607C17.3536 24.4749 17.3536 23.5251 17.9393 22.9393L25.9393 14.9393C26.5251 14.3536 27.4749 14.3536 28.0607 14.9393Z" fill="#0E2F56" />
                                    </svg>
                                </div>
                                <div className="navBtn" id="next" ref={nextRef}>
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M19.9393 14.9393C20.5251 14.3536 21.4749 14.3536 22.0607 14.9393L30.0607 22.9393C30.6464 23.5251 30.6464 24.4749 30.0607 25.0607L22.0607 33.0607C21.4749 33.6464 20.5251 33.6464 19.9393 33.0607C19.3536 32.4749 19.3536 31.5251 19.9393 30.9393L26.8787 24L19.9393 17.0607C19.3536 16.4749 19.3536 15.5251 19.9393 14.9393Z" fill="#0E2F56" />
                                    </svg>
                                </div>
                            </div>
                        </Swiper>
                    </div>
                </div>
            </section>
            <DesktopOnly />
        </>
    )
}

export default AboutAlt
