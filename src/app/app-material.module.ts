import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  exports: [MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule]
})
export class AppMaterialModule {}
