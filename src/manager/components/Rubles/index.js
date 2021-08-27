import styles from './Rubles.module.css';
import Ruble from "./Ruble";

export const Rubles = ({ active, ...props }) => {
    const length = 4;
    const rubles = Array(length).fill(true, 0, active).fill(false, active, length);
    return(
        <div className={`${styles.rubles} ${props.className}`}>
            {rubles.map((active, index) => <Ruble active={active} onClick={()=>{
                props.onChange(index+1);
                console.log(index+1);
            }}/>)}
        </div>
    );
}