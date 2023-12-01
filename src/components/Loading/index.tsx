import styles from './style.module.scss';

export default function Loading() {
    return (
        <div className={styles.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}
