/**
@author : Anjali Tandel
@class : ExcelUploadPresenter
@description : ExcelUploadPresenter is created for perform UI & bussiness logic of excel-upload read, import data & validations.
**/
import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { DatexPipe } from '../../shared/pipes/date-pipe/date-pipe';
import { RoleEnum, CompareString, Role } from '../../core/magic-string/common.model';
import { EmailAddress } from '../../core/magic-string/Regex-pattern';
import { DuplicateEmployeeId, DuplicateEmailAddress, DuplicatePhoneNumber, ExcelFieldValidation, ExcelValidation, ReadExcelUpload, Message, SelectManagerOrId, Canada, UnitedStates, RegionMandatory } from '../excel-upload-model';
import { LoaderService } from '../../core/loader/loader.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { Subject ,  Observable } from 'rxjs';

@Injectable()
export class ExcelUploadPresenter {
  public invalidString: string;

  private changeWizard: Subject<number> = new Subject();
  changeWizard$: Observable<number> = this.changeWizard.asObservable();

  private resetFile: Subject<boolean> = new Subject();
  resetFile$: Observable<boolean> = this.resetFile.asObservable();
  constructor(
    public datexPipe: DatexPipe,
    private resolver: ComponentFactoryResolver,
    private loaderService: LoaderService,
    private globalResponseHandlerService: GlobalResponseHandlerService) { }

  /**
   * Author : Anjali Tandel
   * Created-Date : 19-11-2019
   * Descriotion : Get unique records on Email-address.
   */
  public getUniqueRecords(object, invalid) {
    let returnRecord = [];
    let rejectedCount: number = 0;
    object.forEach(function (record) {
      let recordExistWithEmail = returnRecord.find(x => x.EmailAddress === record.EmailAddress);
      let recordExistWithNumber = returnRecord.find(x => record.PhoneNumber && record.CountryCallingCode && x.PhoneNumber === record.PhoneNumber && x.CountryCallingCode === record.CountryCallingCode);
      let recordExistWithId = returnRecord.find(x => record.TeamMemberID && x.TeamMemberID === record.TeamMemberID);
      if (!recordExistWithEmail && !recordExistWithNumber && !recordExistWithId) {
        returnRecord.push(record);
      } else {
        rejectedCount += 1;
        if (recordExistWithId) {
          invalid = invalid.concat(JSON.stringify(record) + '\r\n' + DuplicateEmployeeId + '\r\n');
        }
        if (recordExistWithEmail) {
          invalid = invalid.concat(JSON.stringify(record) + '\r\n' + DuplicateEmailAddress + '\r\n');
        }
        if (recordExistWithNumber) {
          invalid = invalid.concat(JSON.stringify(record) + '\r\n' + DuplicatePhoneNumber + '\r\n');
        }
      }
    });
    return { returnRecord, rejectedCount, invalid };
  }

  public checkMandatoryFieldValidation(obj: ReadExcelUpload): [boolean, string] {
    this.invalidString = '';
    let isValid: boolean = true;
    this.invalidString = '';
    Object.keys(ExcelFieldValidation).forEach(key => {
      if (isValid) {
        const getKey = ExcelFieldValidation[key];
        if (getKey.isMandatory && obj[getKey.key] === '') {
          if (getKey.isDropdown) {
            this.invalidString = JSON.stringify(obj) + '\r\n' + 'Please Select ' + getKey.key + '.' + '\r\n';
          } else {
            this.invalidString = JSON.stringify(obj) + '\r\n' + 'Please Enter ' + getKey.key + '.' + '\r\n';
          }
          isValid = false;
        } else if (!this.isFieldInvalid(getKey, obj[getKey.key], obj) || !this.checkFieldLength(getKey, obj[getKey.key], obj)) {
          isValid = false;
        } else if (getKey.isDate) {
          isValid = this.discardInvalidDate(obj, getKey);
        } else {
          isValid = true;
        }
      }
    })
    if (isValid) {
      isValid = this.invalidManager(obj)
    }
    if (isValid) {
      isValid = this.checkCountry(obj)
    }
    return [isValid, this.invalidString];
  }

  private isFieldInvalid(getKey: ExcelValidation, value: string, obj: ReadExcelUpload): boolean {
    if (value && getKey.pattern) {
      if (getKey.pattern.test(value)) {
        return true;
      } else {
        this.invalidString = JSON.stringify(obj) + '\r\n' + getKey.invalid + '\r\n';
        return false;
      }
    } else {
      return true;
    }
  }

  private checkFieldLength(getKey: ExcelValidation, value: string, obj: ReadExcelUpload): boolean {
    if (value && value.length < getKey.minLength) {
      this.invalidString = JSON.stringify(obj) + '\r\n' + getKey.key + ' should not be more than ' + getKey.minLength + ' characters.' + '\r\n';
      return false;
    } else if (value && value.length > getKey.maxlength) {
      this.invalidString = JSON.stringify(obj) + '\r\n' + getKey.key + ' should be maximum ' + getKey.maxlength + ' characters long.' + '\r\n';
      return false;
    } else {
      return true;
    }
  }

  private invalidManager(obj): boolean {
    if ((!obj.ManagersName && !obj.ExcelManagersTeamMemberID && obj.Role != RoleEnum.Executive) || (obj.ManagersName && obj.ExcelManagersTeamMemberID)) {
      this.invalidString = JSON.stringify(obj) + '\r\n' + SelectManagerOrId + '\r\n';
      return false;
    } else {
      return true;
    }
  }

  private checkCountry(obj): boolean {
    if ((obj.Country === Canada || obj.Country === UnitedStates) && obj.Region === '') {
      this.invalidString = JSON.stringify(obj) + '\r\n' + RegionMandatory + '\r\n';
      return false;
    } else {
      return true;
    }
  }

  private discardInvalidDate(obj: ReadExcelUpload, getKey: ExcelValidation): boolean {
    if (getKey && obj[getKey.key] && this.datexPipe.transform(obj[getKey.key].trim(), CompareString.Valid_Date_Format) === CompareString.Invalid_Date) {
      this.invalidString = JSON.stringify(obj) + '\r\n' + getKey.invalid + '\r\n';
      return false;
    } else {
      return true;
    }
  }

  public bindInvalidRecords(invalid, excelRecords, records, error): string {
    records.forEach(record => {
      let findRecord = excelRecords.find(e => e.EmailAddress === record.email)
      invalid += JSON.stringify(findRecord) + '\r\n' + error + '\r\n';
    });
    return invalid;
  }

  public createComponent(component, componentRef, entry: ViewContainerRef) {
    let factory = this.resolver.resolveComponentFactory(component);
    componentRef = entry.createComponent(factory);
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  public checkImportDataLength(records): boolean {
    if (records.length <= 0) {
      this.loaderService.emitIsLoaderShown(false);
      this.globalResponseHandlerService.toastergetApiResponse(Message.ExcelNoDataSelected);
      return false;
    } else {
      this.loaderService.emitIsLoaderShown(true);
      return true;
    }
  }

  public getWizardStep(step: number): number {
    this.changeWizard.next(step);
    return step;
  }

  public resetFileData(isReset: boolean): void {
    this.resetFile.next(isReset);
  }
}
