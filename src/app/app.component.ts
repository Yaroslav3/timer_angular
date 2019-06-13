import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'time';

  constructor(public element: ElementRef) {
  }

  ngOnInit(): void {

  }

  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = (e.target.scrollHeight + 25) + 'px';
  }

  test(e) {
    console.log('test');
    e.target.style.height = '48px';
  }
}
