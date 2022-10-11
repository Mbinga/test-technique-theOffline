import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import Item from "../components/Item";
import Layout from "../components/layout";
import CartItem from "../components/CartItem";
import Input from "../components/Input";

const Home = (props) => {
    const { mydata, mydata1 } = props;
    const [inventory, setInventory] = useState(mydata.items);
    const [basket, setBasket] = useState([]);
    const [airlines, setAirlines] = useState(mydata1.message);
    const [selectedOption, setselectedOption] = useState(airlines[0].limit);
    const [basketTotal, setbasketTotal] = useState(0);
    const [isDisabled, setisDisabled] = useState(true);
    const router = useRouter();

    //* Je crée les fonctions nécessaires à la gestion des onclicks(les UseCallback sont là pour s'assurer que c'est la data Maj)
    const handleAddtoBasket = useCallback(
        (item) => {
            const inventorycopy = [...inventory];
            const basketcopy = [...basket];
            inventorycopy.forEach((inventoryElement, index) => {
                if (inventoryElement.label === item.label) {
                    basketcopy.push(inventoryElement);
                    inventorycopy.splice(index, 1);
                    setbasketTotal(basketTotal + item.weight);
                }
                setBasket(basketcopy);
                setInventory(inventorycopy);
            });
        },
        [inventory, basket]
    );

    const handleRemovetoBasket = useCallback(
        (item) => {
            const inventorycopy = [...inventory];
            const basketcopy = [...basket];
            basketcopy.forEach((basketElement, index) => {
                if (basketElement.label === item.label) {
                    inventorycopy.push(basketElement);
                    basketcopy.splice(index, 1);
                    setbasketTotal(basketTotal - item.weight);
                }
                setInventory(inventorycopy);
                setBasket(basketcopy);
            });
        },
        [inventory, basket]
    );

    //* Je crée la fonction qui gère le changement de compagnie aérienne
    const handleOnChangeAirlines = (event) => {
        setselectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    //* Cette fonction sert à récupérer les items de mon panier et d'ouvrir une new tab avec les items en query
    const openInNewTab = (url) => {
        let params = basket
            .map(({ label, weight }) => `${label}=${weight}`)
            .join("&");
        const redirectionurl = `http://localhost:3000/report?${params}`;
        const newWindow = window.open(
            `${redirectionurl}`,
            "_blank",
            "noopener,noreferrer"
        );
        if (newWindow) newWindow.opener = null;
    };

    //* Ce useEffect sert à gérer le changement d'état du bouton "See Resume"
    useEffect(() => {
        if (basketTotal === 0) {
            setisDisabled(true);
        } else if (basketTotal <= selectedOption) {
            setisDisabled(false);
        } else {
            setisDisabled(true);
        }
    }, [selectedOption, basketTotal]);

    return (
        <div className="container">
            <Layout>
                <Head>
                    <title>Cabin Luggage Calculator</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="inventorywrapper">
                    <form>
                        <label htmlFor="airlines-label">
                            Choose an Airline:
                        </label>
                        <select onChange={handleOnChangeAirlines}>
                            {airlines.map((item, index) => {
                                return <Input item={item} key={index} />;
                            })}
                        </select>
                    </form>
                </div>
                <main className="maincontent">
                    <div className="inventorycontainer">
                        <form>
                            <h2 className="inventory">Inventory</h2>
                            <div className="itemcontainer">
                                {inventory.map((item, index) => {
                                    return (
                                        <Item
                                            item={item}
                                            key={index}
                                            handleAddtoBasket={
                                                handleAddtoBasket
                                            }
                                        />
                                    );
                                })}
                            </div>
                        </form>
                    </div>
                    <div className="selectedcontainer">
                        <form className="formbasket" onSubmit={handleSubmit}>
                            <h2>Selected</h2>
                            <div className="selecteditems">
                                {basket.map((item2, index) => {
                                    return (
                                        <CartItem
                                            item2={item2}
                                            key={index}
                                            basket={basket}
                                            handleRemovetoBasket={
                                                handleRemovetoBasket
                                            }
                                        />
                                    );
                                })}
                            </div>
                            <div
                                className={
                                    isDisabled ? "totalred" : "totalgreen"
                                }
                            >
                                Total = {basketTotal / 1000}kg
                            </div>
                            <button
                                type="submit"
                                value="submit"
                                disabled={isDisabled}
                                onClick={() => openInNewTab(`/report`)}
                            >
                                See Resume
                            </button>
                        </form>
                    </div>
                </main>
            </Layout>
        </div>
    );
};

//* le fetchdata
export const getStaticProps = async () => {
    const async1 = axios.get(
        "https://the-offline-back.herokuapp.com/api/v2/cabin-luggage-inventory"
    );
    const async2 = axios.get(
        "https://the-offline-bp-back.herokuapp.com/get-carriers?secret_key=PicardiePasHautsDeFrance"
    );
    const response = await Promise.all([async1, async2]);

    return {
        props: { mydata: response[0].data, mydata1: response[1].data },
    };
};

export default Home;
