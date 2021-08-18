import React from 'react'
import bgVar from './assets/img/bg-var.jpg'
import googlePlayImg from './assets/img/google-play.png'
import appStoreImg from './assets/img/app-store.png'
import Header from './Header'
import { Link } from 'react-router-dom'
import ExternalLink from './ExternalLink'
import Footer from './Footer'

const HomeAlt = ({ googlePlay, appStore }) => {
    return (
        <>
            <Header homepage />
            <section id="homepage" className="fullscreen homepageVar">
                <img src={bgVar} alt="" className="bg" />
                <div className="wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col col-md-5">
                                <div className="images">
                                    <div className="codes">
                                        <ExternalLink to={googlePlay}>
                                            <img src={googlePlayImg} alt="" />
                                        </ExternalLink>
                                        <ExternalLink to={appStore}>
                                            <img src={appStoreImg} alt="" />
                                        </ExternalLink>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-md-7">
                                <div className="title">
                                    <h1>Frisson — это приложение для любителей активного образа жизни</h1>
                                    <p>Где активно провести время, куда сходить за порцией адреналина? Рекомендации, отзывы и множество полезностей в одном месте для всех, кто любит проводить свободное время активно и занимательно.</p>
                                    <div className="buttons">
                                        <Link to="/manager/login" className="button white">Вход в кабинет</Link>
                                        <Link to="/manager/register" className="button red">Регистрация</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default HomeAlt
