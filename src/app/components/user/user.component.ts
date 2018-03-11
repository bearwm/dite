import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { EXTENSIONS } from '../../../../enum/extension.constants';
import { ValidateFile } from '../../../../interfaces/validate.interface';
import { FileService } from '../../services/file.service';
import { LoggerService } from '../../services/logger.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  public files: ValidateFile = {};
  public results: boolean[];
  public dragin: boolean;
  public dragout: boolean;
  public debugPopup;

  constructor(
    private fileService: FileService,
    private loggerService: LoggerService,
    private toastr: ToastrService,
    private userService: UserService,
  ) { }

  public dragOver(): void {
    event.preventDefault();
  }

  public testFile(event, drop?: boolean): void {
    this.dragin = false;
    this.results = null;
    try {
      const file = drop ? event.dataTransfer.files[0] : event.srcElement.files[0];
      if (this.fileService.getExtension(file.name) !== `.${EXTENSIONS.TEST}`) {
        throw new Error(`Invalid file extension`);
      }
      this.files.test = {
        name: file.name,
        path: file.path,
      };
    } catch (e) {
      this.loggerService.error(e, this.files);
      this.toastr.error(e);
    }
  }

  public softwareFile(event, drop?: boolean): void {
    this.dragout = false;
    this.results = null;
    try {
      const file = drop ? event.dataTransfer.files[0] : event.srcElement.files[0];
      if (this.fileService.getExtension(file.name) !== `.${EXTENSIONS.CPP}`) {
        throw new Error(`Invalid file extension`);
      }
      this.files.software = {
        name: file.name,
        path: file.path,
      };
    } catch (e) {
      this.loggerService.error(e, this.files);
      this.toastr.error(e);
    }
  }

  public async validate() {
    this.results = null;
    try {
      if (!this.files.software) {
        throw new Error('Please upload your software.');
      }
      if (!this.files.test) {
        throw new Error('Please upload your test.')
      }
      this.results = await this.userService.validate(this.files);
      this.debugPopup = true;
    } catch (e) {
      this.loggerService.error(e.error, this.files);
      this.toastr.error(e.error);
    }
  }

  public debug() {
    // to:do implemention
    this.debugPopup = true;
  }

  public debugClose() {
    this.debugPopup = false;
  }
}
