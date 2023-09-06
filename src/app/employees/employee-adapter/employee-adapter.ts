import { Injectable } from "@angular/core";
import { Adapter } from "../../core/adapter/adpater";
import { Employee } from "../../shared/modals/individual-employee-model";
/**
 * @author Anjali Tandel.
 * @description This is adapter service use for transforming data base user requirement. 
 */

@Injectable()
export class EmployeeAdapter {

    constructor() { }

    public bindEmployees(data: any): Employee[] {
        let records: Employee[];
        records = data.map(e => (
            this.bindEmployee(e)
        ));
        return records;
    }

    public bindEmployee(employee: any): Employee {
        const record: Employee = new Employee(
            employee.empId,
            employee.firstName,
            employee.lastName,
            employee.ratingCompleted,
            employee.isTriggerSent,
            employee.empRelation,
            employee.departmentId,
            employee.roleId,
            employee.teamType,
            employee.protectionLevel,
            employee.managerId,
            employee.empStatus,
            employee.sendSpark,
            employee.joiningDate
        );
        return record;
    }
}