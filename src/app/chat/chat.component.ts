import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';
import { SocketioService } from '../socketio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private socketService: SocketioService,
    private formBuilder: FormBuilder
  ) {
    this.msg = '';
  }
  ngOnInit(): void {
    // setup connection
    this.socketService.setupSocketConnection();
    // register on message here
    this.socketService.socket.on('message', (mtext: string) => {
      if (mtext) {
        this.msg += mtext + '\n';
      }
    });
  }
  messageForm: FormGroup = this.formBuilder.group({
    msginput: [],
  });
  msg: string; // received messages
  sendmsg: string = ''; // message to send
  submit() {
    console.log('Emit message: ' + this.sendmsg);
    this.socketService.socket.emit('message', this.sendmsg);
  }

  backtoDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
}
