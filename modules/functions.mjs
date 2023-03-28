import { landingData } from "../database/landingData.mjs";
import { articleData } from "../database/articleData.mjs";
import { carouselData } from "../database/carouselData.mjs";

export const getLandingData = () => {
  return JSON.stringify({
    success: true,
    data: landingData,
  });
};

export const getArticleData = () => {
  return JSON.stringify({
    success: true,
    data: articleData,
  });
};

export const getCarouselData = () => {
  return JSON.stringify({
    success: true,
    data: carouselData,
  });
};
