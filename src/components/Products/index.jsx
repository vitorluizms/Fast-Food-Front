import React, { useEffect, useRef } from 'react';
import { DescriptionContainer, ProductContainer, WallpaperImage } from './styles';
import combo from '../../assets/images/combo.jpg';
import burger from '../../assets/images/burger.jpg';
import drink from '../../assets/images/drink.jpg';
import dessert from '../../assets/images/dessert.jpg';
import accompaniment from '../../assets/images/accompaniment.jpg';
import { modalStore } from '../../store/ModalStore';
import { refStore } from '../../store/useRefScroll';
import { useSelectProduct } from '../../hooks/useSelectProduct';

export default function ProductComponent({ product }) {
  const image = {
    Combo: combo,
    Dessert: dessert,
    Drinks: drink,
    Accompaniment: accompaniment,
    Hamburger: burger,
  };
  const descriptionArray = product.description.split(/\s*,\s*/);
  const { isModalOpen } = modalStore();
  const { handleClick } = useSelectProduct();
  const { setScrollTargets } = refStore();
  const target = useRef(null);

  useEffect(() => {
    setScrollTargets(product.name, target);
    setScrollTargets(product.id, target);
  }, [setScrollTargets]);

  return (
    <ProductContainer onClick={() => handleClick(product)} ref={target} $isModalOpen={isModalOpen}>
      <WallpaperImage src={image[product.type]} alt="wallpaper-product" $isModalOpen={isModalOpen} />
      <DescriptionContainer $isModalOpen={isModalOpen}>
        <figure>
          <img src={product.image} alt={product.name} />
        </figure>
        <div style={{ height: '50px' }}>
          <h3>{product.name}</h3>
          <p>{descriptionArray[0]}</p>
        </div>
        <h3>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price / 100)}</h3>
      </DescriptionContainer>
    </ProductContainer>
  );
}
