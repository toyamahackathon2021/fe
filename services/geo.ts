import distance from "@turf/distance";

export interface Point {
  lat: number;
  lng: number;
}

/**
 * @see https://turfjs.org/docs/#distance
 */
export const distm = (from: Point | null, to: Point | null): number | null => {
  if (from === null || to === null) {
    return null;
  }

  const distKm = distance([from.lng, from.lat], [to.lng, to.lat]);
  const distMeter = distKm * 1000;
  return Math.round(distMeter);
};
