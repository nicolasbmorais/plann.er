import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CircleCheck } from "lucide-react";
import { ActivityModel } from "../models/activity-model";

interface ActivitiesListTileProps {
  activity: ActivityModel;
}

export function ActivitiesListTile({ activity }: ActivitiesListTileProps) {
  return (
    <div  className="space-y-2.5">
      <div className="flex gap-2 items-baseline">
        <span className="text-xl text-zinc-300 font-semibold">
          Dia {format(activity.date, "d")}
        </span>
        <span className="text-xs text-zinc-500">
          {" "}
          {format(activity.date, "EEEE", { locale: ptBR })}
        </span>
      </div>
      {activity.activities.length > 0 ? (
        <div className="">
          {activity.activities.map((activities) => {
            return (
              <div
                key={activities.id}
                className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3"
              >
                <CircleCheck className="size-5 text-lime-300" />
                <span className="text-zinc-100 ">{activities.title}</span>
                <span className="text-zinc-400 text-sm ml-auto">
                  {format(new Date(activities.occurs_at), "HH:mm", {
                    locale: ptBR,
                  })}
                  h
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-zinc-500">
          Nenhuma atividade cadastrada nessa data.
        </p>
      )}
    </div>
  );
}
