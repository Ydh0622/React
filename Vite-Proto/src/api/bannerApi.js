import axios from "axios";

export const getBannerData = async () => {
  try {
    const res = await axios.get(`/api/banners/`);
    return res.data;
  } catch (err) {
    console.log("bannerApi.js : getBannerData -err", err);
    return [];
  }
};
