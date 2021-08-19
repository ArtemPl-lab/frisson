import React from 'react'
import Header from './Header'
import bgHelp from './assets/img/bg-help.png'
import DesktopOnly from './DesktopOnly'

const Help = () => {
    return (
        <>
            <Header />
            <section id="help" className="fullscreen">
                <div className="container">
                    <div className="wrapper">
                        <div className="row">
                            <div className="col col-md-5">
                                <div className="title">
                                    <h1>Помощь</h1>
                                    <p>Это α-версия сервиса. Идёт тестирование и мы постоянно работаем над улучшением приложения.</p>
                                    <p>Если у вас возникли вопросы об условиях сотрудничества, вы заметили сбои в работе приложения, просто хотите поделиться советом или респектом  — смело пишите на  <a href="mailto:contact@frisson.com">contact@frisson.com</a>.</p>
                                </div>
                            </div>
                            <div className="col col-md-7">
                                <div className="image">
                                    <img src={bgHelp} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <DesktopOnly />
        </>
    )
}

export default Help