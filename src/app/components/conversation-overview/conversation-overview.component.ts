import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-conversation-overview',
  templateUrl: './conversation-overview.component.html',
  styleUrls: ['./conversation-overview.component.scss'],
})
export class ConversationOverviewComponent implements OnInit {

  @Input() username: '';

  constructor() { }

  ngOnInit() {}

}
