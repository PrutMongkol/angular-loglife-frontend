import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavComponent, FooterComponent],
  templateUrl: './layout.component.html',
  host: {'class': 'h-[100svh] flex flex-col'}
})
export class LayoutComponent {

}
