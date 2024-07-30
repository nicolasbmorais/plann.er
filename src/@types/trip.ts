export type Activity = {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
};

export type TripLinks = {
  id: string;
  title: string;
  url: string;
  trip_id: string;
};

export type Trip = {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
};

export type Participants = {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
};
