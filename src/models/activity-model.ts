export interface ActivityModel {
  date: string;
  activities: ActivityDetails[];
}

interface ActivityDetails {
  id: string;
  title: string;
  occurs_at: string;
}
