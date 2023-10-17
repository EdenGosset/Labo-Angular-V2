import {Component, OnInit} from '@angular/core';
import {Link} from "../../shared/models/link";
import {UserRole} from "../../shared/enums/userRole";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isConnected: boolean = false;
  userRole: UserRole | undefined;
  showTournamentsChildren: boolean = false;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.isConnected$.subscribe((isConnected) => {
      this.isConnected = isConnected;
      this.userRole = this.authService.user?.role;
    });
  }

  navLinks: Link[] = [
    {title: 'Acceuil', url: '/home', isVisible: false},
    {
      title: 'Tournois',
      url: '/tournament',
      children: [
        {title: 'Index', url: '/tournament/index'},
        {title: 'Nouveau', url: '/tournament/add'}
      ],
      isVisible: false
    },
    {title: 'Nouveau membre', url: '/member', isVisible: this.isAdmin()},
    {title: 'login', url: '/login', isVisible: !this.isConnected}
  ];

  toggleVisible(link: Link): void {
    if (link.url === '/tournament') {
      this.showTournamentsChildren = !this.showTournamentsChildren;
    } else {
      this.navLinks.forEach(l => l.isVisible = false);
      link.isVisible = true;
    }
  }



  isAdmin(): boolean {
    return this.userRole === UserRole.A;
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
