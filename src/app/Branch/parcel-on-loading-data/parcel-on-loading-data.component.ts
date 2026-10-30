import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  selector: 'app-parcel-on-loading-data',
  templateUrl: './parcel-on-loading-data.component.html',
  styleUrls: ['./parcel-on-loading-data.component.scss']
})
export class ParcelOnLoadingDataComponent {

}
