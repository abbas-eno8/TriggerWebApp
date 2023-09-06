import { Injectable } from "@angular/core";
import { Adapter } from "../../core/adapter/adpater";
import { ResponseModel, RequestModel, TeamManager, TeamEmployee, TeamsResponseModel, TeamsRequestModel } from "../teams-model";
import { Role, ApiResponse, ResponseById } from "../../core/magic-string/common.model";
/**
 * @author Anjali Tandel.
 * @description This is adapter service use for transforming data base user requirement. 
 */

@Injectable()
export class TeamsListAdapter implements Adapter<ApiResponse, RequestModel, ResponseModel> {
  /** This method is used to transform response object into T object. */
  public toResponse(response: any): ApiResponse {
    const teams: ApiResponse = new ApiResponse(
      response.data = response.data.length > 0 ? this.bindTeams(response.data) : [],
      response.status,
      response.message,
    );
    return teams;
  }

  public bindTeams(data: any): ResponseModel[] {
    let team: ResponseModel[];
    team = data.map(t => (
      this.teams(t)
    ));
    return team;
  }

  public teams(data: any): ResponseModel {
    const team: ResponseModel = new ResponseModel(
      data.teamId,
      data.name,
      data.startDate,
      data.endDate,
      data.triggerActivityDays,
      data.createdByFName,
      data.createdByLName,
      data.status,
      data.managers,
      data.managerIds
    );
    return team;
  }
}

@Injectable()
export class TeamsFormAdapter implements Adapter<ResponseById, TeamsRequestModel, ResponseModel> {

  //   /** This method is used to transform T object into request object. */
  public toRequest(team: any): TeamsRequestModel {
    const requestModel: TeamsRequestModel = new TeamsRequestModel(
      team.teamId,
      team.name,
      team.description,
      team.startDate,
      team.endDate,
      team.triggerActivityDays,
      team.status,
      team.createdBy,
      team.updatedBy,
      team.teamManagers = this.bindManagers(team.teamManagers),
      team.teamEmployees = this.bindMembers(team.teamEmployees)
    );
    return requestModel;
  }
  /** This method is used to transform response object into T object. */
  public toResponse(response: any): ResponseById {
    const teams: ResponseById = new ResponseById(
      response.data = this.teams(response.data),
      response.status,
      response.message,
    );
    return teams;
  }

  public teams(data: any): TeamsResponseModel {
    const team: TeamsResponseModel = new TeamsResponseModel(
      data.teamId,
      data.name,
      data.description,
      data.startDate,
      data.endDate,
      data.triggerActivityDays,
      data.status,
      data.teamManagers = this.bindManagers(data.teamManagers),
      data.teamEmployees = this.bindMembers(data.teamEmployees)
    );
    return team;
  }

  public getTeam(response: any): ApiResponse {
    const baseResponse: ApiResponse = new ApiResponse(
      response.data = response.data.length > 0 ? this.bindManagers(response.data) : [],
      response.status,
      response.message,
    );
    return baseResponse;

  }

  public getManagers(response: any): ApiResponse {
    const baseResponse: ApiResponse = new ApiResponse(
      response.data = response.data.length > 0 ? this.bindManagersToForm(response.data) : [],
      response.status,
      response.message,
    );
    return baseResponse;

  }

  bindManagersToForm(data: any): TeamManager[] {
    let managers: TeamManager[];
    managers = data.map(m =>
      new TeamManager(
        m.id,
        m.empId,
        m.firstName,
        m.lastName,
        m.createdBy,
        m.updatedBy
      )
    );
    return managers;
  }



  bindManagers(data: any): TeamManager[] {
    let managers: TeamManager[];
    managers = data.map(m =>
      new TeamManager(
        m.id,
        m.managerId,
        m.firstName,
        m.lastName,
        m.createdBy,
        m.updatedBy
      )
    );
    return managers;
  }

  public getMembers(response: any): ApiResponse {
    const baseResponse: ApiResponse = new ApiResponse(
      response.data = response.data.length > 0 ? this.bindMembers(response.data) : [],
      response.status,
      response.message,
    );
    return baseResponse;

  }


  bindMembers(data: any): TeamEmployee[] {
    let managers: TeamEmployee[];
    managers = data.map(m =>
      new TeamEmployee(
        m.id,
        m.empId,
        m.firstName,
        m.lastName,
        m.createdBy,
        m.updatedBy
      )
    );
    return managers;
  }
}
