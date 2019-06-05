import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/observable/timer';
import 'rxjs-compat/add/operator/takeWhile';
import {ISubscription} from 'rxjs-compat/Subscription';
import 'rxjs-compat/add/observable/interval';
import {Timer} from '../shared/interface/timer';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, Timer {


  minutesDisplay = 0;
  hoursDisplay = 0;
  secondsDisplay = 0;


  isButtonStartStop = true;
  isButtonPause = false;
  isButtonPlay = false;


  sub: ISubscription;
  ticks;

  constructor() {
  }


  ngOnInit() {

  }


  /**
   *  button Start time
   * **/
  onClickStart() {
    console.log('start');
    this.startTimer();
    this.isButtonStartStop = false;
    this.isButtonPause = true;
  }

  /**
   *  button Stop time
   * **/
  onClickStop() {
    console.log('stop');
    this.secondsDisplay = this.getSeconds(this.ticks);
    this.minutesDisplay = this.getMinutes(this.ticks);
    this.hoursDisplay = this.getHours(this.ticks);
    this.sub.unsubscribe();
    this.isButtonStartStop = true;
    this.isButtonPause = false;
    this.isButtonPlay = false;
  }


  /**
   *  button Wait time
   * **/
  onClickWait() {
    this.isButtonPause = false;
    this.isButtonPlay = true;
    this.pauseTimer();
  }

  /**
   * button after Wait time
   * **/
  onClickWaitPlay() {
    this.isButtonPause = true;
    this.isButtonPlay = false;
    this.pauseTimerPlay();
  }


  /**
   *  button Reset time
   * **/
  onClickReset() {
    this.isButtonStartStop = true;
    this.isButtonPause = false;
    this.isButtonPlay = false;
    this.resetTimer();

  }


  /**
   * Start Time Method
   * **/
  private startTimer() {

    this.sub = Observable.interval(1000).subscribe(x => {
      this.ticks = x;
      this.secondsDisplay = this.getSeconds(this.ticks);
      this.minutesDisplay = this.getMinutes(this.ticks);
      this.hoursDisplay = this.getHours(this.ticks);
    });
  }


  /**
   * Reset timer;
   * **/
  private resetTimer() {
    console.log('reset');
    this.sub.unsubscribe();
    this.secondsDisplay = this.getSeconds(0);
    this.minutesDisplay = this.getMinutes(0);
    this.hoursDisplay = this.getHours(0);
  }


  private pauseTimer() {
    console.log('pause ');
    this.sub.unsubscribe();
  }


  /**
   * Pause timer;
   * **/
  private pauseTimerPlay() {
    this.sub = Observable.interval(1000).subscribe(
      (x) => {
        const x1 = x + 1 - x;
        this.ticks += x1;
        this.secondsDisplay = this.getSeconds(this.ticks);
        this.minutesDisplay = this.getMinutes(this.ticks);
        this.hoursDisplay = this.getHours(this.ticks);
      });
  }


  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
    return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {
    return this.pad(Math.floor((ticks / 60) / 60));
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }

}

