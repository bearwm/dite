import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Events } from '../../enum/events.enum';
import { ElectronService } from './services/electron.service';
import { EventService } from './services/event.service';
import { LoggerService } from './services/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public loading: boolean;
  private events;

  constructor(
    private loggerService: LoggerService,
    private electronService: ElectronService,
    private translate: TranslateService,
    private router: Router,
  ) {
    translate.setDefaultLang('en');

    if (this.electronService.isElectron()) {
      this.loggerService.info(`Mode: Electron`);
      this.loggerService.info('c', this.electronService.ipcRenderer);
      this.loggerService.info('c', this.electronService.childProcess);
    } else {
      this.loggerService.info('Mode: web');
    }
  }

  ngOnInit() {
    this.subscribeEvents();
  }

  private subscribeEvents() {
    this.events = EventService.getInstance().event.subscribe(({ type, data }) => {
      switch (type) {
        case Events.Loading:
          this.loading = data;
          break;
      }
    });
  }

  ngOnDestroy() {
    this.events.unsubscribe();
  }
}
