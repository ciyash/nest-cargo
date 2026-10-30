import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  selector: 'app-parcel-incoming-lauggage-report',
  templateUrl: './parcel-incoming-lauggage-report.component.html',
  styleUrls: ['./parcel-incoming-lauggage-report.component.scss']
})
export class ParcelIncomingLauggageReportComponent {

}
