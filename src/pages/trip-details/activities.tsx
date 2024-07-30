import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Activity } from "../../@types/trip";
import { ActivitiesListTile } from "../../components/activities-list-tile";
import { api } from "../../services/axios";

export function Activities() {
  const { tripId } = useParams();

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities))
      .catch((error) => console.error(error));
  }, [tripId]);

  return (
    <div className="space-y-8">
      {activities.map((activity) => {
        return <ActivitiesListTile activity={activity} key={activity.date} />;
      })}
    </div>
  );
}
