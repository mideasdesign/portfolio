import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
@ViewChild('togglemenu') menuRef!: ElementRef<HTMLElement>;
@ViewChild('burger', {static:false}) burgerRef!: ElementRef<HTMLElement>;


  burgermenu(): void {
    const menu = this.menuRef.nativeElement;
    const burger = this.burgerRef?.nativeElement;

    menu.classList.toggle('active');
    burger?.classList.toggle('active');

    if (menu.classList.contains('active')) {
      menu.classList.remove('hidden');
    } else {
      setTimeout(() => menu.classList.add('hidden'), 125);
    }
  }
}
