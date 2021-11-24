import React from 'react'
import ExternalLink from './ExternalLink'
import DesktopOnly from './DesktopOnly'

const Footer = ({ facebook, vk, youtube, instagram }) => {

    const currentYear = () => new Date().getFullYear()

    return (
        <>
            <DesktopOnly />
            <footer>
                <div className="container">
                    <div className="wrapper">
                        <div className="copyright">
                            <p>© Frisson, <span className="currentYear">{currentYear()}</span></p>
                        </div>
                        <div className="social">
                            <ul>
                                {/* <li>
                                    <ExternalLink to={facebook}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.2 2.875C12.9734 2.875 11.797 3.36228 10.9296 4.22963C10.0623 5.09699 9.575 6.27337 9.575 7.5V10.075H7.1C6.97574 10.075 6.875 10.1757 6.875 10.3V13.7C6.875 13.8243 6.97574 13.925 7.1 13.925H9.575V20.9C9.575 21.0243 9.67574 21.125 9.8 21.125H13.2C13.3243 21.125 13.425 21.0243 13.425 20.9V13.925H15.9219C16.0252 13.925 16.1152 13.8547 16.1402 13.7546L16.9902 10.3546C17.0257 10.2126 16.9183 10.075 16.7719 10.075H13.425V7.5C13.425 7.29446 13.5067 7.09733 13.652 6.95199C13.7973 6.80665 13.9945 6.725 14.2 6.725H16.8C16.9243 6.725 17.025 6.62426 17.025 6.5V3.1C17.025 2.97574 16.9243 2.875 16.8 2.875H14.2Z" fill="#F8F8FA" />
                                        </svg>
                                    </ExternalLink>
                                </li>
                                <li>
                                    <ExternalLink to={vk}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.5035 18.381H19.222C18.3588 18.381 18.0992 17.682 16.5511 16.1339C15.2 14.8313 14.6292 14.6686 14.2868 14.6686C13.8145 14.6686 13.6847 14.7984 13.6847 15.4505V17.5021C13.6847 18.0573 13.5049 18.3825 12.0553 18.3825C10.6485 18.288 9.28422 17.8606 8.07493 17.1355C6.86564 16.4104 5.84592 15.4084 5.09975 14.212C3.32828 12.0071 2.0957 9.41934 1.5 6.65442C1.5 6.31196 1.62979 6.00234 2.28187 6.00234H4.56182C5.14822 6.00234 5.35933 6.26349 5.5892 6.86553C6.69633 10.1244 8.58534 12.9579 9.35158 12.9579C9.64556 12.9579 9.77379 12.8281 9.77379 12.0947V8.7389C9.67684 7.20799 8.86369 7.0782 8.86369 6.52463C8.87413 6.37862 8.94104 6.24243 9.05022 6.14492C9.1594 6.04742 9.30227 5.99628 9.44853 6.00234H13.0326C13.5221 6.00234 13.6847 6.24629 13.6847 6.83269V11.3613C13.6847 11.8508 13.8958 12.0134 14.0428 12.0134C14.3368 12.0134 14.5635 11.8508 15.1015 11.3128C16.2569 9.90381 17.2009 8.33401 17.9037 6.65286C17.9756 6.45092 18.1115 6.27804 18.2908 6.16058C18.4701 6.04313 18.6829 5.98755 18.8967 6.00234H21.1782C21.8616 6.00234 22.007 6.3448 21.8616 6.83269C21.032 8.6911 20.0055 10.4552 18.7997 12.0947C18.5542 12.47 18.4557 12.6655 18.7997 13.1049C19.0265 13.4473 19.8256 14.1151 20.3635 14.7499C21.1452 15.5297 21.7944 16.4319 22.2853 17.4208C22.4808 18.0557 22.154 18.381 21.5035 18.381Z" fill="#F8F8FA" />
                                        </svg>
                                    </ExternalLink>
                                </li>
                                <li>
                                    <ExternalLink to={youtube}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.98901 4.89006C10.3247 4.62909 13.6756 4.62909 17.0113 4.89006L19.252 5.06536C20.5001 5.16301 21.5211 6.0984 21.7274 7.33317C22.2436 10.4227 22.2436 13.5764 21.7274 16.6659C21.5211 17.9007 20.5001 18.8361 19.252 18.9337L17.0113 19.109C13.6756 19.37 10.3247 19.37 6.989 19.109L4.7483 18.9337C3.50023 18.8361 2.47921 17.9007 2.2729 16.6659C1.75669 13.5764 1.75669 10.4227 2.2729 7.33317C2.47921 6.0984 3.50023 5.16301 4.7483 5.06536L6.98901 4.89006ZM10.0001 14.4697V9.5294C10.0001 9.29621 10.2545 9.15218 10.4545 9.27215L14.5714 11.7423C14.7656 11.8588 14.7656 12.1403 14.5714 12.2568L10.4545 14.7269C10.2545 14.8469 10.0001 14.7029 10.0001 14.4697Z" fill="#F8F8FA" />
                                        </svg>
                                    </ExternalLink>
                                </li> */}
                                <li>
                                    <ExternalLink link={"https://instagram.com/frisson.journal?utm_medium=copy_link"}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.0002 8.74956C10.2053 8.74956 8.75018 10.2046 8.75018 11.9996C8.75018 13.7945 10.2053 15.2496 12.0002 15.2496C13.7951 15.2496 15.2502 13.7945 15.2502 11.9996C15.2502 10.2046 13.7951 8.74956 12.0002 8.74956Z" fill="#F8F8FA" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.76972 3.08103C10.2178 2.69565 13.7825 2.69565 17.2307 3.08103C19.1291 3.2932 20.6603 4.78898 20.8831 6.69403C21.2954 10.219 21.2954 13.7801 20.8831 17.3051C20.6603 19.2101 19.1291 20.7059 17.2307 20.9181C13.7825 21.3035 10.2178 21.3035 6.76972 20.9181C4.87132 20.7059 3.34013 19.2101 3.11732 17.3051C2.70504 13.7801 2.70504 10.219 3.11732 6.69403C3.34013 4.78898 4.87132 3.2932 6.76972 3.08103ZM17.0002 5.99956C16.4479 5.99956 16.0002 6.44727 16.0002 6.99956C16.0002 7.55184 16.4479 7.99956 17.0002 7.99956C17.5525 7.99956 18.0002 7.55184 18.0002 6.99956C18.0002 6.44727 17.5525 5.99956 17.0002 5.99956ZM7.25018 11.9996C7.25018 9.3762 9.37683 7.24956 12.0002 7.24956C14.6235 7.24956 16.7502 9.3762 16.7502 11.9996C16.7502 14.6229 14.6235 16.7496 12.0002 16.7496C9.37683 16.7496 7.25018 14.6229 7.25018 11.9996Z" fill="#F8F8FA" />
                                        </svg>
                                    </ExternalLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
