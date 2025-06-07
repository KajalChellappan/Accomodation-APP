import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const search = document.getElementById('dashboard-opt') as HTMLElement;
    search.classList.add('no-display');
    const logout = document.getElementById('logout-opt') as HTMLElement;
    if (!logout.classList.contains('no-display')) {
      const chat = document.getElementById('chat-btn') as HTMLButtonElement;
      chat.classList.remove('no-display');
    }
  }
  onFloatClick() {
    this.router.navigateByUrl('/chat');
  }
}
