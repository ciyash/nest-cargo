import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  selector: 'app-delivered-stock-report',
  templateUrl: './delivered-stock-report.component.html',
  styleUrls: ['./delivered-stock-report.component.scss']
})
export class DeliveredStockReportComponent {

}
