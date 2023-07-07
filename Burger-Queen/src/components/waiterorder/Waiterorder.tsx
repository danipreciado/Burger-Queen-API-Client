import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import ProductCard, { Product } from '../productCard/ProductCard';
import Ordersummary from '../ordersummary/ordersummary';
import styles from './Waiterorder.module.css'
import logo from '../../assets/smallLogo.png';
import lupa from '../../assets/searchIcon.png'
import outicon from '../../assets/outicon.png'


const Waiterorder: React.FC = () => {

    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    const handleRemoveItem = (itemId: number) => {
        setSelectedProducts((prevSelectedProducts) =>
            prevSelectedProducts.filter((product) => product.id !== itemId)
        );
    };

    const clearOrder = (setClient: React.Dispatch<React.SetStateAction<string>>) => {
        setSelectedProducts([]);
        setClient('');
    };

    return (
        <>
            <header className={styles.containerheader}>
                <img className={styles.logo} src={logo} alt="Logo"></img>
                <form className={styles.inputContainer}>
                    <input className={styles.inputSearch} type='search' placeholder='Buscar productos' />
                    <img className={styles.lupa} alt="lupa" src={lupa} />
                </form>
                <img className={styles.outicon} src={outicon} alt="iconosalida"></img>
            </header>
            <main className={styles.backgroundwaiterorder}>
                <aside className={styles.productsAside}>
                <section className= {styles.nav}>
                    <nav className={styles.optionsNav}>
                        <div className={styles.buttonsNav}>
                            <Link className={styles.btnDesayuno} to=''>Desayunos</Link>
                            <Link className={styles.btnComidaCena} to='' >Comida/Cena</Link>
                        </div>
                    </nav>
                    <p className={styles.instructions}> Presione los productos que desee agregar a la orden. </p>
                </section>
                <section className={styles.containerProductosResumen}>
                    <div className={styles.products}>
                        <section className={styles.cardsproducts}>
                            {ProductCard &&
                                <ProductCard
                                    selectedProducts={selectedProducts}
                                    onSelectProduct={(product) => setSelectedProducts((prevProducts) => [...prevProducts, product])} />}
                        </section>
                    </div> 
                </section>
                </aside>
                
                <aside className={styles.summary}>
                        {Ordersummary && <Ordersummary selectedProducts={selectedProducts} onRemoveItem={handleRemoveItem} clearOrder={clearOrder} />}
                    </aside>
            </main>


        </>
    )

}

export default Waiterorder

