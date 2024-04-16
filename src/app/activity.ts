export interface Activity {
  activityId?: string;
  title: string;
  description: string;
  type: string;
  startTime: string;
  endTime: string;
  date: string;
  duration: {
    hour: number;
    minute: number;
  };
  barometer: string;
}
