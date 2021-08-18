import React from 'react'
import Header from './Header'
import bgImg from './assets/img/bg-img.png'
import bgImgSmall from './assets/img/bg-img-small.png'
import Footer from './Footer'

const HomePage = () => {
    return(
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
                                    <a href="/manager/login" className="button white">Вход в кабинет</a>
                                    <a href="/manager/register" className="button red">Регистрация</a>
                                </div>
                            </div>
                        </div>
                        <div className="col col-md-5">
                            <div className="images">
                                <img src="img/bottom-bubbles.svg" alt="" className="bottomBubbles" />
                                <div className="phone">
                                    <img src="img/phone.png" alt="" />
                                </div>
                                <div className="codes">
                                    <a href="#">
                                        <img src="img/google-play.png" alt="" />
                                    </a>
                                    <a href="#">
                                        <img src="img/app-store.png" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer facebook="#" vk="#" youtube="#" instagram="#" />
        </>
    );
}

export default HomePage;