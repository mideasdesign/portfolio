import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
@ViewChild('togglemenu') menuRef!: ElementRef<HTMLElement>;
@ViewChild('burger', {static:false}) burgerRef!: ElementRef<HTMLElement>;

constructor (private translate: TranslateService){};

switchLanguarge(lang: string){
      this.translate.use('en');
}

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
