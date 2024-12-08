import { DogData } from "./interface";

export const emptyUser = () => {
  return {
    user_id: 0,
    user_image: '',
    user_codename: '',
    pets: [] as DogData[],
    user_detail_id: -1
  };
}

export const nonUser = () => {
  return {
    user_id: -1
  }
}