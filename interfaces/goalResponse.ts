export interface Trigger {
  type: string;
  dist: number;
}

export interface Hint {
  name: string;
  trigger: Trigger;
  contents: string;
  image_url?: string;
}

export interface Arrived {
  title: string;
  contents: string;
  coupon_url: string;
}

export interface Goal {
  mission_title: string;
  location_name: string;
  display_condition: string;
  duration: string;
  duration_info: string;
  lat: number;
  lng: number;
  hints: Hint[];
  arrived: Arrived;
}

export interface GoalResponse {
  id: string;
  data: Goal;
}
