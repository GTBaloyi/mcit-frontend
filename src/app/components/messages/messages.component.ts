import { Component, OnInit } from '@angular/core';
import { Message } from '../../message.service';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: Array<Message>;
  heading = 'Quotation';
  subheading = 'Request a quotation';
  icon = 'pe-7s-calculator icon-gradient bg-tempting-azure';


  constructor(private messageService: MessageService) {
    this.messages = [];
  }

  ngOnInit() {
    this.messageService.messagesStream
      .subscribe(this.newMessageEventHandler.bind(this));
  }

  private newMessageEventHandler(event: Message): void {
    this.messages.push(event);
  }
}
