import distance from "@turf/distance";

export interface Point {
  lat: number;
  lng: number;
}

/**
 * @see https://turfjs.org/docs/#distance
 */
export const distKm = (from: Point, to: Point) => {
  return distance([from.lng, from.lat], [to.lng, to.lat]);
};
