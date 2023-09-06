import { Injectable } from "@angular/core";
import { Adapter } from "../../core/adapter/adpater";
import { ApiResponse, CompareString } from "../../core/magic-string/common.model";
import { ImportExcelUpload, ReadExcelUpload } from "../excel-upload-model";
/**
 * @author Anjali Tandel.
 * @description This is adapter service use for transforming data base user requirement. 
 */

@Injectable()
export class ExcelUploadAdapter {

    constructor() { }

    public read(data: any, clientId: number): ReadExcelUpload[] {
        let records: ReadExcelUpload[];
        records = data.map(e => (
            this.bindExcelRecords(e, clientId)
        ));
        return records;
    }
    public bindExcelRecords(data: any, clientId: number): ReadExcelUpload {
        if (data) {
            const record: ReadExcelUpload = new ReadExcelUpload(
                clientId,
                data.TeamMemberID,
                data.FirstName,
                data.MiddleName,
                data.LastName,
                data.Prefix,
                data.EmailAddress,
                data.CountryCallingCode,
                data.PhoneNumber,
                data.TeamMemberPosition,
                data.DateOfHire,
                data.City,
                data.State,
                data.Zip,
                data.Department,
                data.TeamMemberStatus,
                data.Role,
                data.ManagersName,
                data.ProtectionLevel,
                data.InTime,
                data.OutTime,
                data.ExcelManagersTeamMemberID,
                data.Ethnicity,
                data.Gender,
                data.CareerLevel,
                data.JobCode,
                data.JobGroup,
                data.DateInPosition,
                data.CurrentSalary,
                data.DateOfLastSalaryIncrease,
                data.DateOfBirth,
                data.LocationName,
                data.Country,
                data.Region
            );
            return record;
        }
    }

    public importRecords(data: any, createdBy: number, updatedBy: number): ImportExcelUpload[] {
        let records: ImportExcelUpload[];
        records = data.map((e, index) => (
            this.bindimportRecords(e, index, createdBy, updatedBy)
        ));
        return records;
    }

    public bindimportRecords(data: any, index: number, createdBy: number, updatedBy: number): ImportExcelUpload {
        const record: ImportExcelUpload = new ImportExcelUpload(
            data.empId,
            data.companyId,
            data.employeeId,
            data.firstName,
            data.middleName,
            data.lastName,
            data.suffix,
            data.email,
            data.phonenumber,
            data.jobTitle,
            data.joiningDate,
            data.workCity,
            data.workState,
            data.workZipcode,
            data.departmentId,
            data.department,
            data.managerId,
            data.protectionLevelId,
            data.inTime,
            data.outTime,
            data.empStatus,
            data.roleId,
            data.dateOfBirth,
            data.raceorethanicityId,
            data.gender,
            data.jobCategory,
            data.jobCode,
            data.jobGroup,
            data.lastPromodate,
            data.currentSalary,
            data.lastIncDate,
            data.empLocation,
            data.countryId,
            data.regionId,
            createdBy,
            updatedBy,
            data.CSVManagerId,
            index
        );
        return record;
    }
}