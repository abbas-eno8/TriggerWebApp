import { Injectable } from "@angular/core";
import { Adapter } from "../../core/adapter/adpater";
import { ApiResponse, ResponseById } from "../../core/magic-string/common.model";
import { TeamDashboard, TeamScore } from "../dashboard-model";
import { RedirectionParam } from "../manager-dashboard/manager-dashboard-model";
/**
 * @author Anjali Tandel.
 * @description This is adapter service use for transforming data base user requirement. 
 */

@Injectable()
export class TeamDashboardAdapter implements Adapter<ResponseById, TeamDashboard, any> {
    /** This method is used to transform response object into T object. */
    public toResponse(response: any): ResponseById {
        const teams: ResponseById = new ResponseById(
            response.data = this.bindData(response.data),
            response.status,
            response.message,
        );
        return teams;
    }

    public bindData(data: any): TeamDashboard {
        const requestModel: TeamDashboard = new TeamDashboard(
            data.teamId,
            data.yearId,
            data.teamAvgScore,
            data.teamAvgeScoreByDay
        );
        return requestModel;
    }

    teamAverageScore(data: any): TeamScore {
        const requestModel: TeamScore = new TeamScore(
            data.teamAvgScore.teamAvgScore,
            data.teamAvgScore.teamAvgeScoreByDay
        );
        return requestModel;
    }

    public dashboardRedirectionParam(widgetId: number, grade?: string, month?: string): RedirectionParam {
        const redirectionParam: RedirectionParam = new RedirectionParam(
            widgetId,
            grade,
            month
        );
        return redirectionParam;
    }
}