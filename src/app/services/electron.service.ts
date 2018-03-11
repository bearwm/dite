import { Injectable } from '@angular/core';
import * as childProcess from 'child_process';
import { ipcRenderer } from 'electron';

@Injectable()
export class ElectronService {
  public ipcRenderer: typeof ipcRenderer;
  public childProcess: typeof childProcess;

  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.childProcess = window.require('child_process');
    }
  }

  public isElectron() {
    return window && window.process && window.process.type;
  }
}
