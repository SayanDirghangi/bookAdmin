import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieShareService } from 'src/app/shared/cookie-share/cookie-share.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDetails: any = null;
  constructor(private router: Router, private cookieShareService: CookieShareService) { 
  }

  ngOnInit(): void {
    this.userDetails = this.cookieShareService.getDetails();
  }

  logoClick = () => {
    this.router.navigate(['/']);
  }

  logout = () => {
    
  }
}
