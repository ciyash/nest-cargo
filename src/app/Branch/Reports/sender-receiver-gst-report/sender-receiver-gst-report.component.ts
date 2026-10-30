import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  selector: 'app-sender-receiver-gst-report',
  templateUrl: './sender-receiver-gst-report.component.html',
  styleUrls: ['./sender-receiver-gst-report.component.scss']
})
export class SenderReceiverGstReportComponent {

}
