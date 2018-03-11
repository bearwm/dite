import { Component, ViewChild } from '@angular/core';
import { VirtualScrollComponent } from 'angular2-virtual-scroll';
import { ToastrService } from 'ngx-toastr';

import { TestFile } from '../../../../interfaces/test.interface';
import { AdminService } from '../../services/admin.service';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  public input = [];
  public output = [];
  public files: TestFile[] = [];
  public dragin = false;
  public dragout = false;

  @ViewChild(VirtualScrollComponent) private virtualScroll: VirtualScrollComponent;

  constructor(
    private adminService: AdminService,
    private loggerService: LoggerService,
    private toastr: ToastrService,
  ) { }

  public inputFile(event, drop?: boolean): void {
    event.preventDefault();
    this.dragin = false;
    const files = drop ? event.dataTransfer.files : event.srcElement.files;
    Object.keys(files)
      .map(fileIndex => {
        const file = files[fileIndex];
        return {
          name: file.name,
          path: file.path,
        }
      })
      .forEach(file => {
        if (this.files[this.input.length]) {
          this.files[this.input.length].input = file;
        } else {
          this.files.push({ input: file });
        }
        this.input.push(file);
      });
    this.files = [...this.files];
    this.virtualScroll.refresh();
  }

  public outputFile(event, drop?: boolean): void {
    event.preventDefault();
    this.dragout = false;
    const files = drop ? event.dataTransfer.files : event.srcElement.files;
    Object.keys(files)
      .map(fileIndex => {
        const file = files[fileIndex];
        return {
          name: file.name,
          path: file.path,
        }
      })
      .forEach(file => {
        if (this.files[this.output.length]) {
          this.files[this.output.length].output = file;
        } else {
          this.files.push({ output: file });
        }
        this.output.push(file);
      });
    this.files = [...this.files];
    this.virtualScroll.refresh();
  }

  public dragOver(event): void {
    event.preventDefault();
  }

  public generate(): void {
    try {
      if (this.input.length === 0) {
        throw new Error('You need to upload at least 1 input/output file.');
      }
      if (this.input.length !== this.output.length) {
        throw new Error('Output files is required.');
      }
      this.adminService.generate(this.files);
    } catch (e) {
      this.toastr.error(e);
      this.loggerService.error(e, this.files);
    }
  }
}
