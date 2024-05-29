import assets from './product-list.csv';

type MbtiRow = {
  상품명: string;
  상품URL: string;
};

export const getMbtiLink = (mbti: string) => {
  const mbtiAssets = assets as MbtiRow[];
  for (let i = 0; i < mbtiAssets.length; i++) {
    const item = mbtiAssets[i];
    if (item['상품명'] === mbti) {
      return item['상품URL'];
    }
  }
};
