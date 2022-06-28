import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Coin from './Coin';
import Loader from './Loader';
import styles from '../Css/Landing.module.css';
const Landing = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
            .then(response => setData(response.data));
    }, []);
    function searchHandler(event) {
        setSearch(event.target.value);
    };
    const searchedCoins = data.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));
    return (
        <>
            <input className={styles.input} type="text" placeholder="Search" value={search} onChange={searchHandler} />
            {
                data.length ?
                    <div className={styles.coinContainer}>
                        {
                            searchedCoins.map(coins => <Coin key={coins.id}
                                symbol={coins.symbol}
                                name={coins.name}
                                image={coins.image}
                                price={coins.current_price}
                                marketCap={coins.market_cap}
                                priceChange={coins.price_change_percentage_24h}
                            />)
                        }
                    </div>
                    :
                    <Loader />
            }
        </>

    );
};

export default Landing;