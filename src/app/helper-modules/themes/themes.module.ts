import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeDirective } from './theme.directive';



@NgModule({
  declarations: [ThemeDirective],
  exports: [ThemeDirective],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ThemesModule { }
