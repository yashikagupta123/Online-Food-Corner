import React, { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';

import ImageCard from '../image-card/ImageCard';
import i18n from '../../i18n';

const FoodDishes = (props) => {
  const { dishes } = props;

  const isLoading = useSelector((state) => state.loader.value);

  const renderFoodDishes = () => {
    if (isLoading === true) {
      return (
        <TailSpin
          visible={isLoading}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass="flex justify-center h-44 items-center"
        />
      );
    } else {
      return (
        <div className="flex overflow-x-auto space-x-4">
          {dishes.map((dish, index) => (
            <ImageCard key={index} dish={dish} />
          ))}
        </div>
      );
    }
  };

  return (
    <section className="my-8">
      <p className="text-2xl font-bold mb-4">{i18n.t('food_dishes_title')}</p>
      {renderFoodDishes()}
    </section>
  );
};

export default FoodDishes;
