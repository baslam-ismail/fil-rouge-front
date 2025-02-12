import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from "./components/table/table.component";
import {FormsModule} from "@angular/forms";




@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    FormsModule,
    TableComponent
  ],
  exports: [TableComponent, ]
})
export class SharedModule { }
