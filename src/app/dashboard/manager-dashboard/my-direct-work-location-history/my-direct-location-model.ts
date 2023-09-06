export class WorkLocationHistory {
    public empId: number = 0
    public location: string = ''
    public name: string = ''
    public profileImage: string = ''
    public profilename: string = ''
    public date: string = ''
    constructor(
        empid: number = 0,
        workLocation: string = '',
        firstName: string = '',
        lastName: string = '',
        date: string = '',
        empImgPath: string = '',
    ) {
        this.empId = empid;
        this.location = workLocation;
        this.name = firstName + ' ' + lastName;
        this.profileImage = empImgPath;
        this.profilename = firstName.charAt(0) + lastName.charAt(0);
        this.date = date;
    }
}