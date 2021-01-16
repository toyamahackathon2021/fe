export interface Trigger {
  type: string;
  dist: string;
}

export interface Hint1 {
  name: string;
  trigger: Trigger;
  contents: string;
}

export interface Trigger2 {
  type: string;
  dist: string;
}

export interface Hint2 {
  name: string;
  trigger: Trigger2;
  contents: string;
}

export interface Trigger3 {
  type: string;
  dist: string;
}

export interface Hint3 {
  name: string;
  trigger: Trigger3;
  contents: string;
  image_url: string;
}

export interface Hints {
  hint1: Hint1;
  hint2: Hint2;
  hint3: Hint3;
}

export interface Arrived {
  title: string;
  contents: string;
  coupon_url: string;
}

export interface Data {
  name: string;
  name_eng: string;
  display_condition: string;
  lat: number;
  lng: number;
  hints: Hints;
  arrived: Arrived;
}

export interface GoalResponse {
  id: string;
  data: Data;
}
