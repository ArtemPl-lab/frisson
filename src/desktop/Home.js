import React from 'react'
import Header from './Header'
import bgImg from './assets/img/bg-img.png'
import bgImgSmall from './assets/img/bg-img-small.png'
import buttonBubbles from './assets/img/bottom-bubbles.svg'
import phone from './assets/img/phone.png'
import googlePlayImg from './assets/img/google-play.png'
import appStoreImg from './assets/img/app-store.png'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import ExternalLink from './ExternalLink'

const HomePage = ({ googlePlay, appStore }) => {
    return (
        <>
            <Header homepage />
            <section id="homepage" className="fullscreen">
                <img src={bgImg} alt="" className="dec decRight" />
                <img src={bgImgSmall} alt="" className="dec decBottom" />
                <div className="wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col col-md-7">
                                <div className="title">
                                    <h1>Все целевые клиенты уже в приложении Frisson</h1>
                                    <p>Мы создали комьюнити активных людей внутри одного приложения. Рассказывайте о себе, повышайте рейтинг, накапливайте отзывы <br /> и следите за успехами своего бизнеса.</p>
                                    <div className="buttons">
                                        <Link to="/manager/login" className="button white">Вход в кабинет</Link>
                                        <Link to="/manager/register" className="button red">Регистрация</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-md-5">
                                <div className="images">
                                    <img src={buttonBubbles} alt="" className="bottomBubbles" />
                                    <div className="phone">
                                        <img src={phone} alt="" />
                                    </div>
                                    <div className="codes">
                                        <a href="https://play.google.com/store/apps/details?id=com.frissonmobile">
                                            <img src={googlePlayImg} alt="" />
                                        </a>
                                        <a href="https://apps.apple.com/app/id1572292524">
                                            <img src={appStoreImg} alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default HomePage;