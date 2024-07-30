import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ActivitiesListTile } from "../../components/activities-list-tile";
import { api } from "../../lib/axios";
import { ActivityModel } from "../../models/activity-model";

export function Activities() {
  const { tripId } = useParams();

  const [activities, setActivities] = useState<ActivityModel[]>([]);

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
