import { ComeBack, Headline } from '../../components';
import styles from './Review.module.css';

export const Review = props => {
    return(
        <div className={styles.wrapper}>
            <ComeBack />
            <br />
            <br />
            <Headline>
                Это отзыв фриссон
            </Headline>
        </div>
    );
}