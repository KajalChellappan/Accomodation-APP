import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  addLoginNav() {
    const login = document.getElementById('login-opt') as HTMLElement;
    if (login.classList.contains('no-display'))
      login.classList.remove('no-display');
  }

  removeLogout() {
    const logout = document.getElementById('logout-opt') as HTMLElement;
    const chat = document.getElementById('chat-btn') as HTMLButtonElement;
    if (!logout.classList.contains('no-display'))
      logout.classList.add('no-display');
    chat.classList.add('no-display');
  }
}
