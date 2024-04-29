import { Component, OnInit, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor (){}
  private readonly router = inject(Router);
  ngOnInit(): void {
    //  navbar toggle
    const overlay = document.querySelector('[data-overlay]');
    const navOpenBtn = document.querySelector('[data-nav-open-btn]');
    const navbar = document.querySelector('[data-navbar]');
    const navCloseBtn = document.querySelector('[data-nav-close-btn]');

    const navElemArr = [overlay, navOpenBtn, navCloseBtn];
    for (let i = 0; i < navElemArr.length; i++) {
      navElemArr[i]?.addEventListener('click', function () {
        navbar?.classList.toggle('active');
        overlay?.classList.toggle('active');
      });
    }

    //  add active class on header when scrolled 200px from top
    const header = document.querySelector('[data-header]');
    window.addEventListener('scroll', function () {
      window.scrollY >= 200
        ? header?.classList.add('active')
        : header?.classList.remove('active');
    });
  }

 public logOut(): void {
    localStorage.removeItem('key_Token');
    this.router.navigate(['/login']);
  }
}
